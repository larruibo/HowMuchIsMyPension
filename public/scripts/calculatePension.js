const darAnioMes = anioMes => anioMes.split("-");

const renderPage = (data) => {
  let tbody = document.getElementById("content-table");
  data.forEach(element => {
    let anioMes = darAnioMes(element.anio_mes);
    anioMes[0] = parseInt(anioMes[0]);
    anioMes[1] = parseInt(anioMes[1]);
    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    console.log(typeof(anioMes[0]));
    for( let prop in element ){
      let td = document.createElement("td");
      tr.appendChild(td);
      if( prop !== "anio_mes" ) td.textContent = `${element[prop]}`;
      else{
        td.textContent = `${anioMes[0]}`;
        let tdTemp = document.createElement("td");
        tr.appendChild(tdTemp);
        tdTemp.textContent = `${anioMes[1]}`;
      }
    }
  });
};

fetch("../files/pension.json")
  .then(res => res.json())
  .then(renderPage);