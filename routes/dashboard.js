var express = require("express");
var router = express.Router();
const mongo = require("../database/MongoUtils");
const pension = require("../modules/pension");
require("dotenv").config();

/* GET users listing. */
router.get("/", function (req, res) {
  console.log(req.user);
  const user = req.user;
  if (!user) {
    res.redirect("/login");
  }
  else {

    mongo.cotizaciones.find({ username: user.username })
      .then(cotizaciones => {
        console.log("Cotizacionesss", cotizaciones[0]);
        console.log(typeof (cotizaciones[0]));
        let val = 0,
          ibl = 0,
          r = 0,
          s = 0;
        if (cotizaciones) {
          val = pension.pension(cotizaciones);
          ibl = pension.ibl(cotizaciones);
          r = pension.r(cotizaciones);
          s = pension.salariosMinimos(cotizaciones);
        }
        console.log(val);
        const pensionObj = {
          pension: formatNumber(val),
          promedio: ibl,
          porcentaje: r,
          salariosMinimos: s,
        };
        res.render("dashboard", { user, cotizaciones, pension: pensionObj });
      });
  }
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
        cotizacion: parseFloat(req.body.iCotizacion),
        anio: parseInt(anioMes[0]),
        mes: parseInt(anioMes[1]),
        ipc: parseFloat(cotizacion[0].indice),
        username: req.user.username
      };
      mongo.cotizaciones.insert(obj).finally(res.redirect("/dashboard/tables"));
    });

});

router.post("/tables/eliminarCot", function (req, res) {
  console.log("parameters", req.body);
  console.log(req.body.anio_mes);
  const anioMes = req.body.anio_mes.split("-");
  // Query para obtener el ipc y la semana cotizada
  mongo.cotizaciones.delete({ anio: parseInt(anioMes[0]), mes: parseInt(anioMes[1]), username: req.user.username })
    .finally(res.redirect("/dashboard/tables"));
});

router.get("/tables", function (req, res) {
  console.log(req.user);
  const user = req.user;
  if (!user) {
    res.redirect("/login");
  }
  else {
    console.log(user.username);
    mongo.cotizaciones.find({ username: user.username })
      .then(cotizaciones => {
        return res.render("tables", {
          cotizaciones,
          user
        });
      });
  }
});

router.get("/ipc", function (req, res) {
  const data = [];
  res.render("ipc", {
    data,
  });
});

router.get("/ipcs", function (req, res) {
  return mongo.ipcs.find({})
    .then(data => {

      return res.json(data);
    });
});

// Format to my numbers
function formatNumber(num) {
  const numF = num.toFixed(2);
  return numF.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

module.exports = router;