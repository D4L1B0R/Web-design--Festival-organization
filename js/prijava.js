const firebasedatabase3 = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
const xhttplogin = new XMLHttpRequest();

document.getElementById("form-container").addEventListener("submit", function(event) {
    event.preventDefault();
    const submittedForm = event.target.closest('form');
    console.log("Submitted form:", submittedForm);
    if (submittedForm && submittedForm.id === "loginForm") {
        console.log("Handling login form submission...");
        handleFormLoginSubmission();
    }
    else {
        console.log("Form submission not handled.");
    }
});

function handleFormLoginSubmission() {
    console.log("Hand login form submission...");
    let formData = {
        korisnickoIme: document.getElementById("username").value,
        lozinka: document.getElementById("password").value,
    };
    updateDataInFirebaseLogin(formData);
}

function updateDataInFirebaseLogin(formData) {
    xhttplogin.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) { 
                data = JSON.parse(this.responseText);
                let isLoggedIn = false;

                for (let user in data) {
                    if (formData.korisnickoIme === data[user].korisnickoIme && formData.lozinka === data[user].lozinka) {
                        isLoggedIn = true;
                        break;
                    }
                }

                if (isLoggedIn) {
                    $('#exampleModal2').modal('hide');
                    let messageBox = document.getElementById("message-box");
                    messageBox.textContent = "Uspešno ste se prijavili " + formData.korisnickoIme + "!";
                    messageBox.classList.add("show");
                    setTimeout(function () {
                        messageBox.classList.remove("show");
                    }, 5000);
                } else {
                    console.log("Pogrešno korisničko ime ili lozinka");
                }
            } else {
                console.error("Error:", this.status);
                window.location.href = '/html/Greška.html';
            }
        }
    };
    xhttplogin.open("GET", firebasedatabase3 + "/korisnici.json");
    xhttplogin.send();
}