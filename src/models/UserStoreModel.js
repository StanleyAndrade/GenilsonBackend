//importing mongoose
const mongoose = require('mongoose')

//Defining Model
const userStoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        require: true
    }, 
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    horarioDeFuncionamento: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    payment: {
        type: Array,
        required: false
    },
    nameperson: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String,
        required: false
    },
    username: {
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
                                                                                                                                                                              
}, {timestamps: true})

//Exporting Model
const userStoreModel = mongoose.model('userStoreModel', userStoreSchema)
module.exports = userStoreModel