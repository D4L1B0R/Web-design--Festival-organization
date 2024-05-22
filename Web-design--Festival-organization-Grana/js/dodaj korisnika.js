const firebasedatabase12 = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) { 
            let data = JSON.parse(this.responseText);
            document.getElementById("userForms").addEventListener("submit", function(event) {
                const formInputs = Array.from(this.querySelectorAll("input"));
                const allInputsFilled = formInputs.every(input => input.value !== "");
                if (!allInputsFilled) {
                    event.preventDefault();
                    console.log("Popunite sva obavezna polja.");
                } else {
                    event.preventDefault();
                    handleFormSubmission(data); 
                }
            }); 
        } else {
            console.error("Error:", this.status);
            window.location.href = '/html/Greška.html';
        }
    }
    xhttp.open("GET", firebasedatabase4 + "/korisnici.json");
    xhttp.send();
}

function validatePhone(phone) {
    return /^-?\d{1,10}$/.test(phone);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateAddress(address) {
    return /^[A-Za-z0-9\s.,\-/]+,\s*[A-Za-z\s]+,\s*\d{5}$/.test(address);
}

function handleFormSubmission(firebasedatabaseUsers_obj) {
    let formData = {
        korisnickoIme: document.getElementById("korisnickoIme4").value,
        ime: document.getElementById("ime4").value,
        prezime: document.getElementById("prezime4").value,
        email: document.getElementById("email4").value,
        datumRodjenja: document.getElementById("datumRodjenja4").value,
        adresa: document.getElementById("adresa4").value,
        telefon: document.getElementById("telefon4").value,
        zanimanje: document.getElementById("zanimanje4").value,
    };
    const currentYear = new Date().getFullYear();
    const yearRegex = /\b\d{4}\b/;

    for (let user in firebasedatabaseUsers_obj) {
        let user_obj = firebasedatabaseUsers_obj[user];
        if (formData.korisnickoIme === user_obj.korisnickoIme) {
            console.log("Korisničko ime već postoji.");
            document.getElementById("usernameError").innerText = "Korisničko ime već postoji.";
            return;
        }
    }
    notValid = true;
    if (yearRegex.test(formData.datumRodjenja) && parseInt(formData.datumRodjenja) <= currentYear) {
        console.log("Valid year");
        document.getElementById("yearError").innerText = "";
    } else {
        console.log("Invalid year");
        document.getElementById("yearError").innerText = "Molimo unesite validnu godinu.";
        notValid = false;
    }
    if (!validatePhone(formData.telefon)) {
        document.getElementById("phoneError").innerText = "Molimo unesite validan broj telefona.";
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
                window.location.href = '/html/Korisnici.html';
            } else {
                console.error("Error:", this.status);
                window.location.href = '/html/Greška.html';
            }
        }
    };
    xhttp.open("POST", firebasedatabase12 + `/korisnici/.json`);
    xhttp.send(JSON.stringify(formData));
}