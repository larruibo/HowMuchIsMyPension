"use strict";
// Render the page, appendChild tr's in a tbody
const renderPage = (data) => {
  console.log(data);
  // tbody element
  let tbody = document.getElementById("content-table");
  // Iterating over every line of the json file
  data.forEach(element => {
    // tr elment
    let tr = document.createElement("tr");
    tbody.appendChild(tr);

    // Iterating through the properties of every json
    for (let prop in element) {
      if (prop !== "_id") {
        let td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = `${element[prop]}`;
      }
    }
    
  });
};

// Getting the data
// fetch("../files/pension.json")
//   .then(res => res.json())
//   .then(renderPage);

fetch("/dashboard/ipcs")
  .then(res => res.json())
  .then(renderPage);