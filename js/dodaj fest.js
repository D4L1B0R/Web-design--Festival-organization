const firebaseDatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app/";
const festivaliEndpoint = firebaseDatabase + "festivali/";
const korisniciEndpoint = firebaseDatabase + "organizatoriFestivala/";

document.getElementById("festForm").addEventListener("submit", function(event) {
    const formInputs = Array.from(this.elements).filter(input => input.tagName === "INPUT");
    const allInputsFilled = formInputs.every(input => input.value !== "");

    if (!allInputsFilled) {
        event.preventDefault();
        console.log("Popunite sva obavezna polja.");
    } else {
        event.preventDefault();
        handleFormSubmission(); 
    }
});                  

function handleFormSubmission() {
    let formData = {
        naziv: document.getElementById("naziv").value,
        tip: document.getElementById("tip").value,
        prevoz: document.getElementById("prevoz").value,
        cena: document.getElementById("cena").value,
        maxOsoba: document.getElementById("maxOsoba").value,
        opis: document.getElementById("opis").value,
        slike: document.getElementById("logo").value,
    };
    const orgInput = document.getElementById("org").value;
    fetch(korisniciEndpoint + ".json")
        .then(response => response.json())
        .then(data => {
            let organizatorExists = false;
            for (const key in data) {
                if (data.hasOwnProperty(key) && data[key].naziv === orgInput) {
                    organizatorExists = true;
                    updateDataInFirebase(formData, data[key].festivali);
                    break;
                }
            }
            if (!organizatorExists) {
                document.getElementById("organizatorError").innerText = "Uneseni organizator ne postoji.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateDataInFirebase(formData, orgFestivali) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log("Naziv: " + formData.naziv);
                console.log("Tip: " + formData.tip);
                console.log("Prevoz: " + formData.prevoz);
                console.log("Cena: " + formData.cena);
                console.log("Max osoba: " + formData.maxOsoba);
                console.log("Opis: " + formData.opis);
                console.log("Slike: " + formData.slike);
                window.location.href = '/html/Organizatori.html';
            } else {
                console.error("Error:", this.status);
                window.location.href = './html/Greška.html';
            }
        }
    };
    xhttp.open("POST", festivaliEndpoint + orgFestivali + ".json");
    xhttp.send(JSON.stringify(formData));
}