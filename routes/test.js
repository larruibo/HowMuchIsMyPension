var express = require('express');
var router = express.Router();
let pension = require('../modules/pension');

router.get('/', function (req, res) {
  let ipc = pension();
  const vars = {
    'data': ipc.data(),
    'headers': ipc.headers(),
  };
  // Renderiza pagina en views/test.hbs y el objeto vars
  res.render('test', { 'vars': vars });
});

module.exports = router;