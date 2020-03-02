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

passport.use("local-signup", new LocalStrategy({
  passReqToCallback: true // allows us to pass back the entire request to the callback
}, function (req, username, password, done) {

  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  mongo.passport.findOne({ username: username }, function (err, username) {
    // if there are any errors, return the error
    if (err)
      return done(err);

    // check to see if theres already a user with that email
    if (username) {
      return done(null, false, req.flash("signupMessage", "That username is already taken."));
    } else {

      // if there is no user with that email
      // create the user
      var newUser = {};

      // set the user's local credentials
      newUser.username = username;
      newUser.password = genPassword(password);

      // save the user
      mongo.passport.insert(newUser).then(function (err) {
        console.log("THIS IS ERR", err);
        if (err)
          throw err;
        return done(null, newUser);
      });
    }
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

router.post("/register", passport.authenticate("local-signup", {
  successRedirect: "/dashboard",
  failuerRedirect: "/login",
  failuerFlash: true
}));

// router.post("/register", (req, res) => {
//   console.log(req.body);

//   const saltHash = genPassword(req.body.password);

//   const salt = saltHash.salt,
//     hash = saltHash.hash,
//     correo = req.body.email,
//     name = req.body.name;
//   const newUser = {
//     username: req.body.username,
//     hash: hash,
//     salt: salt,
//     correo: correo,
//     name: name
//   };
//   mongo.passport.insert(newUser)
//     .finally(res.redirect("/dashboard"));
// });

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