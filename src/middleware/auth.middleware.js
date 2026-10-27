const User = require('../models/users');

//Verificar si hay inicion sesiada o si e usuario esta activo
async function requireAuth(req, res, next) {

    if (!req.session.userId) {
        return res.status(401).json({ message: "No has iniciado sesión, puedes hacerlo ya."});
    }

    try {
        
        const user = await User
        .findById(req.session.userId)
        .select("-passwordHash")
        .exec();

        if (!user || !user.activo) {
            return res.status(401).json({ message: "La sesión no es válida o está inactiva"});   

        }

        req.user = user; 
        next();

    } catch (error) {

        res.status(500).json({ message: "El servidor no responde"});
        
    }
    
}

//Comprobar el rol que tiene asignada la sesión 
function requireAdmin(req, res, next) {

    if (!req.user){
        return res.status(401).json({message: "Debes iniciar sesión."});
    }

    if (req.user.rol !== "admin") {
        return res.status(403).json({ message: "Esta sesion no tiene este rol asignado."});
    } 
    next();
}

module.exports = { requireAuth, requireAdmin }

