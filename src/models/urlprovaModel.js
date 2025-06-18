const mongoose = require('mongoose')

const urlprovaSchema = new mongoose.Schema({
    urlprova: {
        type: String,
        required: false
    },
}, {timestamps: true})

const urlprovaModel = mongoose.model('urlprovamodel', urlprovaSchema)
module.exports = urlprovaModel, urlprovaSchema