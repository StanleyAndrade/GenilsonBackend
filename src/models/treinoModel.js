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
    treino6: {
        type: Array,
        required: false
    },
    treino7: {
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
    }
})

const treinoModel = mongoose.model('treinomodel', treinoSchema)
module.exports = treinoModel, treinoSchema