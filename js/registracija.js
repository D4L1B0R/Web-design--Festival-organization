const firebasedatabase4 = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";

const xhttpreg = new XMLHttpRequest();
document.getElementById("form-container").addEventListener("submit", function(event) {
    event.preventDefault();
    const submittedForm = event.target.closest('form');
    if (submittedForm.id === "regForms") {
        xhttpreg.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) { 
                    let data = JSON.parse(firebasedatabase4.responseText);
                    handleFormRegistrationSubmission(data);
                } else {
                    console.error("Error:", this.status);
                    window.location.href = '/html/Greška.html';
                }
            }
            xhttpreg.open("GET", firebasedatabase4 + "/korisnici.json");
            xhttpreg.send();
        }
    }
});

function validatePhoneReg(phone) {
    return /^\d{10}$/.test(phone);
}

function validateEmailReg(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateAddress(address) {
    return /^[A-Za-z0-9\s.,\-/]+,\s*[A-Za-z\s]+,\s*\d{5}$/.test(address);
}

function handleFormRegistrationSubmission(firebasedatabaseUsers_obj) {
    let formData = {
        korisnickoIme: document.getElementById("reg-korisnickoIme").value,
        ime: document.getElementById("reg-ime").value,
        prezime: document.getElementById("reg-prezime").value,
        email: document.getElementById("reg-email").value,
        datumRodjenja: document.getElementById("reg-datumRodjenja").value,
        adresa: document.getElementById("reg-adresa").value,
        telefon: document.getElementById("reg-telefon").value,
        zanimanje: document.getElementById("reg-zanimanje").value,
        lozinka: document.getElementById("reg-lozinka").value,
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
        if (yearRegex.test(formData.datumRodjenja) && parseInt(formData.datumRodjenja) <= currentYear) {
            console.log("Valid year");
            document.getElementById("yearErrorReg").innerText = "";
        } else {
            console.log("Invalid year");
            document.getElementById("yearErrorReg").innerText = "Molimo unesite validnu godinu.";
            return;
        }
        if (!validatePhone(formData.telefon)) {
            document.getElementById("phoneErrorReg").innerText = "Molimo unesite validan broj telefona.";
            return;
        } else {
            document.getElementById("phoneErrorReg").innerText = "";
        }
        if (!validateEmail(formData.email)) {
            document.getElementById("emailErrorReg").innerText = "Molimo unesite validnu email adresu.";
            return;
        } else {
            document.getElementById("emailErrorReg").innerText = "";
        }
        if (!validateAddress(formData.adresa)) {
        console.log("Invalid address");
        document.getElementById("addressErrorReg").innerText = "Molimo unesite validnu adresu formata (ulica i broj, mesto/grad, poštanski broj).";
        return;
        } else {
            document.getElementById("addressErrorReg").innerText = "";
        }

    updateDataInFirebaseReg(formData);
}

function updateDataInFirebaseReg(formData) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) { 
                console.log("Registracija uspešna!");
                $('#exampleModal').modal('hide');
                let messageBox = document.getElementById("message-box");
                messageBox.textContent = "Uspešno ste se registrovali!";
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
    xhttp.open("POST", firebasedatabase4 + "/korisnici.json");
    xhttp.send(JSON.stringify(formData));
}