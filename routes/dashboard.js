var express = require("express");
var router = express.Router();
const mongo = require("../database/MongoUtils");
var numeroCot = 0;

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("dashboard");
});

router.get("/tables", function (req, res) {
  mongo.cotizaciones.find({})
    .then(cotizaciones => {
      numeroCot = cotizaciones.length;
      console.log(cotizaciones);
      return res.render("tables", {
        cotizaciones
      });
    });
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

router.post("/tables/agregarCot", function (req, res) {
  console.log("parameters", req.body);
  let anioMes = req.body.iMesAnio;
  anioMes = anioMes.split("-");
  // Query para obtener el ipc y la semana cotizada
  mongo.ipcs.find({ anio: anioMes[0], mes: anioMes[1] })
    .then(cotizacion => {
      // insert en cotizaciones
      const obj = {
        cotizacion: req.body.iCotizacion,
        anio: anioMes[0],
        mes: anioMes[1],
        ipc: parseFloat(cotizacion[0].indice),
        semana_cotizada: numeroCot + 1
      };
      return mongo.cotizaciones.insert(obj);
    }).finally(res.redirect("/dashboard/tables"));

});

router.post("/tables/eliminarCot", function (req, res) {
  console.log("parameters", req.body);
  console.log(req.body.semana_cotizada);
  // Query para obtener el ipc y la semana cotizada
  // mongo.ipcs.delete({ semana_cotizada: req.body.semana_cotizada })
  // .finally(res.redirect("/dashboard/tables"));

});

module.exports = router;