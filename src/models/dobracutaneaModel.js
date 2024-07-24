//importing mongoose
const mongoose = require('mongoose')

// Defining Model
const dobrasCutaneasSchema = new mongoose.Schema ({
    peitoral:{
        type: String,
        required: false
    },
    axilarmedia:{
        type: String,
        required: false
    },
    triciptal: {
        type: String,
        required: false
    },
    subescapular:{
        type: String,
        required: false
    },
    abdominal:{
        type: String,
        required: false
    },
    suprailiaca:{
        type: String,
        required: false
    },
    coxa:{
        type: String,
        required: false
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
        required: false
    },
    resultadopercentualdegordura:{
        type: String,
        required: false
    },
    pesoatual:{
        type: String,
        required: false
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
}, {timestamps: false})

//Put calcSchema inside CalcModel
const DobrasCutaneasModel = mongoose.model('histotico', dobrasCutaneasSchema)

//exporting
module.exports = DobrasCutaneasModel