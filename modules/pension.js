const fs = require("fs");
const excel = require("node-xlsx");
const path = require("path");


const pension = () => {
  // Direccion de la carpeta
  const dir = path.join(__dirname, "../public/files/csv-pension.csv");
  // Archivo que contiene la infrmacion
  const myPension = {};
  const fileCSV = fs.readFileSync(dir, {encoding: "utf-8"});
  const ipcJson = () => {
    var lines = fileCSV.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  };

  myPension.path_file = () => dir;

  myPension.fileJson = () => ipcJson();

  myPension.fileCSV = () => fileCSV;

  return myPension;
};
module.exports = pension;