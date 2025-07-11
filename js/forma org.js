const firebaseDatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      createOrg(data);
    } else {
      console.error("Error:", this.status);
      window.location.href = './html/Greška.html';
    }
  }
};

xhttp.open("GET", firebaseDatabase + "/organizatoriFestivala.json");
xhttp.send();

function fetchFestivals3(festivals) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        createFest(data, festivals);
      } else {
        console.error("Error:", this.status);
        window.location.href = './html/Greška.html';
      }
    }
  };

  xhttp.open("GET", firebaseDatabase + `/festivali/${festivals}.json`);
  xhttp.send();
}

let orgId;

function confirms() {
  let messageBox = document.getElementById("message-box");
  $('#confirm-modal').modal('hide');
  deleteOrganizer(orgId);
  messageBox.textContent = "Organizator je obrisan!";
  messageBox.classList.add("show");
  setTimeout(function() {
      messageBox.classList.remove("show");
  }, 5000);
  console.log("OK je pritisnuto!");
}

function cancel() {
  let messageBox = document.getElementById("message-box");
  $('#confirm-modal').modal('hide');
  messageBox.textContent = "Organizator nije obrisan!";
  messageBox.classList.add("show");
  console.log("Cancel je pritisnuto!");
  setTimeout(function() {
      messageBox.classList.remove("show");
  }, 5000);
}

function deleteOrganizer(orgId) {
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
  xhttp.open("DELETE", firebaseDatabase + `/organizatoriFestivala/${orgId}.json`);
  xhttp.send();

}

function createOrg(data) {
  let numberOfOrganizers = 0;
  let innerHTML = `
  <table class="table table-bordered border-dark table-hover text-center text-capitalize mx-auto rounded">
    <thead>
      <tr>
        <th scope="col" style="text-align: center;">Naziv</th>
        <th scope="col" style="text-align: center;">Adresa</th>
        <th scope="col" style="text-align: center;">Godina osnivanja</th>
        <th scope="col" style="text-align: center;">Kontakt telefon</th>
        <th scope="col" style="text-align: center;">E-mail</th>
        <th scope="col" style="text-align: center;">Logo</th>
        <th scope="col" style="text-align: center;">Festivali</th>
        <th colspan="2" scope="col" style="text-align: center;">Radnje</th>
      </tr>
    </thead>
    <tbody>`;
  for (let obj in data) {
    let org_obj = data[obj];
    numberOfOrganizers += 1;
    innerHTML += `
    <tr>
      <td style="text-align: center;">${org_obj["naziv"]}</td>
      <td style="text-align: center;">${org_obj["adresa"]}</td>
      <td style="text-align: center;">${org_obj["godinaOsnivanja"]}</td>
      <td style="text-align: center;">${org_obj["kontaktTelefon"]}</td>
      <td style="text-align: center;">${org_obj["email"]}</td>
      <td style="text-align: center;"><img src="${org_obj["logo"]}" alt="${org_obj["naziv"]}" style="width: 100px; max-height: 100px;"></td>
      <td style="text-align: center;"><button class="btn btn-fest" data-festivalsID="${org_obj["festivali"]}">Festivali</button></td>
      <td style="text-align: center;">
        <a class="btn" href="./Festivali/forma festivala.html?organizator=${obj}" style="margin-bottom: 10px;">Izmeni</a>
      </td>
      <td style="text-align: center;">
        <button class="btn btn-danger" id="del-btn-${numberOfOrganizers}" style="display: inline-block" onclick="geek()">Obriši</button>
      </td>
    </tr>
    `;
  }
  innerHTML += `
                    <tr>
                      <th colspan="9" class="text-center">
                        <a class="btn" type="button" href="DodajOrganizatora.html">Dodajte</a>
                        <a class="btn" type="button" href="DodajteFestival.html">Dodajte Festival</a>
                      </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `;
  tableOrg.innerHTML = innerHTML;
  for (let i = 1; i < numberOfOrganizers + 1; i++) {
    document.getElementById(`del-btn-${i}`).addEventListener('click', function() {
      let number = 0;
      for (let obj in data) {
        number +=1;
        if (i == number) {
          $('#confirm-modal').modal('show');
          orgId = obj;
        }
      }
    });
  }

  let sviBtnFestovi = document.getElementsByClassName("btn-fest");
  for (let dugme of sviBtnFestovi) {
    dugme.addEventListener("click", (event) => {
      let id = event.target.getAttribute("data-festivalsID");
      fetchFestivals3(id);
    });
  }
}

let orgID;
let festID;

function confirmsFest() {
  let messageBox = document.getElementById("message-box");
  $('#confirm-modal-fest').modal('hide');
  deleteFestival(orgID, festID);
  messageBox.textContent = "Festival je obrisan!";
  messageBox.classList.add("show");
  setTimeout(function() {
      messageBox.classList.remove("show");
  }, 5000);
  console.log("OK je pritisnuto!");
}

function cancelFest() {
  let messageBox = document.getElementById("message-box");
  $('#confirm-modal-fest').modal('hide');
  messageBox.textContent = "Festival nije obrisan!";
  messageBox.classList.add("show");
  console.log("Cancel je pritisnuto!");
  setTimeout(function() {
      messageBox.classList.remove("show");
  }, 5000);
}

function deleteFestival(orgId, festId) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
          if (this.status == 200) {
              console.log("Festival uspešno obrisan!");
          } else {
              console.error("Error:", this.status);
              window.location.href = '/html/Greška.html';
          }
      }
  };
  xhttp.open("DELETE", firebaseDatabase + `/festivali/${orgId}/${festId}.json`);
  xhttp.send();
}

function createFest(festivals, org_fest) {
  let numberOfFestivals = 0;
  let innerHTML = `<div class="row">`;
  innerHTML += `
  <h1 style="margin: 20px;">Podaci o festivalima</h1>
    <br/>
  `;
  for (let fest in festivals) {
    let value = festivals[fest];
    numberOfFestivals += 1;
    innerHTML += `
    <div class="col-md-4 mb-4" style="margin: 100px;">
      <div class="card">
        <img src="${value["slike"][0]}" class="card-img-top" alt="${value["naziv"]} logo">
        <div class="card-body">
          <h5 class="card-title">${value["naziv"]}</h5>
          <p class="card-text">Cena: ${value["cena"]}</p>
          <p class="card-text">Opis: ${value["opis"]}</p>
          <p class="card-text">Prevoz: ${value["prevoz"]}</p>
          <p class="card-text">Max osoba: ${value["maxOsoba"]}</p>
          <p class="card-text">Tip: ${value["tip"]}</p>
          <a class="btn" id="izmena-kor" href="./Festivali/IzmenaFestivala.html?organizator=${org_fest}&festival=${fest}">Izmeni</a>
          <button id="del-btns-${numberOfFestivals}" class="btn btn-danger" style="display: inline-block">Obriši</button>
        </div>
      </div>
    </div>
    `;
  }
  innerHTML += `</div>`;
  tableFest.innerHTML = innerHTML;
  for (let i = 1; i < numberOfFestivals + 1; i++) {
    document.getElementById(`del-btns-${i}`).addEventListener('click', function() {
      let number = 0;
      for (let obj in festivals) {
        number +=1;
        if (i == number) {
          orgID = org_fest;
          festID = obj;
          $('#confirm-modal-fest').modal('show');
        }
      }
    });
  }
}