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
            create(kor_obj, obj, data);
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

function create(korisnik, obj_kor, korisnici) {
  let innerHTML = `
  <h2 class="my-4">Izmena podataka</h2>
  <form id="userChangeForm" method="post" action="submit.php">
      <div class="mb-3">
          <label for="korisnickoIme" class="form-label">Korisničko ime:</label>
          <input type="text" class="form-control" id="korisnickoIme" name="korisnickoIme" placeholder="${korisnik["korisnickoIme"]}">
          <div id="usernameError" class="error-message"></div>
      </div>
      <div class="mb-3">
          <label for="ime" class="form-label">Ime:</label>
          <input type="text" class="form-control" id="ime" name="ime" placeholder="${korisnik["ime"]}">
      </div>
      <div class="mb-3">
          <label for="prezime" class="form-label">Prezime:</label>
          <input type="text" class="form-control" id="prezime" name="prezime" placeholder="${korisnik["prezime"]}">
      </div>
      <div class="mb-3">
          <label for="email3" class="form-label">Email:</label>
          <input type="email" class="form-control" id="email3" name="email" placeholder="${korisnik["email"]}">
          <div id="emailError" class="error-message"></div>
      </div>
      <div class="mb-3">
          <label for="datumRodjenja" class="form-label">Datum Rođenja:</label>
          <input type="date" class="form-control" id="datumRodjenja" name="datumRodjenja" placeholder="${korisnik["datumRodjenja"]}">
          <div id="yearError" class="error-message"</div>
      </div>
      <div class="mb-3">
          <label for="adresa" class="form-label">Adresa:</label>
          <input type="text" class="form-control" id="adresa" name="adresa" placeholder="${korisnik["adresa"]}">
            <div id="addressError" class="error-message"></div>
      </div>
      <div class="mb-3">
          <label for="telefon" class="form-label">Telefon:</label>
          <input type="tel" class="form-control" id="telefon" name="telefon" placeholder="${korisnik["telefon"]}">
          <div id="phoneError" class="error-message"></div>
      </div>
      <div class="mb-3">
          <label for="zanimanje" class="form-label">Zanimanje:</label>
          <input type="text" class="form-control" id="zanimanje" name="zanimanje" placeholder="${korisnik["zanimanje"]}">
      </div>
      <button type="submit" class="btn" id="new-btn" style="display: inline-block">Sačuvaj izmene</button>
      <a type="button" class="btn" href="/html/Korisnici.html">Vrati se nazad</a>
  </form>
  `;
  parent.innerHTML = innerHTML;
  parent.innerHTML = innerHTML;
    document.getElementById("new-btn").addEventListener("click", function (event) {
        event.preventDefault();
        handleFormSubmission(korisnik);
    });

    function validatePhone(phone) {
        return /^-?\d{1,10}$/.test(phone);
    }
    
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateAddress(address) {
        return /^[A-Za-z0-9\s.,\-/]+,\s*[A-Za-z\s]+,\s*\d{5}$/.test(address);
    }
  
  function handleFormSubmission(korisnik) {
    document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]').forEach(input => {
        if (!input.value && input.getAttribute("placeholder")) {
            input.value = input.getAttribute("placeholder");
        }
    });
      let formData = {
          korisnickoIme: document.getElementById("korisnickoIme").value,
          ime: document.getElementById("ime").value,
          prezime: document.getElementById("prezime").value,
          email: document.getElementById("email3").value,
          datumRodjenja: document.getElementById("datumRodjenja").value,
          adresa: document.getElementById("adresa").value,
          telefon: document.getElementById("telefon").value,
          zanimanje: document.getElementById("zanimanje").value,
    };
        const currentYear = new Date().getFullYear();
        const yearRegex = /\b\d{4}\b/;

        for (let user in korisnici) {
            let user_obj = korisnici[user];
            if (formData.korisnickoIme == user_obj.korisnickoIme && formData.korisnickoIme !== korisnik.korisnickoIme) {
                console.log("Korisničko ime već postoji.");
                document.getElementById("usernameError").innerText = "Korisničko ime već postoji.";
                return;
            }
        }
        if (yearRegex.test(formData.datumRodjenja) && parseInt(formData.datumRodjenja) <= currentYear) {
            document.getElementById("yearError").innerText = "";
        } else {
            console.log("Invalid year");
            document.getElementById("yearError").innerText = "Molimo unesite validnu godinu.";
            return;
        }
        if (!validatePhone(formData.telefon)) {
            document.getElementById("phoneError").innerText = "Molimo unesite validan broj telefona.";
            return;
        } else {
            document.getElementById("phoneError").innerText = "";
        }
        if (!validateEmail(formData.email)) {
            document.getElementById("emailError").innerText = "Molimo unesite validnu email adresu.";
            return;
        } else {
            document.getElementById("emailError").innerText = "";
        }
        if (!validateAddress(formData.adresa)) {
            console.log("Invalid address");
            document.getElementById("addressError").innerText = "Molimo unesite validnu adresu formata (ulica i broj, mesto/grad, poštanski broj).";
            return;
        } else {
            document.getElementById("addressError").innerText = "";
        }
  
      updateDataInFirebase(formData, korisnik);
    }  

    function updateDataInFirebase(data, korisnik) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                  console.log("Korisničko ime: " + data.korisnickoIme);
                  console.log("Ime: " + data.ime);
                  console.log("Prezime: " + data.prezime);
                  console.log("Email: " + data.email);
                  console.log("Datum rodjenja: " + data.datumRodjenja);
                  console.log("Adresa: " + data.adresa);
                  console.log("Telefon: " + data.telefon);
                  console.log("Zanimanje: " + data.zanimanje);
                  let messageBox = document.getElementById("message-box");
                      messageBox.textContent = "Korisnik je uspešno izmenjen!";
                      messageBox.classList.add("show");
                      console.log("OK je pritisnuto!");
                      setTimeout(function () {
                          messageBox.classList.remove("show");
                      }, 5000);
                } else {
                    console.error("Error:", this.status);
                    window.location.href = '/html/Greška.html';
                }
            }
        };
        xhttp.open("PUT", firebasedatabase + "/korisnici/" + korisnik + `.json`);
        xhttp.send(JSON.stringify(data));
    }
}