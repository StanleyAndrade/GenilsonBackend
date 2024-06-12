// importing mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defining Model
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
        required: false,
        unique: true // Tornar o email único
    },
    password: {
        type: String,
        required: false
    },
    token: {
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
}, { timestamps: true });

// Middleware de hashing de senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Exporting Model
const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;
