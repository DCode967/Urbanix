const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    descripcion: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },

    precio: {
        type: Number,
        required: true,
        min: 0
    },  

    imagen: {
        type: String,
        required: true,
        trim: true
    },

    categoria: {
        type: String,
        required: true,
        trim: true,
        enum: ["Ropa", "Calzado", "Accesorios"]
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: "El stock debe ser un número entero válido"
        }
    },


    activo: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Producto", productoSchema, "productos");
