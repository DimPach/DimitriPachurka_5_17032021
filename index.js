fetch('http://localhost:3000/api/cameras')
    .then(response => {
        return response.json()
        
    })
    .then(datas => {
        for(data of datas){
            console.log(datas)
            displayApp(data)
        }
    })
    .catch(err => {
        console.log(err);
    })

    const displayApp = (data) => {
        const temp = document.querySelector('#templateApp')
        const clone = document.importNode(templateApp.content, true)

        clone.querySelector('.card-title').textContent = data.name
        clone.querySelector('.card-text').textContent = data.description
        clone.querySelector('.prix').textContent = "Prix : " + data.price + " €"

        for(len of data.lenses){
            let newOption = document.createElement('option')
            newOption.textContent = len
            clone.querySelector('.form-select').appendChild(newOption)
        }
        
        clone.querySelector('img').setAttribute("src", `${data.imageUrl}`)

        document.querySelector('.row').appendChild(clone)
    }