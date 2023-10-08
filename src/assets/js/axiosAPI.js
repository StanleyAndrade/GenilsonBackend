//const axios = require('axios')

// * ====== GET - All collections ====== *
function get(){
    axios.get("http://localhost:8080/alldata").then((response) => {
    console.log(response.data)
    const dataString = JSON.stringify(response.data)
    document.getElementById('dados'). innerHTML = dataString
    }).catch((error) => {
    console.log('Erro ao fazer o GET ' + error)
})
}

// * ====== GET - ID ====== *
function getId(){
    axios.get("http://localhost:8080/alldata/:id").then((response) => {
    console.log(response.data)
    }).catch((error) => {
    console.log('Erro ao fazer o GET ID' + error)
})
}

// * ====== POST ====== *      
async function post(){
    try {
        const data = { 
            name: 'Stanley',
            description: 'Fofo',
            price: '6',
            image: 'Foto do Google'
        }
        const response = await axios.post('http://localhost:8080/api/produtos', data)
        console.log('Sucesso ' + response)
    } catch (error) {
        console.log('Erro ao criar o POST ' + error)
    }
}
