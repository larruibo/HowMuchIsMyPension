var express = require("express");
var router = express.Router();


/* GET users listing. */
router.get("/", function(req, res) {
  res.render("dashboard");
});

router.get("/tables", function(req, res) {
  res.render("tables");
});

router.get("/ipc", function(req, res) {
  res.render("ipc");
});

module.exports = router;
