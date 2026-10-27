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

//CREAR UN PRODUCTO

async function crearProducto(req, res) {
    const {
        nombre,
        descripcion,
        precio,
        imagen,
        categoria,
        stock
    } = req.body || {};


    if (typeof nombre !== "string" ||
        typeof descripcion !== "string" ||
        typeof imagen !== "string" ||
        typeof categoria !== "string" ||
        !nombre.trim()||
        !descripcion.trim()||
        !imagen.trim()||
        !categoria.trim()
    ) {
        return res.status(400).json({
            message: "Completa correctamente los campos de texto."
        });
    }

    if (!Number.isFinite(precio) ||
        precio < 0 ||
        !Number.isInteger(stock) || 
        stock < 0) 
        {
       
            return res.status(400).json({
            message: "Precio y Stock tienen un valor inválido."
        });
    }

    const categorias = ["Ropa", "Calzado", "Accesorios"];

    if (!categorias.includes(categoria.trim())) {
        return res.status(400).json({
            message: "La categoría no es válida."
        });
    }

    try {
       const nuevoProducto = await producto.create({
        nombre: nombre.trim(),
    descripcion: descripcion.trim(),
    precio,
    imagen: imagen.trim(),
    categoria: categoria.trim(),
    stock
       });

       return res.status(201).json({ message: "Producto creado exitosamente.", nuevoProducto});

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Los datos del producto no son válidos."})
        } else {
             console.error("Error al crear el producto: ", error.message);

            return res.status(500).json({
            message: "No se pudo guardar el producto."
        });
        }   

       
    }
}

//ATUALIZAR LOS PRODUCTOS POR SU ID

async function actualizarProducto(req, res) {
    const id = req.params.id;
    const {nombre, descripcion, precio, imagen, categoria, stock} = req.body || {};

    if (
        typeof nombre !== "string" ||
        typeof descripcion !== "string" ||
        typeof imagen !== "string" ||
        typeof categoria !== "string" ||
        !nombre.trim()||
        !descripcion.trim()||
        !imagen.trim()||
        !categoria.trim()
    ) {
        return res.status(400).json({
            message: "Complete los campos correctamente."
        });
    }

    if (!Number.isFinite(precio) ||
        precio < 0 ||
        !Number.isInteger(stock) || 
        stock < 0) 
        {
       
            return res.status(400).json({
            message: "Precio y Stock tienen un valor inválido."
        });
    }

    const categorias = ["Ropa", "Calzado", "Accesorios"];

    if (!categorias.includes(categoria.trim())) {
        return res.status(400).json({
            message: "La categoría no es válida."
        });
    }


    try {
        const buscarProducto = await producto.findById(id).exec();

        if (buscarProducto === null) {
            return res.status(404).json({
                message: "Este producto no existe."
            });
        }

        buscarProducto.nombre = nombre.trim();
        buscarProducto.descripcion = descripcion.trim();
        buscarProducto.precio = precio;
        buscarProducto.imagen = imagen.trim();
        buscarProducto.categoria = categoria.trim();
        buscarProducto.stock = stock;

        const productoActualizado = await buscarProducto.save();

        return res.status(200).json({
            message: "Producto actualizado exitosamente.", productoActualizado
        });

    } catch (error) {
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                message: "Datos del producto o ID inválidos."
            });
        }

        console.error("La busqueda salió mal: ", error.message);

        return res.status(500).json({
            message: "Error al intentar actualizar el producto."
        });

    }

}

//ELIMINAR PRODUCTOS POR SU ID
async function eliminarProducto(req, res) {
    const id = req.params.id;

    try {
        const buscarProducto = await producto.findById(id).exec();

        if (buscarProducto === null) {
            return res.status(404).json({
                message: "El producto no existe."
            });
        }

        buscarProducto.activo = false;

        const productoEliminado = await buscarProducto.save();
        return res.status(200).json({
            message: "Producto eliminado exitosamente.", productoEliminado
        });

    } catch (error) {
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                message: "Datos del producto o ID inválidos."
            });
        }


        console.error("Error al eliminar el producto", error.message);


        return res.status(500).json({
            message: "Error al eliminar el producto."
        });
    }


}

module.exports = {  listarProductos, crearProducto, actualizarProducto, eliminarProducto  }; 
