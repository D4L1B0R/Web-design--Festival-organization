const firebasedatabase3 = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
const xhttplogins = new XMLHttpRequest();
let isLoggedIn = false;

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    handleFormLoginSubmission();
});

function handleFormLoginSubmission() {
    let formData = {
        korisnickoIme: document.getElementById("username").value,
        lozinka: document.getElementById("password").value,
    };
    updateDataInFirebaseLogin(formData);
}

function updateDataInFirebaseLogin(formData) {
    xhttplogins.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) { 
               let data = JSON.parse(this.responseText);
                for (let user in data) {
                    let user_obj = data[user];
                    if (formData.korisnickoIme == user_obj.korisnickoIme && formData.lozinka == user_obj.lozinka) {
                        console.log("Prijava uspešna!");
                        let messageBox = document.getElementById("message-box");
                        messageBox.textContent = "Uspešno ste se prijavili " + formData.korisnickoIme + "!";
                        messageBox.classList.add("show");
                        setTimeout(function () {
                            messageBox.classList.remove("show");
                        }, 5000);
                        isLoggedIn = true;
                        document.getElementById("loginButton").textContent = "Odjava";
                    } else {
                        console.log("Korisnik ne postoji.");
                    }
                }
            } else {
                console.error("Error:", this.status);
                window.location.href = '/html/Greška.html';
            }
        }
    };
    xhttplogins.open("GET", firebasedatabase3 + "/korisnici.json");
    xhttplogins.send();
}