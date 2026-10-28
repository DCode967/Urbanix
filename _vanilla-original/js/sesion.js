const inicioSesion = document.querySelector("#enlace-login");
const mostrarCarrito = document.querySelector("#abrir-carrito");
const abrirMiCuenta = document.querySelector("#abrir-mi-cuenta");
const panelMiCuenta = document.querySelector("#mi-cuenta");
const cerrarMiCuenta = document.querySelector("#cerrar-mi-cuenta");
const botonCerrarSesion = document.querySelector("#cerrar-sesion");
const estadoCuenta = document.querySelector("#estado-cuenta");

const cuentaNombre = document.querySelector("#cuenta-nombre");
const cuentaCorreo = document.querySelector("#cuenta-correo");
const cuentaRol = document.querySelector("#cuenta-rol");

async function verificarSesion() {
    try {
        const respuesta = await fetch("/api/auth/me");

        if (!respuesta.ok) return;

        const resultado = await respuesta.json();
        const usuario = resultado.user;

        if (!usuario) return;

        cuentaNombre.textContent = usuario.nombre;
        cuentaCorreo.textContent = usuario.correo;
        cuentaRol.textContent = usuario.rol === "admin" ? "Administrador" : "Usuario";

        inicioSesion.hidden = true;
        abrirMiCuenta.hidden = false;
        mostrarCarrito.hidden = false;
    } catch (error) {
        console.error("No se pudo comprobar la sesión.", error);
    }
}

abrirMiCuenta.addEventListener("click", () => {
    panelMiCuenta.hidden = false;
    abrirMiCuenta.setAttribute("aria-expanded", "true");
    panelMiCuenta.scrollIntoView({ behavior: "smooth", block: "center" });
});

cerrarMiCuenta.addEventListener("click", () => {
    panelMiCuenta.hidden = true;
    abrirMiCuenta.setAttribute("aria-expanded", "false");
    abrirMiCuenta.focus();
});

botonCerrarSesion.addEventListener("click", async () => {
    botonCerrarSesion.disabled = true;
    estadoCuenta.textContent = "Cerrando sesión...";

    try {
        const respuesta = await fetch("/api/auth/logout", {
            method: "POST"
        });
        const resultado = await respuesta.json().catch(() => ({}));

        if (!respuesta.ok) {
            estadoCuenta.textContent = resultado.message
                || `El servidor respondió con el código ${respuesta.status}.`;
            botonCerrarSesion.disabled = false;
            return;
        }

        window.location.replace("/");
    } catch (error) {
        console.error("No se pudo cerrar la sesión:", error);
        estadoCuenta.textContent = "No se pudo conectar con el servidor. Inténtalo de nuevo.";
        botonCerrarSesion.disabled = false;
    }
});

verificarSesion();
