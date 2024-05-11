const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
document.getElementById("submit-btn").addEventListener("click", function(event) {
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
        adresa: document.getElementById("adresa").value,
        godinaRodjenja: document.getElementById("godinaRodjenja").value,
        telefon: document.getElementById("telefon").value,
        email: document.getElementById("em").value,
    };
    if (!validatePhone(formData.telefon)) {
        document.getElementById("phoneError").innerText = "Molimo unesite validan broj telefona u formatu 123/4567-890.";
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

    updateDataInFirebase(formData);
}

function updateDataInFirebase(formData) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log("Naziv: " + formData.naziv);
                console.log("Adresa: " + formData.adresa);
                console.log("Godina rodjenja: " + formData.godinaRodjenja);
                console.log("Telefon: " + formData.telefon);
                console.log("Email: " + formData.email);
                window.location.href = '/html/Organizatori.html';
            } else {
                console.error("Error:", this.status);
                window.location.href = './html/Greška.html';
            }
        }
    };
    xhttp.open("POST", firebasedatabase + `/organizatoriFestivala/.json`);
    xhttp.send(JSON.stringify(formData));
}
