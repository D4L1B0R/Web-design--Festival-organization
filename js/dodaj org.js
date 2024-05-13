const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";

document.getElementById("submit-btn").addEventListener("submit", function(event) {
    event.preventDefault();
    handleFormSubmission();
});

function validatePhone(phone) {
    return /^(\d{3})\/(\d{3,4}-\d{3,4})$/.test(phone);
}

function validateAddress(address) {
    return /^[A-Za-z0-9\s.,\-/]+,\s*[A-Za-z\s]+,\s*\d{5}$/.test(address);
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
        logo: document.getElementById("logo").value,
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

    if (!validateAddress(formData.adresa)) {
        document.getElementById("addressError").innerText = "Molimo unesite validnu adresu formata (ulica i broj, mesto/grad, poštanski broj).";
        return;
    } else {
        document.getElementById("addressError").innerText = "";
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
                console.log("Logo: " + formData.logo);
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