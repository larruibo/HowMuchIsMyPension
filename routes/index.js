var express = require("express");
var router = express.Router();
const mu = require("../database/MongoUtils.js");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.post("/loginuser", 
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/dashboard");
  });

router.get("/login", function (req, res) {
  res.render("login.ejs", { title: "Express" });
});



router.get("/logout", function(req, res){    
  req.logout();    
  res.redirect("/");
});

module.exports = router;
