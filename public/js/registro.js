const formularioRegistro = document.getElementById("form-register");
const estadoRegistro = document.getElementById("estado-registro");

formularioRegistro.addEventListener("submit", async evento => {
    evento.preventDefault();

    const datosRegistro = {
        nombre: document.getElementById("nombre").value.trim(),
        correo: document.getElementById("correo").value.trim().toLowerCase(),
        password: document.getElementById("password").value
    };

    estadoRegistro.textContent = "Creando cuenta...";

    try {
        const respuesta = await fetch("/api/auth/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosRegistro)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            estadoRegistro.textContent = resultado.message;
            return;
        }

        estadoRegistro.textContent = resultado.message;
        formularioRegistro.reset();
    } catch (error) {
        estadoRegistro.textContent =
            "No se pudo conectar con el servidor. Inténtalo de nuevo.";
    }
});
