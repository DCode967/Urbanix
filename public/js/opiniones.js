document.getElementById("form-opinion").addEventListener("submit", evento => {
    evento.preventDefault();
    document.getElementById("estado-opinion").textContent = "Gracias por tu opinión. Este formulario aún no está conectado a un servidor.";
    evento.currentTarget.reset();
});
