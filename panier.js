//logique panier localstorage

let produitsPanier = JSON.parse(localStorage.getItem('products'));
let totalPrice = 0;
let envoieProduit = [];




 for (let i = 0 ; i < produitsPanier.length ; i++) {
    fetch(`http://localhost:3000/api/cameras/${produitsPanier[i].id}`)
    .then(response => {
        return response.json();
    })
    .then(datas => {
        let name = datas.name
        let prix = datas.price
        let option = produitsPanier[i].option;
        let ids = produitsPanier[i].id;
        envoieProduit.push(ids)
        console.log(envoieProduit)
        
        displayProduitPanier(name, prix, option);
        
        const inputChange = document.querySelectorAll('.form-select')[i];
       
        const newPrice = document.querySelector('.totalPrice');
        let valeurQty = 1;
        
        totalPrice = totalPrice + prix;
        newPrice.textContent = totalPrice/100 + ".00" + ' €';

        inputChange.addEventListener('change', event => {
          
          totalPrice = totalPrice - (valeurQty * prix);
          
          valeurQty = event.target.value;
          
          totalPrice = totalPrice + (valeurQty * prix);
          
          newPrice.textContent = totalPrice/100 + ".00" + ' €';
        })
    })
    .catch(err => {
        console.log(err);
    })
}



function displayProduitPanier (name, prix, option) {
    const temp = document.querySelector('#tempPanier');
    const clone = document.importNode(tempPanier.content, true);

    clone.querySelector('.productName').textContent = name;
    clone.querySelector('.productPrice').textContent = prix/100 + ".00" + ' €';
    clone.querySelector('.productOption').textContent = option;
    
    document.querySelector('.newRow').appendChild(clone);
    
}


const confirmation = document.querySelector('.needs-validation');
confirmation.addEventListener('submit', (e) => {
    event.preventDefault();
    let prenomInput = document.querySelector('#inputPrenom').value;
    let nomInput = document.querySelector('#inputNom').value;
    let adressInput = document.querySelector('#inputAddress').value;
    let mailInput = document.querySelector('#inputMail').value;
    let villeInput = document.querySelector('#inputVille').value;
    alert(villeInput)
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
        window.location.replace(`confirmation.html?order=${datas.orderId}&firstName=${datas.contact.firstName}`)
    })
    .catch(err => {
        console.log(err);
    })
})




