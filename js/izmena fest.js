const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
const parent = document.getElementById("forma_fest");
const xhttp = new XMLHttpRequest();

function getFestival() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("festival");
}

function getOrganizator() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("organizator");
}

const org = getOrganizator();
const fest = getFestival();

xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            let data = JSON.parse(this.responseText);
            console.log("Data:", data);
            for (let obj in data) {
                if (obj == org) {
                    for (let festivali in data[obj]) {
                        if (festivali == fest) {
                            let fest = data[obj][festivali];
                            create(fest);
                        }
                    }
                }
            }
        } else {
            console.error("Error:", this.status);
            window.location.href = './html/Greška.html';
        }
    }
};

xhttp.open("GET", firebasedatabase + "/festivali.json");
xhttp.send();

function create(festival) {
    let innerHTML = `
    <h2 class="my-4">Dodavanje podataka</h2>
    <form id="userForm">
        <div class="mb-3">
            <label for="naziv" class="form-label">Naziv festivala:</label>
            <input type="text" class="form-control" id="naziv" name="naziv" placeholder="${festival["naziv"]}">
        </div>
        <div class="mb-3">
            <select id="tip">
                <option disabled selected value="">-- Izaberite tip --</option>
                <option value="muzicki">Muzički</option>
                <option value="umetnicki">Umetnički</option>
                <option value="filmski">Filmski</option>
                <option value="gastronomski">Gastronomski</option>
                <option value="edukativni">Edukativni</option>
            </select>
        </div>
        <div class="mb-3">
            <select id="prevoz">
                <option disabled selected value="">-- Izaberite prevoz --</option>
                <option value="avion">Avion</option>
                <option value="autobus">Autobus</option>
                <option value="sopstveni">Sopstveni prevoz</option>
            </select>    
        </div>
        <div class="mb-3">
            <label for="cena" class="form-label">Cena (RSD):</label>
            <input type="number" min="0" class="form-control" id="cena" name="cena" placeholder="${festival["cena"]}">
            <div id="priceError" class="error-message"></div>
        </div>
        <div class="mb-3">
            <label for="maxOsoba" class="form-label">Ograničenje broja osoba:</label>
            <input type="number" min="1" class="form-control" id="maxOsoba" name="maxOsoba" placeholder="${festival["maxOsoba"]}">
            <div id="numberError" class="error-message"></div>
        </div>
        <div class="mb-3">
            <label for="slike" class="form-label">Unesite slike (svaki link je razmaknut sa zarezom):</label>
            <textarea class="form-control" id="slike" name="slike" placeholder="${festival["slike"]}"></textarea>
        </div>
        <div class="mb-3">
            <label for="opis" class="form-label">Opišite događaj:</label>
            <textarea class="form-control" id="opis" name="opis" placeholder="${festival["opis"]}"></textarea>
        </div>
        <div id="message-box" class="message-box"></div>
        <button type="button" class="btn" id="new-btn" style="display: inline-block">Sačuvaj izmene</button>
        <a type="button" class="btn" href="/html/Organizatori.html">Vrati se nazad</a>
    </form>
    `;

    parent.innerHTML = innerHTML;

    document.getElementById("new-btn").addEventListener("click", function () {
        handleFormSubmission();
    });

function handleFormSubmission() {
  document.querySelectorAll('input[type="text"], input[id="cena"], input[id="maxOsoba"], textarea', 'select').forEach(input => {
    if (!input.value && input.getAttribute("placeholder")) {
        input.value = input.getAttribute("placeholder");
    }
});
    let formData = {
        naziv: document.getElementById("naziv").value,
        tip: document.getElementById("tip").value,
        prevoz: document.getElementById("prevoz").value,
        cena: document.getElementById("cena").value,
        maxOsoba: document.getElementById("maxOsoba").value,
        opis: document.getElementById("opis").value,
        slike: document.getElementById("slike").value.split(","),
    };
    if (!isNumeric(formData.cena)) {
      document.getElementById("priceError").innerText = "Cena mora biti numerička vrednost.";
      return;
    } else {
      document.getElementById("priceError").innerText = "";
    }
    if (!isNumeric(formData.maxOsoba)) {
      document.getElementById("numberError").innerText = "Molimo unesite numeričku vrednost.";
      return;
    } else {
      document.getElementById("numberError").innerText = "";
    }

    updateDataInFirebase(formData);
}

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function updateDataInFirebase(data) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log("naziv:", data.naziv);
                console.log("tip:", data.tip);
                console.log("prevoz:", data.prevoz);
                console.log("cena:", data.cena);
                console.log("maxOsoba:", data.maxOsoba);
                console.log("opis:", data.opis);
                console.log("slike:", data.slike);
                
                let messageBox = document.getElementById("message-box");
                messageBox.textContent = "Festival je uspešno izmenjen!";
                messageBox.classList.add("show");
                setTimeout(function () {
                    messageBox.classList.remove("show");
                }, 5000);
            } else {
                console.error("Error:", this.status);
                window.location.href = '/html/Greška.html';
            }
        }
    };
    xhttp.open("PUT", firebasedatabase + `/festivali/${org}/${fest}.json`);
    xhttp.send(JSON.stringify(data));
}
}