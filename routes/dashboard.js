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
  const data = [];
  res.render("ipc", {
    data
  });
});

router.get("/ipcs", function (req, res) {
  console.log("llega");
  return mongo.ipcs.find({})
    .then(data => {
      return res.json(data);
    });
});

router.get("/tables/agregarCot", function (req, res) {
  console.log(req.query);
  return mongo.cotizaciones.find({})
    .then(cotizaciones => {
      return res.render("tables", {
        cotizaciones
      });
    });
  
});

module.exports = router;