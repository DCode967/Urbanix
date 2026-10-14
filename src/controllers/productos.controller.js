const producto = require("../models/productos");

async function listarProductos(req, res) {
    try {
        const productos = await producto.find({activo: true})
        .sort({createdAt: -1});

        return res.json(productos);
    } catch (error) {
        console.error("Error al consultar productos:", error.message);
        return res.status(500).json({error: "Error al consultar productos"});
    }
}

module.exports = {listarProductos}; 
