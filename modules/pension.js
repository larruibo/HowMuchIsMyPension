const fs = require('fs');
const excel = require('node-xlsx');
var path = require('path');

const pension = () => {
  // Direccion de la carpeta
  const dir = path.join(__dirname, '../public/files/ipc-mensual-1954.xlsx');
  // Archivo que contiene la infrmacion
  const ipc_file = excel.parse(fs.readFileSync(dir));
  // Headers de la data
  const headers = [];
  // Data que contiene los ipcs
  const data = [];
  
  // Esta myPension es usada para acceder a metodos
  const myPension = {};
  // Adding headers the columns of the data
  const load_data = () => {
    ipc_file[0].data[12].forEach((element) => {
      headers.push(element);
    });
    // Data of IPC montly since 1956
    ipc_file[0].data.forEach((element, index) => {
      if (index >= 13 && index <= 781) {
        // const ipcs = [element[1], element[2], element[3], element[4]];
        data.push(element);
      }
    });
  };
  

  myPension.data = () => data;

  myPension.headers = () => headers;

  myPension.path_file = () => dir;

  myPension.ipc_file = () => ipc_file;

  myPension.load_data = load_data;

  return myPension;
};

module.exports = pension;