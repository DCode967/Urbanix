const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {
    const campoCorreo = document.getElementById("email");
    const campoContrasena = document.getElementById("password");
    const estadoLogin = document.getElementById("estado-login");
    const longitudMinimaContrasena = 8;
    const longitudMaximaContrasena = 128;

    // La validación se muestra en la página, con mensajes propios y accesibles.
    formularioLogin.noValidate = true;

    function mostrarEstado(mensaje, tipo = "info") {
        estadoLogin.textContent = mensaje;
        estadoLogin.dataset.tipo = tipo;
    }

    function marcarCampo(campo, esValido) {
        campo.setAttribute("aria-invalid", String(!esValido));
    }

    function validarCorreo() {
        const correo = campoCorreo.value.trim();
        campoCorreo.value = correo;

        if (!correo) {
            marcarCampo(campoCorreo, false);
            return "Escribe tu correo electrónico.";
        }

        if (correo.length > 254 || campoCorreo.validity.typeMismatch) {
            marcarCampo(campoCorreo, false);
            return "Escribe un correo electrónico válido.";
        }

        marcarCampo(campoCorreo, true);
        return "";
    }

    function validarContrasena() {
        const contrasena = campoContrasena.value;

        if (!contrasena) {
            marcarCampo(campoContrasena, false);
            return "Escribe tu contraseña.";
        }

        if (contrasena.length < longitudMinimaContrasena) {
            marcarCampo(campoContrasena, false);
            return `La contraseña debe tener al menos ${longitudMinimaContrasena} caracteres.`;
        }

        if (contrasena.length > longitudMaximaContrasena) {
            marcarCampo(campoContrasena, false);
            return `La contraseña no puede superar ${longitudMaximaContrasena} caracteres.`;
        }

        marcarCampo(campoContrasena, true);
        return "";
    }

    function limpiarErrorAlEditar(campo) {
        campo.removeAttribute("aria-invalid");

        if (estadoLogin.dataset.tipo === "error") {
            mostrarEstado("");
        }
    } 

    campoCorreo.addEventListener("input", () => limpiarErrorAlEditar(campoCorreo));
    campoContrasena.addEventListener("input", () => limpiarErrorAlEditar(campoContrasena));

    formularioLogin.addEventListener("submit", async evento => {
        evento.preventDefault();
        mostrarEstado("");

        const errorCorreo = validarCorreo();
        const errorContrasena = validarContrasena();

        if (errorCorreo || errorContrasena) {
            mostrarEstado(errorCorreo || errorContrasena, "error");
            (errorCorreo ? campoCorreo : campoContrasena).focus();
            return;
        }

        // Se toman los datos solo en memoria. No se guardan ni se imprimen.
        const datosLogin = {
            correo: campoCorreo.value.toLowerCase(),
            password: campoContrasena.value
        };



        mostrarEstado("Iniciando sesión...", "info");

        try {
            
            const respuesta = await fetch ("/api/auth/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(datosLogin)
            });

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                mostrarEstado(resultado.message, "error");
                return;
            }

            mostrarEstado(`Bienvenido, ${resultado.user.nombre}.`, 'info');
        } catch (error) {

         mostrarEstado("No se pudo conectar con el servidor. Intentalo de nuevo.", "error");       

        }
    });
}
