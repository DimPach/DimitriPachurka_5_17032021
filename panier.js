//logique panier localstorage

let produitsPanier = JSON.parse(localStorage.getItem('products'));


 for (produitPanier of produitsPanier) {
    displayProduitPanier(produitPanier);
}



function displayProduitPanier (data) {
    const temp = document.querySelector('#tempPanier');
    const clone = document.importNode(tempPanier.content, true);

    clone.querySelector('.productName').textContent = data.name;
    console.log(clone.querySelector('.productName'))
    clone.querySelector('.productPrice').textContent = data.price;
    console.log(clone)
    document.querySelector('.newRow').appendChild(clone);
    
}