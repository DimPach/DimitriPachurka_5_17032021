// Récupération des informations des produits dans le panier // 
let totalPrice = 0;
let envoieProduit = [];


for (let i = 0; i < localStorage.length; i++) {
  
  let produitsPanier = JSON.parse(localStorage[Object.keys(localStorage)[i]]);
  let name = produitsPanier.nom;
  let prix = produitsPanier.prix;
  let option = produitsPanier.option;
  let id = produitsPanier.id;
  let quantity = produitsPanier.quantity;
  
  // Envoi dans tableau pour page de confirmation
  envoieProduit.push(id)
  
  displayProduitPanier(name, prix, option, quantity);
  
  // Logique select de la quantité + mise à jour dynamique du prix total //
  const newPrice = document.querySelector('.totalPrice');
  
  // Prix total de la commande //
  totalPrice = totalPrice + (prix * quantity);
  newPrice.textContent = totalPrice/100 + ".00" + ' €';
  
  document.querySelectorAll('.productQuantity')[i].addEventListener('change', (event) => {
    let newQuantity = event.target.value
    
    // product price //
    document.querySelectorAll('.actualPrice')[i].textContent = (prix * newQuantity)/100;
    
    //total price //
    document.querySelectorAll('.actualPrice').forEach((price, index) => {
      let actualPrice = parseFloat(price.innerHTML)
      
      if(index === 0) {
        totalPrice = 0
      }
      
      totalPrice = totalPrice + actualPrice
      newPrice.textContent = totalPrice + ".00" + ' €';
    })
  })
}


// Fonction display des produits du panier avec template//

function displayProduitPanier (name, prix, option, quantity) {
    const temp = document.querySelector('#tempPanier');
    const clone = document.importNode(tempPanier.content, true);

    clone.querySelector('.productName').textContent = name;
    clone.querySelector('.actualPrice').textContent = (prix * quantity)/100
    clone.querySelector('.productOption').textContent = option;
    clone.querySelector('.productQuantity').value = quantity;
    clone.querySelector('input').setAttribute('price', prix);
    document.querySelector('.newRow').appendChild(clone); 
}
// Logique confirmation du formulaire de commande avec validation // 

const confirmation = document.querySelector('.needs-validation');
confirmation.addEventListener('submit', (e) => {
    event.preventDefault();
    let prenomInput = document.querySelector('#inputPrenom').value;
    let nomInput = document.querySelector('#inputNom').value;
    let adressInput = document.querySelector('#inputAddress').value;
    let mailInput = document.querySelector('#inputMail').value;
    let villeInput = document.querySelector('#inputVille').value;

    if (prenomInput.trim() != "" && nomInput.trim() != "" && adressInput.trim() != "" && mailInput.trim() != "" && villeInput.trim() != "") {

        let contact = {
            firstName: prenomInput,
            lastName: nomInput,
            address: adressInput,
            city: villeInput,
            email: mailInput,
        }   

        let params = {
            'contact': contact,
            'products': envoieProduit,
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }

        fetch('http://localhost:3000/api/cameras/order', options)
        .then(response => {
            return response.json();
        }) 
        .then(datas => {
            localStorage.clear()
            window.location.replace(`confirmation.html?order=${datas.orderId}&firstName=${datas.contact.firstName}`)
        })
        .catch(err => {
            console.log(err);
        })

    } else if(prenomInput.trim() == "") {
            alert("Veuillez indiquer votre prénom s'il vous plait.")
    }   
        if(nomInput.trim() == "") {
            alert("Veuillez indiquer votre nom s'il vous plait.")
    } 
        if(adressInput.trim() == "") {
            alert("Veuillez indiquer votre adresse s'il vous plait.")
    }
        if(villeInput.trim() == "") {
            alert("Veuillez indiquer votre ville s'il vous plait.")
    }
})