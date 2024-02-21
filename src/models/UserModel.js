//importing mongoose
const mongoose = require('mongoose')

//Defining Model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nascimento: {
        type: String,
        require: true
    }, 
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String,
        required: false
    }
   
}, {timestamps: true})

//Exporting Model
const userModel = mongoose.model('userModel', userSchema)
module.exports = userModel