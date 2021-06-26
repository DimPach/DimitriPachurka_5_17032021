const getID = () => {
    return new URL(window.location.href).searchParams.get('id');
}

const productId = getID();


fetch(`http://localhost:3000/api/cameras/${productId}`)
.then(response => {
    return response.json();
})
.then(datas => {
    displayProduct(datas);
    stockerProduit(datas);
})
.catch(err => {
    console.log(err);
})

// Display avec template du produit choisis par le client // 

const displayProduct = (data) => {

    document.querySelector('.card-title').textContent = data.name;
    document.querySelector('.card-text').textContent = data.description;
    document.querySelector('.prix').textContent = "Prix : " + data.price/100 + ".00" + " €";

    for(len of data.lenses){
        let newOption = document.createElement('option')
        newOption.textContent = len
        document.querySelector('.form-select').appendChild(newOption)
    }
    
    document.querySelector('.card-img-top').setAttribute("src", `${data.imageUrl}`);
}


// Fonction pour stocker les produits dans le localStorage // 

const stockerProduit = (data) => {
    let btnProduct = document.querySelector('.btn');
    let inputSelect = document.querySelector('.form-select');
    let productOption = data.lenses[0]
    
    inputSelect.addEventListener('change', event => {
      productOption = event.target.value;
    })

    btnProduct.addEventListener('click', () => {
        let idUnique = productId + productOption;
        let produitStock = {
            id: productId,
            nom: data.name,
            option: productOption,
            prix: data.price, 
            quantity: 1,
        }
        
        if (localStorage.getItem(idUnique) == null){
            localStorage.setItem(idUnique, JSON.stringify(produitStock));
        } 
        else {
            let tabProduct = JSON.parse(localStorage.getItem(idUnique));
            tabProduct.quantity = tabProduct.quantity + 1
            localStorage.setItem(idUnique, JSON.stringify(tabProduct));
        }
    })

}