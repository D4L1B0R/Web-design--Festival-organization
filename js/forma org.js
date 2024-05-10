const firebaseDatabase = "https://evento-13796-default-rtdb.europe-west1.firebasedatabase.app";

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      createOrg(data);
    } else {
      console.log("Error:", this.status);
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
        console.log("Error fetching festivals:", this.status);
      }
    }
  };

  xhttp.open("GET", firebaseDatabase + `/festivali/${festivals}.json`);
  xhttp.send();
}

function createOrg(data) {
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
        <button class="btn btn-danger" id="del-btn" style="display: inline-block">Obriši</button>
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
  let sviBtnFestovi = document.getElementsByClassName("btn-fest");
  for (let dugme of sviBtnFestovi) {
    dugme.addEventListener("click", (event) => {
      let id = event.target.getAttribute("data-festivalsID");
      fetchFestivals3(id);
    });
  }
}

function createFest(festivals, org_fest) {
  let innerHTML = `<div class="row">`;
  innerHTML += `
  <h1 style="margin: 20px;">Podaci o festivalima korisnika</h1>
    <br/>
  `;
  for (let fest in festivals) {
    let value = festivals[fest];
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
          <button class="btn btn-danger btnObrisiF">Obriši</button>
        </div>
      </div>
    </div>
    `;
  }
  innerHTML += `</div>`;
  tableFest.innerHTML = innerHTML;
}