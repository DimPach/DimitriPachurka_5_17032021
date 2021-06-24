// Récupération des informations des produits dans le panier // 
let totalPrice = 0;
let envoieProduit = [];

for (var i in localStorage) {
  try {
    let produitsPanier = JSON.parse(localStorage.getItem(i));
        let name = null;
        let prix = null;
        let option = null;
        let ids = null;
        let quantity = null;

        for (let i = 0 ; i < produitsPanier.length ; i++) {
            name = produitsPanier[i].nom;
            prix = produitsPanier[i].prix;
            option = produitsPanier[i].option;
            ids = produitsPanier[i].id;
            quantity += produitsPanier[i].Quantity;
            envoieProduit.push(ids)
        }

        if (quantity != null) {
            displayProduitPanier(name, prix, option, quantity);

// Logique select de la quantité + mise à jour dynamique du prix total //
            const newPrice = document.querySelector('.totalPrice');
            let valeurQty = 1;  

            // Prix total de la commande //
            totalPrice = totalPrice + (prix * quantity);
            newPrice.textContent = totalPrice/100 + ".00" + ' €';
            
            document.querySelectorAll('.productQuantity').forEach((listener, index) => 
              listener.addEventListener('change', (event) => {
                let actualQuantity = document.querySelectorAll('.productQuantity')[index].value
                document.querySelectorAll('.productPrice')[index].textContent = (prix * actualQuantity)/100 + ".00" + ' €';
                
                totalPrice = totalPrice - (valeurQty * prix);
                valeurQty = event.target.value;
                totalPrice = totalPrice + (valeurQty * prix);
                newPrice.textContent = totalPrice/100 + ".00" + ' €';
              })
            )
        }
  } catch (err) {
    
  }
}


// Fonction display des produits du panier avec template//

function displayProduitPanier (name, prix, option, quantity) {
    const temp = document.querySelector('#tempPanier');
    const clone = document.importNode(tempPanier.content, true);

    clone.querySelector('.productName').textContent = name;
    clone.querySelector('.productPrice').textContent = (prix * quantity)/100 + ".00" + ' €';
    clone.querySelector('.productOption').textContent = option;
    clone.querySelector('.productQuantity').value = quantity;
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