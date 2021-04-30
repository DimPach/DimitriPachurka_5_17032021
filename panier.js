//logique panier localstorage

let produitsPanier = JSON.parse(localStorage.getItem('products'));


 for (let i = 0 ; i < produitsPanier.length ; i++) {
    fetch(`http://localhost:3000/api/cameras/${produitsPanier[i].id}`)
    .then(response => {
        return response.json();
    })
    .then(datas => {
        let name = datas.name
        let prix = datas.price
        console.log(prix)
        let total = datas.price
        let option = produitsPanier[i].option
        displayProduitPanier(name, prix, option);
        
        const inputChange = document.querySelectorAll('.form-select')[i];
        console.log(i)
        const newPrice = document.querySelector('.totalPrice');
        let valeurQty = 1;
        inputChange.addEventListener('change', event => {
            valeurQty = event.target.value;
            total = valeurQty * prix;
            newPrice.textContent = total;
            console.log("test")
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




