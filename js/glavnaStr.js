const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
const parent = document.getElementById("organizatori");
const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log("Data:", data);
      for (let obj in data) {
        let organizator = data[obj];
        createCard(organizator, obj);
      }
    } else {
      console.log("Error");
    }
  }
};
xhttp.open("GET", firebasedatabase + "/organizatoriFestivala.json");
xhttp.send();

function createCard(organizator, obj) {
  let card = document.createElement("div");
  card.classList.add("col-lg-4", "col-md-6", "col-sm-10", "cards");
  card.innerHTML = `
    <div class="col-md-10">
        <a href="./organizatori/organizator.html?organizator=${obj}&festivali=${organizator["festivali"]}" class="card-link">
            <div class="card">
                <img src="${organizator["logo"]}" alt="${organizator["naziv"]}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title" id="cards-main">${organizator["naziv"]}</h5>
                </div>
            </div>
        </a>
    </div>
  `;
  parent.appendChild(card);
}