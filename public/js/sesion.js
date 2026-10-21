const inicioSesion = document.querySelector('#enlace-login');
const mostrarCarrito = document.querySelector('#abrir-carrito');

async function verificarSesion() {

    try {
        const respuesta = await fetch ('/api/auth/me', {

            method: "GET",

        });

        if (respuesta.ok) {
            mostrarCarrito.hidden = false
        }

    } catch (error) {
        console.error("No se pudo comprobar la sesión.", error);
        
    }
}

verificarSesion();