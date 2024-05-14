//importing mongoose
const mongoose = require('mongoose')

// Defining Model
const dobrasCutaneasSchema = new mongoose.Schema ({
    peitoral:{
        type: String,
        required: true
    },
    axilarmedia:{
        type: String,
        required: true
    },
    triciptal: {
        type: String,
        required: true
    },
    subescapular:{
        type: String,
        required: true
    },
    abdominal:{
        type: String,
        required: true
    },
    suprailiaca:{
        type: String,
        required: true
    },
    coxa:{
        type: String,
        required: true
    },
    biciptal: {
        type: String,
        required: false
    },
    panturrilhaMedia:{
        type: String,
        required: false
    },
    somatoriodasdobras:{
        type: String,
        required: true
    },
    resultadopercentualdegordura:{
        type: String,
        required: true
    },
    pesoatual:{
        type: String,
        required: true
    },
    pesogordo:{
        type: String,
        required: false
    },
    pesomagro:{
        type: String,
        required: false
    },
    pesoideal:{
        type: String,
        required: false
    },
    idade: {
        type: String,
        required: true
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
const DobrasCutaneasModel = mongoose.model('dobrascutaneas', dobrasCutaneasSchema)

//exporting
module.exports = DobrasCutaneasModel