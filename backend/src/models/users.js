const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60
    },

    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        required: true,
        enum: ["admin", "usuario"],
        default: "usuario"
    },

    activo: {
        type: Boolean,
        default: true
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema, 'users');