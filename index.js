fetch('http://localhost:3000/api/cameras')
    .then(response => {
        return response.json();
        
    })
    .then(datas => {
        for(data of datas){
            console.log(data);
            displayMain(data);
        }
    })
    .catch(err => {
        console.log(err);
    })

    const displayMain = (data) => {
        const temp = document.querySelector('#templateApp');
        const clone = document.importNode(templateApp.content, true);

        clone.querySelector('.card-title').textContent = data.name;
        clone.querySelector('.card-text').textContent = data.description;
        clone.querySelector('.prix').textContent = "Prix : " + data.price + " €";
        clone.querySelector('a').setAttribute('href', `/product.html?id=${data._id}`);
        clone.querySelector('img').setAttribute("src", `${data.imageUrl}`);

        document.querySelector('.row').appendChild(clone);
    }


    document.addEventListener('click', () => {})

    /*
    boutonAjoutPanier.addEventListener('click', () => {})
    boutonDeleteProduit.addEventListener('click', () => {})
    boutonPaiment.addEventListener('click', () => {})
    */
    