const contenedorProductos = document.getElementById('listar-productos');

async function datosUsuario () {
     try {
         const consultarDatos = await fetch ('/api/auth/me'); 

        if (!consultarDatos.ok) {
        window.location.assing("login.html");
        return;
    }

    const data = await consultarDatos.json(); 


    if (data.user.rol !== "admin") {
        window.location.assign("/");
        return;
    }

    } catch (error) {
        console.error("No se pudo comprobar la sesión:", error);
    }
}

datosUsuario(); 