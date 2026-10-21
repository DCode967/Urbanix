const User = require("../models/users");
const { createHash, verifyPassword } = require("../utils/password");

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

async function userLogin(req, res) {
    const { correo, password } = req.body || {};

    if (
        typeof correo !== "string" ||
        typeof password !== "string" ||
        !correo.trim() ||
        !password ||
        password.length > 128
    ) {
        return res.status(400).json({message: "Datos de acceso inválidos."})
    }

    const correoLimpio = correo.trim().toLowerCase();

    try  {
        const user = await User.findOne({
            correo: correoLimpio,
            activo: true
        });

        if (!user || !(await verifyPassword(password, user.passwordHash))) {
            return res.status(401).json({
                message: "Correo o contraseña incorrectos."
            });
        }

        

        await new Promise((resolve, reject) => {
            req.session.regenerate(error => {
                if (error) reject(error);
                else resolve();
            });
        });

        req.session.userId = user._id.toString();

        await new Promise((resolve, reject)  => {
            req.session.save(error => {
                if (error) reject(error);
                else resolve();
            });
        });

        return res.status(200).json({
            message: "Inicio de sesión correctos",

            user: {
            nombre: user.nombre,
            correo: user.correo,
            rol: user.rol
            }
            
        });
    } catch (error) {
        console.error("Error al iniciar sesión: ", error.message);
        return res.status(500).json({
            message: "No se pudo iniciar sesión."
        });
    }

}


async function userMe(req, res) {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "No hay una sesion activa"
        });
    }

    const userId = req.session.userId

    try { 
        
        const buscadorUsuario = await User.findById(userId)
        .select("nombre correo rol activo")
        .exec();

        if (buscadorUsuario === null || !buscadorUsuario.activo) {
            return res.status(401).json({message: "El usuario no esta activo"})
           
        } else {
            return res.status(200).json({
                message: "Usuario encontrado",

                user:{
                nombre: buscadorUsuario.nombre,
                correo: buscadorUsuario.correo,
                rol: buscadorUsuario.rol
                }
                
            });
        }

    } catch (error) {
        console.error("Error al consultar la sesión del usuario", error.message);
        return res.status(500).json({
            message: "No se pudo consultar sesión"
        });
    }
}

function userLogout(req, res) {
    req.session.destroy(error => {
        if (error) {
            console.error("Error al cerrar la sesión:", error.message);
            return res.status(500).json({
                message: "No se pudo cerrar la sesión."
            });
        }

        res.clearCookie("connect.sid", {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json({
            message: "Sesión cerrada correctamente."
        });
    });
}

module.exports = { userRegister, userLogin, userMe, userLogout };
