const firebasedatabase1 = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
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
        korisnickoIme: document.getElementById("korisnickoIme").value,
        ime: document.getElementById("ime").value,
        prezime: document.getElementById("prezime").value,
        email: document.getElementById("email-reg").value,
        datumRodjenja: document.getElementById("datumRodjenja").value,
        adresa: document.getElementById("adresa").value,
        telefon: document.getElementById("telefon").value,
        zanimanje: document.getElementById("zanimanje").value,
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
    xhttp.open("POST", firebasedatabase1 + "/korisnici.json");
    xhttp.send(JSON.stringify(formData));
}
