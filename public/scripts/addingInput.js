const butAgregar = document.getElementById("butAgregar");
const butEliminar = document.getElementById("butEliminar");
const div = document.getElementById("content-input");
butAgregar.addEventListener("click", () => {
  // butAgregar.setAttribute("disabled", "disabled");
  butAgregar.classList.toggle("true");

  if (butAgregar.getAttribute("add") === "true") {
    console.log("true");
    addInput(butAgregar);
    div.setAttribute("style", "display: block;");

  }
  else {
    console.log("false");
    addData(butAgregar);
    div.setAttribute("style", "display: none;");
  }

});

function addData(butAgregar) {

  butAgregar.setAttribute("add", "true");


  let tbody = document.getElementById("table-content");
  let tr = document.createElement("tr");
  tbody.appendChild(tr);

  let tds = [
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
  ];

  //tds[0] = cotizacion
  console.log();
  tds[0].textContent = parseInt(document.getElementById("iCotizacion").value);

  let anio_mes = document.getElementById("iMesAnio").value;
  const arrAnioMes = darAnioMes(anio_mes);
  // Anio
  tds[1].textContent = arrAnioMes[0];
  // Mes
  tds[2].textContent = arrAnioMes[1];


  fetch("../files/pension.json")
    .then(res => res.json())
    .then((data) => {
      let ipc = data[2020 - arrAnioMes[0] + arrAnioMes[1] - 1].inflacion_mensual;
      // IPC cargado desde el archivo pension.json
      tds[3].textContent = ipc;
    });

  let tdList = document.querySelectorAll("tbody > tr");
  tds[4].textContent = tdList.length;

  tds.forEach( (td) => {
    tr.appendChild(td);
  });
}

function addInput(butAgregar) {
  butAgregar.setAttribute("add", "false");
}

// Split from "2019-10" to arr = [2019, 10]
const darAnioMes = anioMes => {
  let arr = anioMes.split("-");
  arr[0] = parseInt(arr[0]);
  arr[1] = parseInt(arr[1]);
  return arr;
};