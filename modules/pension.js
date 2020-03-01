// Modulo utilizado para los calculos de la pension
function Pension() {
  const mu = {};
  // Variables
  let ipcActual =  parseFloat(process.env.IPC_ACTUAL),
    salarioMinimo = 877803.0;
  mu.ipcActual = ipcActual;

  // Me da el porcentaje de liquidacion de la pension
  mu.r = (cotizaciones) => 65.5 - 0.5/mu.salariosMinimos(cotizaciones);

  // Numero de salarios minimos con respecto
  // al promedio de salarios cotizados en la actualidad
  mu.salariosMinimos = (cotizaciones) => mu.ibl(cotizaciones)/salarioMinimo;

  // Realiza el promedio de salarios cotizados en la actualidad
  mu.ibl = (cotizaciones) => {
    var acum =0;
    for( let c of cotizaciones ){
      acum += c.cotizacion*(parseFloat(ipcActual)/c.ipc);
    }
    return acum/cotizaciones.length;
  };

  // Retorna la pension de un usuario en el momento actual
  mu.pension = (cotizaciones) => mu.ibl(cotizaciones)*mu.r(cotizaciones)/100;

  return mu;
}

module.exports = Pension(); 