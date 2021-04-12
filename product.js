const getID = () => {
    return new URL(window.location.href).searchParams.get('id');
}

const Id = getID();
console.log(Id);


fetch(`http://localhost:3000/api/cameras/${Id}`)
.then(response => {
    return response.json();
})
.then(datas => {
    console.log(datas)
    displayProduct(datas);
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