const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
const parent = document.getElementById("forma_org");
const xhttp = new XMLHttpRequest();

function getOrganizator() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("organizator");
  }
const org = getOrganizator();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log("Data:", data);
      for (let obj in data) {
        if (obj == org) {
            let organizator = data[obj];
            createCard(organizator, obj);
        }
      }
    } else {
      console.error("Error:", this.status);
      window.location.href = './html/Greška.html';
    }
  }
};
xhttp.open("GET", firebasedatabase + "/organizatoriFestivala.json");
xhttp.send();

function createCard(organizator, obj) {
  let innerHTML = `
  <h2 class="my-4">Izmena podataka</h2>
  <form id="userForm">
      <div class="mb-3">
          <label for="name" class="form-label">Naziv:</label>
          <input type="text" class="form-control" id="name" name="name" placeholder="${organizator["naziv"]}">
      </div>
      <div class="mb-3">
          <label for="surname" class="form-label">Adresa:</label>
          <input type="text" class="form-control" id="surname" name="surname" placeholder="${organizator["adresa"]}">
      </div>
      <div class="mb-3">
          <label for="address" class="form-label">Godina osnivanja:</label>
          <input type="text" class="form-control" id="address" name="address" placeholder="${organizator["godinaOsnivanja"]}">
      </div>
      <div class="mb-3">
          <label for="phone" class="form-label">Kontakt telefon:</label>
          <input type="tel" class="form-control" id="phone" name="phone" placeholder="${organizator["kontaktTelefon"]}">
      </div>
      <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" class="form-control" id="email" name="email" placeholder="${organizator["email"]}">
      </div>
        <button type="button" class="btn" id="new-btn" style="display: inline-block" onclick="geek()">Sačuvaj izmene</button>
        <a type="button" class="btn" href="/html/Organizatori.html">Vrati se nazad</a>
  </form>
  `;
  parent.innerHTML = innerHTML;
  document.getElementById(`new-btn`).addEventListener("click", function () {
    let messageBox = document.getElementById("message-box");
    messageBox.textContent = "Organizator je uspešno izmenjen!";
    messageBox.classList.add("show");
    console.log("OK je pritisnuto!");
    setTimeout(function() {
        messageBox.classList.remove("show");
    }, 5000);
  });
}