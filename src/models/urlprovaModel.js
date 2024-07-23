const mongoose = require('mongoose')

const urlprovaSchema = new mongoose.Schema({
    urlprova: {
        type: String,
        required: false
    },
})

const urlprovaModel = mongoose.model('urlprovamodel', urlprovaSchema)
module.exports = urlprovaModel, urlprovaSchema