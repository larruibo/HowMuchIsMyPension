"use strict";

// Split from "2019-10" to arr = [2019, 10]
const darAnioMes = anioMes => {
  let arr = anioMes.split("-");
  arr[0] = parseInt(arr[0]);
  arr[1] = parseInt(arr[1]);
  return arr;
};

// Render the page, appendChild tr's in a tbody
const renderPage = (data) => {
  // tbody element
  let tbody = document.getElementById("content-table");
  // Iterating over every line of the json file
  data.forEach(element => {
    let anioMes = darAnioMes(element.anio_mes);
    // tr elment
    let tr = document.createElement("tr");
    tbody.appendChild(tr);

    // Iterating through the properties of every json
    for (let prop in element) {
      let td = document.createElement("td");
      tr.appendChild(td);
      if (prop !== "anio_mes") td.textContent = `${element[prop]}`;
      else {
        td.textContent = `${anioMes[0]}`;
        let tdTemp = document.createElement("td");
        tr.appendChild(tdTemp);
        tdTemp.textContent = `${anioMes[1]}`;
      }
    }
  });
};

// Getting the data
// fetch("../files/pension.json")
//   .then(res => res.json())
//   .then(renderPage);

console.log("fetch");
fetch("/dashboard/ipc")
  .then(req => console.log(req));