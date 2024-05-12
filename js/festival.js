const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
const parent = document.getElementById("festival");

function getFestival() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("festival");
}
function getOrganizator() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("organizator");
}
const fest = getFestival();
const org = getOrganizator();
const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log("Data:", data);
      create(data);
    }
    else {
      console.error("Error:", this.status);
      window.location.href = './html/Greška.html';
    }
  }
};
xhttp.open("GET", firebasedatabase + "/festivali/" + org + "/" + fest + ".json");
xhttp.send();

function create(fest) {
  let innerHTML =`
    <div class="container1 mt-5">
        <div class="row">
            <div class="col-md-6 mb-4">
                <h1 class="content">${fest["naziv"]}</h1>
                <br/>
                <p>${fest["opis"]}</p>
                <p>Tip: <span class="content">${fest["tip"]}<span></p>
                <p>Prevoz: ${fest["prevoz"]}</p>
                <p>Cena: ${fest["cena"]}</p>
                <p>max osoba: ${fest["maxOsoba"]}</p>
            </div>
  `;
  innerHTML += `
      <div class="col-md-6 mb-4">
        <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel">
            <div class="carousel-inner">
        `;
    let active = true;
    for (let slika of fest["slike"]) {
      let activeAttr = active ? "active" : "";
        innerHTML += `
        <div class="carousel-item ${activeAttr}">
          <img src="${slika}" class="d-block w-100 slike" alt="${fest["naziv"]} slika">
        </div>
        `;
      active = false; 
    }
    innerHTML += `
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="sr-only"></span>
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only"></span>
        </a>
      </div>
    </div>
    `;
    parent.innerHTML = innerHTML;
};