const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
const parent = document.getElementById("festivali");

function getFestival() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("festivali");
  }

const parent0 = document.getElementById("organizator");

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
      for (let obj in data) {
        if (obj == "festivali") {
          for (let organizatori in data[obj]) {
            if (organizatori == fest) {
              for (let festival in data[obj][organizatori]) {
                let a = data[obj][organizatori][festival];
                createAcordion(a, festival, organizatori);
              }
            }
          }
        }else if (obj == "organizatoriFestivala") {
          for (let organizatori in data[obj]) {
            if (organizatori == org) {
              let b = data[obj][organizatori];
              createCard(b);
            }
          }
        }
      }
    } else {
      console.error("Error:", this.status);
      window.location.href = '/html/Greška.html';
    }
  }
};
xhttp.open("GET", firebasedatabase + "/.json");
xhttp.send();

function createAcordion(org, obj, data) {
  let card = document.createElement("div");
  card.classList.add("cards");
  card.innerHTML =`
  <div class="accordion-item">
    <h2 class="accordion-header">
    <div class="row">
        <div class="col-10 my-auto">
            <a style="text-decoration: none; font-weight: bold; font-size: 13px; color: black; margin-left: 10px;" href="./festivali/festival.html?organizator=${data}&festival=${obj}">${org["naziv"]}</a>
        </div>
        <div class="col-2">
            <button class="accordion-button rounded" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${obj}" aria-expanded="true" aria-controls="collapse${obj}"></button>
        </div>
    </div>
    </h2>
    <div id="collapse${obj}" class="accordion-collapse collapse" aria-labelledby="heading${obj}" data-bs-parent="festival">
        <div class="accordion-body">
            <p>${org["opis"]}</p>
            <p>Tip: ${org["tip"]}</p>
            <p>Prevoz: ${org["prevoz"]}</p>
            <p>Cena: ${org["cena"]}</p>
            <p>Max Osoba: ${org["maxOsoba"]}</p>
            <div class="row row-cols-1 row-cols-md-2 g-4">
            </div>
        </div>
    </div>
  </div>
  `;
  parent.appendChild(card);
}

function createCard(org) {
  let card = document.createElement("div");
  card.classList.add("col-lg-4", "col-md-6", "col-sm-10", "cards");
  card.innerHTML =`
  <div class="col">
    <div class="card">
      <img src="${org["logo"]}" class="card-img-top" alt="Logo">
      <div class="card-body">
        <h5 class="card-title">${org["naziv"]}</h5>
        <p class="card-text">Adresa: ${org["adresa"]}</p>
        <p class="card-text">Godina Osnivanja: ${org["godinaOsnivanja"]}</p>
        <p class="card-text">Kontakt Telefon: ${org["kontaktTelefon"]}</p>
        <p class="card-text">Email: ${org["email"]}</p>
      </div>
    </div>
  </div>
  `;
  parent0.appendChild(card);
}