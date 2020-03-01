var express = require("express");
var router = express.Router();
const uid = require("uid-safe");
require("dotenv").config();


// Package and modules for authentication
const session = require("express-session");
const mongo = require("../database/MongoUtils.js");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);



// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/login", function (req, res) {
  res.render("login", { title: "Express" });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/register", function (req, res) {
  res.render("register");
});


// Session config
router.use(session({
  store: new MongoStore({ url: mongo.url, collection: "sessions" }),
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET
}));

//Passport config
function validPassword(password, hash, salt) {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVerify;
}

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

  return {
    salt: salt,
    hash: genHash
  };
}

passport.use(new LocalStrategy(
  function (username, password, cb) {
    // User es User.findOne
    mongo.passport.findOne({ username: username })
      .then((user) => {
        if (!user) { return cb(null, false); }

        // Function defined at bottom of router.js
        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
          console.log("Antes del cb");
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

router.post("/login", passport.authenticate("local",
  { failureRedirect: "/login", successRedirect: "/dashboard" }));

module.exports = router;
