const firebasedatabase4 = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
document.getElementById("regForms").addEventListener("submit", function(event) {
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

function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleFormSubmission() {
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

    if (!validatePhone(formData.telefon)) {
        document.getElementById("phoneError").innerText = "Molimo unesite validan broj telefona.";
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
            }
        }
    };
    xhttp.open("POST", firebasedatabase4 + "/korisnici.json");
    xhttp.send(JSON.stringify(formData));
}
