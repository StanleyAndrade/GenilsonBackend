//importing mongoose
const mongoose = require('mongoose')

//Defining Model
const pedidoSchema = new mongoose.Schema({
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
    observacao: {
        type: String,
        required: false
    },
    userid: {
        type: String,
        required: false
    },
    //
})

// Exporting Model
const pedidoModel = mongoose.model('pedidoModel', pedidoSchema)
module.exports = pedidoModel, pedidoSchema