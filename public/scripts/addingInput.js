const butAgregar = document.getElementById("butAgregar");
const butEliminar = document.getElementById("butEliminar");
const butQuitar = document.getElementById("butQuitar");
const divAgregar = document.getElementById("content-input-agregar");
const divEliminar = document.getElementById("content-input-eliminar");


// Muestra la parte de eliminar 
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

// Muestra la parte la parte de agregar
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

