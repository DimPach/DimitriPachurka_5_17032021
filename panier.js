//logique panier localstorage

let produitsPanier = JSON.parse(localStorage.getItem('products'));
let totalPrice = 0;
let envoieProduit = [];
let prenomInput = document.querySelector('#inputPrenom').value;
let nomInput = document.querySelector('#inputNom').value;
let adressInput = document.querySelector('#inputAddress').value;
let mailInput = document.querySelector('#inputMail').value;


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
        newPrice.textContent = totalPrice + ' €';

        inputChange.addEventListener('change', event => {
          
          totalPrice = totalPrice - (valeurQty * prix);
          
          valeurQty = event.target.value;
          
          totalPrice = totalPrice + (valeurQty * prix);
          
          newPrice.textContent = totalPrice + ' €';
        })

        let contact = {
            
                prenom: "Dimitri",
                nom: "Pachurka",
                adresseMail: "mrdimpac@hotmail.fr",
        }

        let params = {
            'contact': contact,
            'products': envoieProduit,
        }
        
        const options = {
            method: "POST",
            /*headers: {
                "Content-Type": "application/json"
            },*/
            body: JSON.stringify(params)
        }
        console.log(options.body)
        
        fetch('http://localhost:3000/api/cameras/order', options)
        .then(response => {
            return response.json();
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
    clone.querySelector('.productPrice').textContent = prix + ' €';
    clone.querySelector('.productOption').textContent = option;
    
    document.querySelector('.newRow').appendChild(clone);
    
}


const confirmation = document.querySelector('.btn-primary');
confirmation.addEventListener('click', (e) => {
    
})




