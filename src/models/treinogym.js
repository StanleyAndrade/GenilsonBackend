const mongoose = require('mongoose')

const treinoGymSchema = new mongoose.Schema({
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
    treino6: {
        type: Array,
        required: false
    },
    treino7: {
        type: Array,
        required: false
    },
}, {timestamps: true})

const treinoGymModel = mongoose.model('treinogymmodel', treinoGymSchema)
module.exports = treinoGymModel, treinoGymSchema