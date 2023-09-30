//const axios = require('axios')

// * ====== GET - All collections ====== *
function get(){
    axios.get("http://localhost:8080/alldata").then((response) => {
    console.log(response.data)
    }).catch((error) => {
    console.log('Erro ao fazer o GET ' + error)
})
}


// * ====== POST ====== *      
async function post(){
    try {
        var nomeCategoria = 'Batata'
        var nomeProduto = 'Pizza de Calabreza'
        var descricao = 'Tomate, cebola, alface'
        var price = '50,00'
        var imagem = 'foto'

        const body = { 
            productScroll: {
                headerRestaurant: {},
                categorias: {
                    nomeCategoria: nomeCategoria,
                    productListCategoria: {
                        divEstilizando: {
                            ProductITem: {
                                info: {
                                    nomeProduto: nomeProduto,
                                    descricao: descricao,
                                    price: price,
                                },
                                imagem: imagem,
                            }
                        }
                    }
                }
                }
        }
        const response = await axios.post('http://localhost:8080/create', body)
        console.log('Sucesso ' + response)
    } catch (error) {
        console.log('Erro ao criar o POST ' + error)
    }
}

function newPost(){
    var nomeCategoria = 'Batata'
        var nomeProduto = 'Pizza de Calabreza'
        var descricao = 'Tomate, cebola, alface'
        var price = '50,00'
        var imagem = 'foto'

        const data = { 
            productScroll: {
                headerRestaurant: {},
                categorias: {
                    nomeCategoria: nomeCategoria,
                    productListCategoria: {
                        divEstilizando: {
                            ProductITem: {
                                info: {
                                    nomeProduto: nomeProduto,
                                    descricao: descricao,
                                    price: price,
                                },
                                imagem: imagem,
                            }
                        }
                    }
                }
                }
        }
axios.post("http://localhost:8080/create", data).then((response) => {
    console.log('Sucesso ' + response)
}).catch((error) => {
    console.log('Erro ao criar o POST ' + error)
})
}


function teste(){
        var nomeCategoria = 'Batata'
        var nomeProduto = 'Pizza de Calabreza'
        var descricao = 'Tomate, cebola, alface'
        var price = '50,00'
        var imagem = 'foto'

        const data = { 
            productScroll: {
                headerRestaurant: {},
                categorias: {
                    nomeCategoria: nomeCategoria,
                    productListCategoria: {
                        divEstilizando: {
                            ProductITem: {
                                info: {
                                    nomeProduto: nomeProduto,
                                    descricao: descricao,
                                    price: price,
                                },
                                imagem: imagem,
                            }
                        }
                    }
                }
                }
    }

    const novoData = JSON.stringify(data)
    axios.post('http://localhost:8080/create', novoData).then(response => {
        console.log('Sucesso ' + response.data)
    }).catch( error => {
        console.error('Erro ao enviar' + error)
    })
}


