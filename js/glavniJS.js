document.addEventListener("DOMContentLoaded", function() {
    const firebasedatabase3 = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
    const xhttplogins = new XMLHttpRequest();
    let isLoggedIn = false;

    document.addEventListener("submit", function(event) {
        if (event.target && event.target.id === "loginForm") {
            if (isLoggedIn) {
                console.log("Odjava uspešna!");
                let messageBox = document.getElementById("message-box");
                messageBox.textContent = "Uspešno ste se odjavili!";
                messageBox.classList.add("show");
                setTimeout(function () {
                    messageBox.classList.remove("show");
                }, 5000);
                isLoggedIn = false;
                document.getElementById("login-btn").textContent = "Prijavi se";
            } else {
            event.preventDefault();
            console.log("Handling login form submission...");
            handleFormLoginSubmission();
            }
        }
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
                        if (!isLoggedIn && formData.korisnickoIme == user_obj.korisnickoIme && formData.lozinka == user_obj.lozinka) {
                            console.log("Prijava uspešna!");
                            let messageBox = document.getElementById("message-box");
                            messageBox.textContent = "Uspešno ste se prijavili " + formData.korisnickoIme + "!";
                            messageBox.classList.add("show");
                            setTimeout(function () {
                                messageBox.classList.remove("show");
                            }, 5000);
                            document.getElementById("username").value = "";
                            document.getElementById("password").value = "",
                            isLoggedIn = true;
                            document.getElementById("login-btn").textContent = "Odjava";
                        } else {
                            console.log("Pogrešno korisničko ime ili lozinka");
                            let messageBox = document.getElementById("message-box");
                            messageBox.textContent = "Nepostojeći korisnik!";
                            messageBox.classList.add("show");
                            setTimeout(function () {
                                messageBox.classList.remove("show");
                            }, 5000);
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
    };
});