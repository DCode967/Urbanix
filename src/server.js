require("dotenv").config();

const conectarDB = require("./config/db")();

const express = require("express");

const path = require("node:path");

const productosRoutes = require("./routes/productos.rutas");

const app = express();

app.use(express.json());
app.use("/api/productos", productosRoutes);


const publicDirectory = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectory));

app.get("/", (_request, response) => {
    response.sendFile(path.join(publicDirectory, "index.html"));
});

app.get("/login", (_request, response) => {
    response.sendFile(path.join(publicDirectory, "login.html"));
});

async function startServer() {
    try {
        await conectarDB;

        app.listen(port, () => {
            console.log('Urbanix disponible en el puerto', + port);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exit(1); // Salir del proceso con un código de error
    }
}

startServer();