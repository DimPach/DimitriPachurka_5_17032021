//logique panier localstorage

let produitsPanier = JSON.parse(localStorage.getItem('products'));
let totalPrice = 0

 for (let i = 0 ; i < produitsPanier.length ; i++) {
    fetch(`http://localhost:3000/api/cameras/${produitsPanier[i].id}`)
    .then(response => {
        return response.json();
    })
    .then(datas => {
        let name = datas.name
        let prix = datas.price
        let option = produitsPanier[i].option
        displayProduitPanier(name, prix, option);
        
        const inputChange = document.querySelectorAll('.form-select')[i];
       
        const newPrice = document.querySelector('.totalPrice');
        let valeurQty = 1;
        
        totalPrice = totalPrice + prix
        newPrice.textContent = totalPrice;

        inputChange.addEventListener('change', event => {
          
          totalPrice = totalPrice - (valeurQty * prix)
          
          valeurQty = event.target.value;
          
          totalPrice = totalPrice + (valeurQty * prix)
          
          newPrice.textContent = totalPrice;
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



function updateCartTotal() {
    
}




