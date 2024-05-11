const firebaseDatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";
parent = document.getElementById("forma_korisnici");
const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        create(data);
    } else {
      console.error("Error:", this.status);
      window.location.href = './html/Greška.html';
    }
  }
};

xhttp.open("GET", firebaseDatabase + "/korisnici.json");
xhttp.send();

function create(korisnik) {
  let brojKorisnika = 0;
  let innerHTML = `
  <table class="table table-bordered border-dark table-hover text-center text-capitalize mx-auto rounded">
    <thead>
      <tr>
        <th scope="col" style="text-align: center;">Korisničko ime</th>
        <th scope="col" style="text-align: center;">Ime</th>
        <th scope="col" style="text-align: center;">Prezime</th>
        <th scope="col" style="text-align: center;">Email</th>
        <th scope="col" style="text-align: center;">Datum rođenja</th>
        <th scope="col" style="text-align: center;">Adresa</th>
        <th scope="col" style="text-align: center;">Telefon</th>
        <th scope="col" style="text-align: center;">Zanimanje</th>
        <th colspan="2" scope="col" style="text-align: center;">Radnje</th>
      </tr>
    </thead>
    <tbody>`;
  for (let obj in korisnik) {
    let kor_obj = korisnik[obj];
    brojKorisnika += 1;
    innerHTML += `
    <tr>
      <td style="text-align: center;">${kor_obj["korisnickoIme"]}</td>
      <td style="text-align: center;">${kor_obj["ime"]}</td>
      <td style="text-align: center;">${kor_obj["prezime"]}</td>
      <td style="text-align: center;">${kor_obj["email"]}</td>
      <td style="text-align: center;">${kor_obj["datumRodjenja"]}</td>
      <td style="text-align: center;">${kor_obj["adresa"]}</td>
      <td style="text-align: center;">${kor_obj["telefon"]}</td>
      <td style="text-align: center;">${kor_obj["zanimanje"]}</td>
      <td style="text-align: center;">
        <a class="btn" href="./Korisnici/forma korisnika.html?korisnik=${obj}" style="margin-bottom: 10px;">Izmeni</a>
      </td>
      <td style="text-align: center;">
        <button class="btn btn-danger" id="del-btn-${brojKorisnika}" style="display: inline-block" onclick="geek()">Obriši</button>
      </td>
    </tr>
    `;
  }
  innerHTML += `
                    <tr>
                      <th colspan="10" class="text-center">
                        <a class="btn" type="button" href="DodajKorisnika.html">Dodajte</a>
                      </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `;
  forma_korisnici.innerHTML = innerHTML;
  for (let i = 1; i < brojKorisnika + 1; i++) {
    document.getElementById(`del-btn-${i}`).addEventListener("click", function () {
      let number = 0;
      for (let obj in korisnik) {
        number +=1;
        if (i == number) {
          geek(obj);
        }
      }
    });
  }

  function geek(UserId) {
    let messageBox = document.getElementById("message-box");
    let result = confirm("Da li ste sigurni da želite da obrišete korisnika?");
    if (result === true) {
        deleteUser(UserId);
        messageBox.textContent = "Korisnik je obrisan!";
        messageBox.classList.add("show");
        console.log("OK je pritisnuto!");
    } else {
        messageBox.textContent = "Korisnik nije obrisan!";
        messageBox.classList.add("show");
        console.log("Cancel je pritisnuto!");
    }
    setTimeout(function() {
        messageBox.classList.remove("show");
    }, 5000);
  }

  function deleteUser(UserId) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log("Organizator uspešno obrisan!");
            } else {
                console.error("Error:", this.status);
                window.location.href = './html/Greška.html';
            }
        }
    };
    xhttp.open("DELETE", firebaseDatabase + `/korisnici/${UserId}.json`);
    xhttp.send();
  
  }
};