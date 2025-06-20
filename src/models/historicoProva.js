const mongoose = require('mongoose');

const historicoProvaSchema = new mongoose.Schema({
    tituloProva: { type: String, required: false},
    name: {type: String, required: false},
    email: {type: String, required: false},
    whatsapp: {type: String, required: false},
    cpf: {type: String, required: false},
}, {timestamps: true});

const historicoProvaModel = mongoose.model('historicoprovas', historicoProvaSchema);
module.exports = historicoProvaModel;