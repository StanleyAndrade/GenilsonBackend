//importing mongoose
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

//Defining Model
const userStoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    endereco: {
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
    horarioDeFuncionamento: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    payment: {
        type: Array,
        required: false
    },
    nameperson: {
        type: String,
        require: false
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    imageKey: {
        type: String,
        required: false
    }, 
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    }
                                                                                                                                                                              
}, {timestamps: true})

// Middleware de hashing de senha antes de salvar
userStoreSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Exporting Model
const userStoreModel = mongoose.model('userStoreModel', userStoreSchema)
module.exports = userStoreModel