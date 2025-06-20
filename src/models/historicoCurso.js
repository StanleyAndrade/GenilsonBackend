const mongoose = require('mongoose');

const historicoCursoSchema = new mongoose.Schema({
    tituloCurso: { type: String, required: false},
    name: {type: String, required: false},
    email: {type: String, required: false},
    whatsapp: {type: String, required: false},
    cpf: {type: String, required: false},
}, {timestamps: true});

const historicoCursoModel = mongoose.model('historicocursos', historicoCursoSchema);
module.exports = historicoCursoModel; 