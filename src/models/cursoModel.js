const mongoose = require('mongoose')

const cursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: false
    },
    conteudo: {
        type: String,
        required: false
    },
    nameUrl: {
        type: String,
        required: false
    },
})

const cursoModel = mongoose.model('cursomodel', cursoSchema)
module.exports = cursoModel, cursoSchema