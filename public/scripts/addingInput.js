const butAgregar = document.getElementById("butAgregar");
const butEliminar = document.getElementById("butEliminar");
const butEnviar = document.getElementById("butEnviar");
const butQuitar = document.getElementById("butQuitar");

const divAgregar = document.getElementById("content-input-agregar");
const divEliminar = document.getElementById("content-input-eliminar");


butEnviar.addEventListener("click", () => {
  // addData();
  // setTimeout(()=> fetch("/dashboard/agregarCot"), 1000 );
});

butQuitar.addEventListener("click", () => {
  let input = document.getElementById("iSemanaCotizada");
  eliminarData(input);
});

butEliminar.addEventListener("click", () => {
  butEliminar.classList.toggle("true");

  if (butEliminar.getAttribute("add") === "true") {
    divEliminar.setAttribute("style", "display: block;");
    butEliminar.setAttribute("add", "false");
    butAgregar.setAttribute("disabled", "disabled");
    let trs = document.querySelectorAll("tbody > tr");
    let anio_mes = document.getElementById("mes_anio_delete");
    if (trs.length === 0) {
      anio_mes.setAttribute("disabled", "disabled");
      butQuitar.setAttribute("disabled", "disabled");
    }
    else {
      anio_mes.removeAttribute("disabled");
      butQuitar.removeAttribute("disabled");
    }
  }
  else {
    divEliminar.setAttribute("style", "display: none;");
    butEliminar.setAttribute("add", "true");
    butAgregar.removeAttribute("disabled");
  }
});



butAgregar.addEventListener("click", () => {
  butAgregar.classList.toggle("true");

  if (butAgregar.getAttribute("add") === "true") {
    butAgregar.setAttribute("add", "false");
    divAgregar.setAttribute("style", "display: block;");
    butEliminar.setAttribute("disabled", "disabled");
  }
  else {
    divAgregar.setAttribute("style", "display: none;");
    butAgregar.setAttribute("add", "true");
    butEliminar.removeAttribute("disabled");
  }

});

function addData() {

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
  tr.setAttribute("id", tdList.length + "");

  tds.forEach((td) => {
    tr.appendChild(td);
  });
}

// Split from "2019-10" to arr = [2019, 10]
const darAnioMes = anioMes => {
  let arr = anioMes.split("-");
  arr[0] = parseInt(arr[0]);
  arr[1] = parseInt(arr[1]);
  return arr;
};

function eliminarData(input) {
  let tr = document.getElementById(input.value);
  let trs = document.querySelectorAll("tbody > tr");

  let iSemanaCotizada = document.getElementById("iSemanaCotizada");
  if (trs.length-1 === 0) {
    iSemanaCotizada.setAttribute("disabled", "disabled");
    butQuitar.setAttribute("disabled", "disabled");
  }
  else {
    iSemanaCotizada.removeAttribute("disabled");
    butQuitar.removeAttribute("disabled");
  }

  if (input.value <= trs.length && input.value >= 0) {
    tr.remove();
  }
}
