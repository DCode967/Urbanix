const mongoose = require("mongoose");

async function conectDB(){

    const URI = process.env.MONGODB_URI;

    if (!URI) {
        throw new Error("Falta MONGODB_URI en el archivo .env");
    }

    await mongoose.connect(URI);

    console.log("Conexión a la base de datos establecida");

    
}

module.exports = conectDB;