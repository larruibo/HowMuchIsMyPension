var express = require("express");
var router = express.Router();
const mongo = require("../database/MongoUtils");


/* GET users listing. */
router.get("/", function (req, res) {
  res.render("dashboard");
});

router.get("/tables", function (req, res) {
  res.render("tables");
});

router.get("/ipc", function (req, res) {
  console.log("llega");
  return mongo.ipcs.find({})
    .then(data => {
      res.render("ipc", {
        data
      });
    });
});

module.exports = router;
