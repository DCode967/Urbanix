const User = require("../models/users");
const { createHash } = require("../utils/password");

async function userRegister(req, res) {
    const { nombre, correo, password } = req.body || {};

    if (
        typeof nombre !== "string" ||
        typeof correo !== "string" ||
        typeof password !== "string"
    ) {
        return res.status(400).json({ message: "Faltan datos válidos." });
    }

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim().toLowerCase();

    if (!nombreLimpio || nombreLimpio.length > 60) {
        return res.status(400).json({ message: "Revisa el nombre." });
    }

    if (
        correoLimpio.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)
    ) {
        return res.status(400).json({ message: "Escribe un correo válido." });
    }

    if (password.length < 8 || password.length > 128) {
        return res.status(400).json({
            message: "La contraseña debe tener entre 8 y 128 caracteres."
        });
    }

    try {
        const passwordHash = await createHash(password);

        await User.create({
            nombre: nombreLimpio,
            correo: correoLimpio,
            passwordHash,
            rol: "usuario"
        });

        return res.status(201).json({
            message: "Cuenta creada correctamente."
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Ese correo ya está registrado."
            });
        }

        console.error("Error al registrar el usuario:", error.message);
        return res.status(500).json({
            message: "No se pudo crear la cuenta."
        });
    }
}

module.exports = { userRegister };
