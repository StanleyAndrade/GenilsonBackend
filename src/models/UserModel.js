//importing mongoose
const mongoose = require('mongoose')

//Defining Model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        require: false
    },
    token: {
        type: String,
        required: false
    }   
}, {timestamps: true})

//Exporting Model
const userModel = mongoose.model('userModel', userSchema)
module.exports = userModel