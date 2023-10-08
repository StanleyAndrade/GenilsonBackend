//importing mongoose
const mongoose = require('mongoose')

//Defining Model
const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
})

//Exporting Model
const productModel = mongoose.model('produtoModel', produtoSchema)
module.exports = productModel, produtoSchema