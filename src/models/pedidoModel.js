//importing mongoose
const mongoose = require('mongoose')

//importing other model
const {productSchema} = require("./productModel")

//Defining Model
const pedidoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    producto: {
        type: [productSchema]
    }   
}, {timestamps: true})

//Exporting Model
const pedidoModel = mongoose.model('pedidoModel', pedidoSchema)
module.exports = pedidoModel