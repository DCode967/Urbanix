require("dotenv").config();

const conectarDB = require("./config/db")();

const express = require("express");

const authRoutes = require('./routes/auth.routes');

const productosRoutes = require("./routes/productos.rutas");

const session = require("express-session");

const MongoStore = require("connect-mongo").default;

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

if (!process.env.SESSION_SECRET) {
    throw new Error("Falta SESSION_SECRET en el archivo .env");
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions"
    }),
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use("/api/productos", productosRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;

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