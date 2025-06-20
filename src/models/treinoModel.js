const mongoose = require('mongoose')

const treinoSchema = new mongoose.Schema({
    treino1: {
        type: Array,
        required: false
    },
    treino2: {
        type: Array,
        required: false
    },
    treino3: {
        type: Array,
        required: false
    },
    treino4: {
        type: Array,
        required: false
    },
    treino5: {
        type: Array,
        required: false
    },
    userid: {
        type: String,
        required: false
    }, 
    storeid: {
        type: String,
        required: false
    },
    nameUrl: {
        type: String,
        required: false
    },
    nameProva: {
        type: String,
        required: false
    }, 
    linkUrl: {
        type: String,
        required: false
    }
}, {timestamps: true})

const treinoModel = mongoose.model('provamodel', treinoSchema)
module.exports = treinoModel, treinoSchema