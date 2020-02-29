// Packages and modules 
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const hbs = require("hbs");
var session = require("express-session");
var passport = require("passport");
var mongo = require("./database/MongoUtils.js");
var bodyParser = require("body-parser");

const LocalStrategy = require("passport-local").Strategy;

// Routers
var indexRouter = require("./routes/index");
var dashboardRouter = require("./routes/dashboard");

var app = express();

// Define paths for Express
const publicPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

// Setup HBS engine and views locationscomm
app.set("view engine", "ejs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

//confugura passport
app.use(passport.initialize());
app.use(session({ secret: "cats" }));
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));


// Ruta de index
app.use("/", indexRouter);
// Ruta de dashboard
app.use("/dashboard", dashboardRouter);

app.post("/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/dashboard");
  });

app.get("*", (req, res) => {
  res.render("not_found_404");
});


passport.use(new LocalStrategy(
  {usernameField: "user",
    passwordField: "password"},
  function (username, password, done) {
    mongo.findOne({
      user: username
    }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));
module.exports = app;
