//importing mongoose
const mongoose = require('mongoose')

// Defining Model
const perimetriaSchema = new mongoose.Schema ({
    bracoRelaxadoEsquerdo: {
        type: String,
        required: false
    },
    bracoRelaxadoDireito: {
        type: String,
        required: false
    },
    bracoContraidoEsquerdo: {
        type: String,
        required: false
    },
    bracoContraidoDireito: {
        type: String,
        required: false
    }, 
    antebracoDireito: {
        type: String,
        required: false
    },
    antebracoEsquerdo: {
        type: String,
        required: false
    },
    pernaDireito: {
        type: String,
        required: false
    },
    pernaEsquerdo: {
        type: String,
        required: false
    },
    torax:{
        type: String,
        required: false
    },
    abdomen:{
        type: String,
        required: false
    },
    quadril:{
        type: String,
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
}, {timestamps: true})

//Put calcSchema inside CalcModel
const PerimetriaModel = mongoose.model('perimetrias', perimetriaSchema)

//exporting
module.exports = PerimetriaModel