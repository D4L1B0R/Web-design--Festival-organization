const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
document.getElementById("sub").addEventListener("click", function(event) {
    event.preventDefault();
    handleFormSubmission();
});

function validatePhone(phone) {
    return /^(\d{3})\/(\d{3,4}-\d{3,4})$/.test(phone);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleFormSubmission() {
    let formData = {
        naziv: document.getElementById("naziv").value,
        tip: document.getElementById("tip").value,
        prevoz: document.getElementById("prevoz").value,
        cena: document.getElementById("cena").value,
        maxOsoba: document.getElementById("maxOsoba").value,
        opis: document.getElementById("opis").value
    };
    let firebasedatabase_obj = JSON.parse(localStorage.getItem("firebasedatabase"));
    let organizatorExists = false;
    const organizator = document.getElementById("org").value;
    for (let org in firebasedatabase_obj["organizatoriFestivala"]) {
        if (firebasedatabase_obj["organizatoriFestivala"][org]["naziv"] == organizator) {
            organizatorExists = true;
            updateDataInFirebase(formData, firebasedatabase_obj["organizatoriFestivala"][org]["festivali"]);
        }
    }
    if (!organizatorExists) {
        document.getElementById("organizatorError").innerText = "Uneseni organizator ne postoji.";
    }
};    
function updateDataInFirebase(formData, org) {
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
                window.location.href = '/html/Organizatori.html';
            } else {
                console.error("Error:", this.status);
                window.location.href = './html/Greška.html';
            }
        }
    };
    xhttp.open("POST", firebasedatabase + `/festivali/`  + org + `.json`);
    xhttp.send(JSON.stringify(formData));
}