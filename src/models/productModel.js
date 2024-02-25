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
        required: false
    },
    preco: {
        type: String,
        required: true
    },
    tamanhos: {
        type: Array,
        require: false
    },
    sabores: {
        type: Array,
        require: false
    }, 
    userid: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    imageKey: {
        type: String,
        required: false
    }, 
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'}
})

//Exporting Model
const productModel = mongoose.model('produtoModel', produtoSchema)
module.exports = productModel, produtoSchema