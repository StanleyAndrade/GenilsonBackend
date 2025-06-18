const mongoose = require('mongoose')

const urlcursoSchema = new mongoose.Schema({
    urlcurso: {
        type: String,
        required: false
    },
}, {timestamps: true})

const urlcursoModel = mongoose.model('urlcursomodel', urlcursoSchema)
module.exports = urlcursoModel, urlcursoSchema