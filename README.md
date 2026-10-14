# Urbanix

Tienda en línea básica con HTML, CSS, JavaScript, Node.js y Express.

## Estructura

- `public/`: archivos estáticos servidos por Express (HTML, CSS, JavaScript e imágenes).
- `src/server.js`: servidor Express y rutas de entrada a las páginas.
- `src/config/`: configuración e integración futura de servicios, como MongoDB.
- `src/routes/`: rutas futuras de la API, incluida autenticación.
- `src/controllers/`: lógica de las rutas.
- `src/middleware/`: middleware para proteger rutas.
- `src/models/`: modelos de datos.
- `.env.example`: ejemplo de variables de entorno. Copiar como `.env` y completar valores locales cuando se integre MongoDB.

Las carpetas de autenticación y MongoDB están preparadas como estructura; todavía no hay conexión ni autenticación implementadas. El formulario de login sigue siendo una maqueta.

## Ejecutar

Instala dependencias con `npm install` y ejecuta `npm start`. Abre `http://localhost:3000`.
