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
            <label for="tip" class="form-label">Tip:</label>
            <input type="text" class="form-control" id="tip" name="tip" placeholder="${festival["tip"]}">
        </div>
        <div class="mb-3">
            <label for="prevoz" class="form-label">Prevoz:</label>
            <input type="text" class="form-control" id="prevoz" name="prevoz" placeholder="${festival["prevoz"]}">
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
  document.querySelectorAll('input[type="text"], input[id="cena"], input[id="maxOsoba"], textarea').forEach(input => {
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
        slike: festival["slike"]
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
                console.log("Uspešno izmenjeni podaci!");
                let messageBox = document.getElementById("message-box");
                messageBox.textContent = "Festival je uspešno izmenjen!";
                messageBox.classList.add("show");
                setTimeout(function () {
                    messageBox.classList.remove("show");
                }, 5000);
            } else {
                console.error("Error:", this.status);
                window.location.href = './html/Greška.html';
            }
        }
    };
    xhttp.open("PUT", firebasedatabase + `/festivali/${org}/${fest}.json`);
    xhttp.send(JSON.stringify(data));
}
}