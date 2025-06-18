const mongoose = require('mongoose')

const gabaritoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: false
    },
    conteudogabarito: {
        type: String,
        required: false
    },
}, {timestamps: true})

const gabaritoModel = mongoose.model('gabaritomodel', gabaritoSchema)
module.exports = gabaritoModel, gabaritoSchema