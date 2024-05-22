const firebasedatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";

document.getElementById("form-container").addEventListener("submit", function(event) {
    event.preventDefault();
    const submittedForm = event.target.closest('form');
    if (submittedForm.id === "orgForm") {
        handleFormSubmission(submittedForm);
    }
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
        godinaOsnivanja: document.getElementById("godinaRodjenja").value,
        telefon: document.getElementById("telefon").value,
        email: document.getElementById("email").value,
        logo: document.getElementById("logo").value,
        festivali: "",
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
    if (!validatePhone(formData.telefon)) {
        console.log("Invalid phone number");
        document.getElementById("phoneError").innerText = "Molimo unesite validan broj telefona u formatu 123/4567-890.";
        notValid = false;
    } else {
        document.getElementById("phoneError").innerText = "";
    }

    if (!validateEmail(formData.email)) {
        console.log("Invalid email");
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

function updateDataInFirebase(formData) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log("Form data submitted successfully!");
                window.location.href = '/html/Organizatori.html';
            } else {
                console.error("Error:", this.status);
                window.location.href = '/html/Greška.html';
            }
        }
    };
    xhttp.open("POST", firebasedatabase + `/organizatoriFestivala/.json`);
    xhttp.send(JSON.stringify(formData));
}