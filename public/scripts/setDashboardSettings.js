const progressBar = document.getElementById("progress-bar");
const valueProgressBar = document.getElementById("value-progress-bar");
console.log(progressBar);
progressBar.setAttribute("aria-valuenow", Math.ceil(valueProgressBar.textContent));