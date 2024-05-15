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
        <label for="naziv" class="form-label">Naziv:</label>
        <input type="text" class="form-control" id="naziv" name="naziv" placeholder="${organizator["naziv"]}">
    </div>
    <div class="mb-3">
        <label for="adresa" class="form-label">Adresa:</label>
        <input type="text" class="form-control" id="adresa" name="adresa" placeholder="${organizator["adresa"]}">
        <div id="addressError" class="error-message"></div>
    </div>
    <div class="mb-3">
        <label for="godinaOsnivanja" class="form-label">Godina osnivanja:</label>
        <input type="text" class="form-control" id="godinaOsnivanja" name="godinaOsnivanja" placeholder="${organizator["godinaOsnivanja"]}">
        <div id="yearError" class="error-message"></div>
    </div>
    <div class="mb-3">
        <label for="kontaktTelefon" class="form-label">Kontakt telefon:</label>
        <input type="tel" class="form-control" id="kontaktTelefon" name="kontaktTelefon" placeholder="${organizator["kontaktTelefon"]}">
        <div id="phoneError" class="error-message"></div>
    </div>
    <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" class="form-control" id="em" name="email" placeholder="${organizator["email"]}">
        <div id="emailError" class="error-message"></div>
    </div>
    <button type="button" class="btn" id="new-btn" style="display: inline-block">Sačuvaj izmene</button>
    <a type="button" class="btn" href="/html/Organizatori.html">Vrati se nazad</a>
</form>
`;

    parent.innerHTML = innerHTML;
    document.getElementById("new-btn").addEventListener("click", function (event) {
        event.preventDefault();
        handleFormSubmission();
    });
  function validatePhone(phone) {
      return /^(\d{3})\/(\d{3,4}-\d{3,4})$/.test(phone);
  }
  
  function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validateAddress(address) {
    return /^[A-Za-z0-9\s.,\-/]+,\s*[A-Za-z\s]+,\s*\d{5}$/.test(address);
}
  
    function handleFormSubmission() {
        document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]').forEach(input => {
            if (!input.value && input.getAttribute("placeholder")) {
                input.value = input.getAttribute("placeholder");
            }
        });
        let formData = {
            naziv: document.getElementById("naziv").value,
            adresa: document.getElementById("adresa").value,
            godinaOsnivanja: document.getElementById("godinaOsnivanja").value,
            kontaktTelefon: document.getElementById("kontaktTelefon").value,
            email: document.getElementById("em").value,
            logo: organizator["logo"],
            festivali: organizator["festivali"]
        };
        
        const currentYear = new Date().getFullYear();
        const yearRegex = /\b\d{4}\b/;
        let notValid = true;
        if (yearRegex.test(formData.godinaOsnivanja) && parseInt(formData.godinaOsnivanja) <= currentYear) {
            console.log("Valid year");
            document.getElementById("yearError").innerText = "";
        } else {
            console.log("Invalid year");
            document.getElementById("yearError").innerText = "Molimo unesite validnu godinu.";
            notValid = false;
        }
        if (!validatePhone(formData.kontaktTelefon)) {
            document.getElementById("phoneError").innerText = "Molimo unesite validan broj telefona u formatu 123/4567-890.";
            notValid = false;
        } else {
            document.getElementById("phoneError").innerText = "";
        }
        if (!validateEmail(formData.email)) {
            document.getElementById("emailError").innerText = "Molimo unesite validnu email adresu.";
            notValid = false;
        } else {
            document.getElementById("emailError").innerText = "";
        }
        if (!validateAddress(formData.adresa)) {
            console.log("Invalid address");
            document.getElementById("addressError").innerText = "Molimo unesite validnu adresu formata (ulica i broj, mesto/grad, poštanski broj).";
            notValid = false;
        } else {
            document.getElementById("addressError").innerText = "";
        }
        if (notValid) {
            updateDataInFirebase(formData);
        }
    }  

    function updateDataInFirebase(data) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log("Naziv: " + data.naziv);
                    console.log("Adresa: " + data.adresa);
                    console.log("Godina osnivanja: " + data.godinaOsnivanja);
                    console.log("Kontakt telefon: " + data.kontaktTelefon);
                    console.log("Email: " + data.email);
                    console.log("Logo: " + data.logo);
                    console.log("Festivali: " + data.festivali);
                    let messageBox = document.getElementById("message-box");
                        messageBox.textContent = "Organizator je uspešno izmenjen!";
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
        xhttp.open("PUT", firebasedatabase + `/organizatoriFestivala/${obj}.json`);
        xhttp.send(JSON.stringify(data));
    }
}