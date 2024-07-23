const mongoose = require('mongoose')

const urlcursoSchema = new mongoose.Schema({
    urlcurso: {
        type: String,
        required: false
    },
})

const urlcursoModel = mongoose.model('urlcursomodel', urlcursoSchema)
module.exports = urlcursoModel, urlcursoSchema