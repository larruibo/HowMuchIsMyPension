var express = require("express");
var router = express.Router();
let pension = require("../modules/pension");


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

router.get("/ipc/data", function(req, res) {
  let ipc = pension();
  const file = ipc.fileJson();
  console.log("this is ipc/data");
  res.render("base");
});

module.exports = router;
