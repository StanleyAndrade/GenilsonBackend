//importing mongoose
const mongoose = require('mongoose')

//Defining Model
const produtcSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }   
}, {timestamps: true})

//Exporting Model
const productModel = mongoose.model('productModel', produtcSchema)
module.exports = productModel, produtcSchema