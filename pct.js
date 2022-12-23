const tableBody = document.querySelector("#table tbody");
const contIdEdit = document.getElementById("contIdEdit");
function inputvalue() {
const nom = document.getElementById("nom").value;
const marque = document.getElementById("marque").value;
const prix = document.getElementById("prix").value;
const date = document.getElementById("date").value;
const type = document.getElementById("type").value;
const Promo = document.getElementsByName("M");
return new product(nom,marque,prix,date,type,promotion(Promo));
}
function getinput() {
  const nom = document.getElementById("nom");
  const marque = document.getElementById("marque");
  const prix = document.getElementById("prix");
  const date = document.getElementById("date");
  const type = document.getElementById("type");
  const Promo = document.getElementsByName("M");
  return new product(nom,marque,prix,date,type,promotion(Promo));
  }
  var promo;
function promotion(Promot) {
  console.log(Promot.length);
  for (let i = 0; i < Promot.length; i++) {
    if (Promot[i].checked) {
     return Promot[i].value;
    }
  }
}
const Promo = document.getElementsByName("M");
const mis1 = document.querySelector(".mis1");
const ajt = document.getElementById("btn");
// validation

function valide() {
  const nomValue = nom.value.trim();
  const marqueValue = marque.value.trim();
  const prixValue = prix.value.trim();
  const dateValue = date.value.trim();
  const typeValue = type.value.trim();
  

  if (inputvalue().nom === "") {
    setErrorFor(getinput().nom, "nom cannot be blank");
  } else if ((inputvalue().nom.lenght <= 3) | (inputvalue().nom.lenght > 30)) {
    setErrorFor(getinput().nom, "nom is invalide");
  } else {
    setSuccessFor(getinput().nom, "good");
  }
  if (inputvalue().marque === "") {
    console.log(marqueValue);
    setErrorFor(getinput().marque, "marque cannot be blank");
  } else if ((inputvalue().marque.lenght <= 3) | (marque.value.lenght > 30)) {
    setErrorFor(getinput().marque, "marque is invalide");
  } else {
    setSuccessFor(getinput().marque, "good");
  }
  if (inputvalue().prix === "") {
    setErrorFor(getinput().prix, "prix cannot be blank");
  } else {
    setSuccessFor(getinput().prix);
  }
  if (inputvalue().date === "") {
    setErrorFor(getinput().date, "date cannot be blank");
  } else {
    setSuccessFor(getinput().date);
  }
  if (inputvalue().type === "") {
    setErrorFor(getinput().type, "type cannot be blank");
  } else {
    setSuccessFor(getinput().type);
  }
  for (let i = 0; i < Promo.length; i++) {
    if (Promo[i].checked) {
      setSuccessFor(Promo[i]);
      break;
    }else{
      setErrorFor(Promo[i], "chose one");
    }
  }
  if (Promo[0].checked) {
    promo = "Oui";
  } else if (Promo[1].checked) {
    promo = "Non";
  } 
}
function setErrorFor(theinput,message) {
  theinput.closest(".form").querySelector("small").textContent = message;
  console.log(theinput.closest(".form"));
  theinput.closest(".form").className = "form error";
}
function setSuccessFor(theinput) {
  theinput.closest(".form").querySelector("small").textContent = "";
  console.log(theinput.closest(".form"));
  theinput.closest(".form").className = "form success";
}
function formvalidate() {
  let check = true;
  const formcontrol = document.querySelectorAll(".form");
  for (let i = 0; i < formcontrol.length; i++) {
    console.log(formcontrol[i]);
    if (formcontrol[i].classList.contains("error")) {
      check = false;
    }
  }
  return check;
}
var selectedRow = null;
ajt.onclick = function getitdone() {
  if(ajt.value=== "Ajouter")
  {  
    valide();
   
    if(formvalidate() == true){
      let id = Math.floor(Math.random() * 1000000);
      console.log(id);
      const newProd = new Product(
        id,
        nom.value,
        prix.value,
        marque.value,
        date.value,
        type.value,
        promo
      );
      newProd.showData().storeProduct();
      nom.value = "";
      prix.value = "";
      marque.value = "";
      date.value = "";
      type.value = "";
      Promo[0].checked = Promo[0].unchecked;
      Promo[1].checked = Promo[1].unchecked;
    } else {
      valide();
    }
  } else if(ajt.value === "Modifier")
  {
    valide();
    if (formvalidate() == true) {
      var id = contIdEdit.value;
      const newProd = new Product(
        id,
        nom.value,
        prix.value,
        marque.value,
        date.value,
        type.value,
        promo
      );
      newProd.updateProduct(id);
      tableBody.innerHTML = "";
      Product.showAllProducts();
      nom.value = "";
      prix.value = "";
      marque.value = "";
      date.value = "";
      type.value = "";
      Promo[0].checked = Promo[0].unchecked;
      Promo[1].checked = Promo[1].unchecked;
      document.getElementById("btn").value = "Ajouter";
    } else {
      valide();
    }
  }

}
class Product {
  constructor(id, nom, prix, marque, date, type, promo) {
    this.id = id;
    this.nom = nom;
    this.prix = prix;
    this.marque = marque;
    this.date = date;
    this.type = type;
    this.promo = promo;
  }
  showData() {
    Product.showHtml(
      this.id,
      this.nom,
      this.prix,
      this.marque,
      this.date,
      this.type,
      this.promo
    );
    return this;
  }
  storeProduct() {
    const allData = JSON.parse(localStorage.getItem("products")) ?? [];
    allData.push({
      id: this.id,
      nom: this.nom,
      prix: this.prix,
      marque: this.marque,
      date: this.date,
      type: this.type,
      promo: this.promo,
    });
    localStorage.setItem("products", JSON.stringify(allData));
  }
  static showAllProducts() {
    if (localStorage.getItem("products")) {
      JSON.parse(localStorage.getItem("products")).forEach((item) => {
        Product.showHtml(
          item.id,
          item.nom,
          item.prix,
          item.marque,
          item.date,
          item.type,
          item.promo
        );
      });
    }
  }
  updateProduct(id) {
    const newItem = {
      id: id,
      nom: this.nom,
      prix: this.prix,
      marque: this.marque,
      date: this.date,
      type: this.type,
      promo: this.promo,
    };
    const updateData = JSON.parse(localStorage.getItem("products")).map(
      (item) => {
        if (item.id == id) {
          return newItem;
        }
        return item;
      }
    );
    localStorage.setItem("products", JSON.stringify(updateData));


  static showHtml(id, nom, prix, marque, date, type, promo) {
    const trEl = document.createElement("tr");
    trEl.innerHTML = `
              <tr  role='row'>
              <td>${nom}</td>
              <td>${prix}</td>
              <td>${marque}</td>
              <td>${date}</td>
              <td>${type}</td>
              <td>${promo}</td>
                  <td>
                      <button   class="btn btn-info edit" data-id="${id}">Edit</button>
                      <button  class="btn btn-danger delete" data-id="${id}">Delete</button>
                  </td>
              </tr>
          `;
    tableBody.appendChild(trEl);
  }
}
Product.showAllProducts();
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = +e.target.getAttribute("data-id");
    const Prods = JSON.parse(localStorage.getItem("products"));
    const newData = Prods.filter((el) => el.id != +id);
    localStorage.setItem("products", JSON.stringify(newData));
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.classList.contains("edit")) {
    const id = +e.target.getAttribute("data-id");
    console.log(id);
    const mainItem = JSON.parse(localStorage.getItem("products")).find(
      (item) => item.id == id
    );
    console.log(id);
      contIdEdit.value = id;
      nom.value = mainItem.nom;
      prix.value = mainItem.prix;
      marque.value = mainItem.marque;
      date.value = mainItem.date;
      type.value = mainItem.type;

      if (mainItem.promo === "Oui") {
        document.getElementById("Oui").checked = true;
      } else {
        document.getElementById("Non").checked = true;
      }

      ajt.value = "Modifier"; 
  }
});
// modal1
var modal1 = document.getElementById("modal1");
window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
};

// modal1
var modal = document.getElementById("id01");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
function modaladd() {
  modal1.style.display = "block";
  
 document.getElementById("details").innerHTML=inputvalue().getproduct();

}

class product{
  constructor(nom,marque,prix,date,type,promo)
  {
    this.nom=nom;
    this.marque=marque;
    this.prix=prix;
    this.date=date;
    this.type=type;
    this.promo=promo;
  }
}
