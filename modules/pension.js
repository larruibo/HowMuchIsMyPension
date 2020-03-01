require("dotenv").config();


function Pension() {
  const mu = {};
  let ipcActual =  parseFloat(process.env.IPC_ACTUAL),
    salarioMinimo = 877803.0;
  mu.ipcActual = ipcActual;

  mu.r = (cotizaciones) => 65.5 - 0.5/mu.salariosMinimos(cotizaciones);

  mu.salariosMinimos = (cotizaciones) => mu.ibl(cotizaciones)/salarioMinimo;


  mu.ibl = (cotizaciones) => {
    var acum =0;
    for( let c of cotizaciones ){
      console.log(ipcActual);
      console.log(c.ipc);
      console.log(c.cotizacion);
      acum += c.cotizacion*(parseFloat(ipcActual)/c.ipc);
    }
    return acum/cotizaciones.length;
  };

  mu.pension = (cotizaciones) => mu.ibl(cotizaciones)*mu.r(cotizaciones);

  return mu;
}

module.exports = Pension(); 