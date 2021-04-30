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


const displayProduct = (data) => {

    document.querySelector('.card-title').textContent = data.name;
    document.querySelector('.card-text').textContent = data.description;
    document.querySelector('.prix').textContent = "Prix : " + data.price + " €";

    for(len of data.lenses){
        let newOption = document.createElement('option')
        newOption.textContent = len
        document.querySelector('.form-select').appendChild(newOption)
    }
    
    document.querySelector('.card-img-top').setAttribute("src", `${data.imageUrl}`);
}



const stockerProduit = (data) => {
    let btnProduct = document.querySelector('.btn');
    let inputSelect = document.querySelector('.form-select');
    let productOption = data.lenses[0]
    
    inputSelect.addEventListener('change', event => {
      productOption = event.target.value;
    })

    btnProduct.addEventListener('click', () => {
        
        let produitStock = {
            id: productId,
            option: productOption
        }
        
        console.log(productId)
        if (localStorage.getItem('products') == null){

            let productAll = [];
            productAll.push(produitStock);
            localStorage.setItem('products', JSON.stringify(productAll));
        } 
        else {
            let tabProduct = JSON.parse(localStorage.getItem('products'));
            tabProduct.push(produitStock);
            localStorage.setItem('products', JSON.stringify(tabProduct));
        }
    })

}

