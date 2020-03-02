var express = require("express");
var router = express.Router();

// Package and modules for authentication
const session = require("express-session");
const mongo = require("../database/MongoUtils.js");
const MongoStore = require("connect-mongo")(session);

// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");


const mongoStore = new MongoStore({ url: mongo.url, collection: "sessions" });
// Session config
router.use(session({
  store: mongoStore,
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET || "secret key",
  cookie: { expires: new Date(Date.now() + 900000) }
}));

// PASSPORT CONFIG
// Local Strategy
passport.use(new LocalStrategy(
  function (username, password, cb) {
    // User es User.findOne
    mongo.passport.findOne({ username: username })
      .then((user) => {
        if (!user) { return cb(null, false); }

        // Function defined at bottom of router.js
        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      })
      .catch((err) => {
        cb(err);
      });
  }));

passport.serializeUser(function (user, cb) {
  console.log("serialize");
  cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
  // User.findById
  console.log("deserialize");
  mongo.passport.findById(username, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

router.use(passport.initialize());
router.use(passport.session());

// ROUTES

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

// GET login page
router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/dashboard",
}));

// GET logout page
router.get("/logout", function (req, res) {
  res.clearCookie("connect.sid");
  res.redirect("/");
});

// GET register page
router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", (req, res) => {
  console.log(req.body);

  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt,
    hash = saltHash.hash,
    correo = req.body.email,
    name = req.body.name;
  const newUser = {
    username: req.body.username,
    hash: hash,
    salt: salt,
    correo: correo,
    name: name
  };
  mongo.passport.insert(newUser)
    .finally( () => {
      console.log(res);
      console.log(req);
      res.redirect("/dashboard");
    });
});

// Helper functiona
function validPassword(password, hash, salt) {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVerify;
}

// Password generator for registered users
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

  return {
    salt: salt,
    hash: genHash
  };
}

module.exports = router;