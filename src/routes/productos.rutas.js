const express = require("express");

const { listarProductos } = require("../controllers/productos.controller");
const {crearProducto} = require('../controllers/productos.controller');
const {requireAuth} = require('../middleware/auth.middleware');
const {requireAdmin} = require('../middleware/auth.middleware');
const {actualizarProducto} = require('../controllers/productos.controller');
const {eliminarProducto} = require('../controllers/productos.controller');

const router = express.Router();

router.get("/", listarProductos);
router.post("/", requireAuth, requireAdmin, crearProducto);
router.put("/:id", requireAuth, requireAdmin, actualizarProducto);
router.delete("/:id", requireAuth, requireAdmin, eliminarProducto);


module.exports = router;
