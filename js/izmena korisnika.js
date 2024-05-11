const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
const parent = document.getElementById("forma_korisnici");
const xhttp = new XMLHttpRequest();

function getKorisnik() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("korisnik");
  }
const korisnik = getKorisnik();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log("Data:", data);
      for (let obj in data) {
        if (obj == korisnik) {
            let kor_obj = data[obj];
            create(kor_obj);
        }
      }
    } else {
      console.error("Error:", this.status);
      window.location.href = './html/Greška.html';
    }
  }
};
xhttp.open("GET", firebasedatabase + "/korisnici.json");
xhttp.send();

function create(korisnik) {
  let innerHTML = `
  <h2 class="my-4">Izmena podataka</h2>
  <form id="userForm" method="post" action="submit.php">
      <div class="mb-3">
          <label for="username" class="form-label">Korisničko ime:</label>
          <input type="text" class="form-control" id="username" name="username" placeholder="${korisnik["korisnickoIme"]}">
      </div>
      <div class="mb-3">
          <label for="name" class="form-label">Ime:</label>
          <input type="text" class="form-control" id="name" name="name" placeholder="${korisnik["ime"]}">
      </div>
      <div class="mb-3">
          <label for="surname" class="form-label">Prezime:</label>
          <input type="text" class="form-control" id="surname" name="surname" placeholder="${korisnik["prezime"]}">
      </div>
      <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" class="form-control" id="email" name="email" placeholder="${korisnik["email"]}">
      </div>
      <div class="mb-3">
          <label for="dob" class="form-label">Datum Rođenja:</label>
          <input type="date" class="form-control" id="dob" name="dob" placeholder="${korisnik["datumRodjenja"]}">
      </div>
      <div class="mb-3">
          <label for="address" class="form-label">Adresa:</label>
          <input type="text" class="form-control" id="address" name="address" placeholder="${korisnik["adresa"]}">
      </div>
      <div class="mb-3">
          <label for="phone" class="form-label">Telefon:</label>
          <input type="tel" class="form-control" id="phone" name="phone" placeholder="${korisnik["telefon"]}">
      </div>
      <div class="mb-3">
          <label for="occupation" class="form-label">Zanimanje:</label>
          <input type="text" class="form-control" id="occupation" name="occupation" placeholder="${korisnik["zanimanje"]}">
      </div>
      <button type="button" class="btn" id="new-btn" style="display: inline-block" onclick="geek()">Sačuvaj izmene</button>
      <a type="button" class="btn" href="/html/Korisnici.html">Vrati se nazad</a>
  </form>
  `;
  parent.innerHTML = innerHTML;
  document.getElementById(`new-btn`).addEventListener("click", function () {
    let messageBox = document.getElementById("message-box");
    messageBox.textContent = "Korisnik je uspešno izmenjen!";
    messageBox.classList.add("show");
    console.log("OK je pritisnuto!");
    setTimeout(function() {
        messageBox.classList.remove("show");
    }, 5000);
  });
}