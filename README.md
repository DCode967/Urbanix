# Urbanix

Tienda en línea básica desarrollada con HTML, CSS, JavaScript, Node.js, Express y MongoDB.

## Estructura

- `public/`: páginas, estilos, scripts e imágenes servidos por Express.
- `public/registro.html`: formulario para crear una cuenta, con diseño adaptable a juego con el login.
- `public/js/registro.js`: envía el registro a la API con `fetch`.
- `public/login.html` y `public/js/login.js`: formulario, validaciones locales, envío del inicio de sesión a la API y enlace para crear una cuenta.
- `public/js/sesion.js`: consulta `GET /api/auth/me` al cargar la página de inicio y muestra el botón del carrito cuando hay una sesión activa.
- `public/index.html`: el botón «Mi cuenta» abre un panel con el nombre, correo y rol del usuario con sesión activa.
- `public/js/sesion.js`: permite cerrar sesión desde el panel «Mi cuenta» y vuelve a cargar la tienda como visitante.
- `src/server.js`: servidor Express, conexión a MongoDB, sesiones y montaje de rutas.
- `src/config/db.js`: conexión de Mongoose a MongoDB.
- `src/models/`: esquemas de productos y usuarios.
- `src/controllers/`: lógica de la API.
- `src/routes/`: rutas de productos y autenticación.
- `src/utils/password.js`: generación y verificación de hashes de contraseña con `scrypt`.
- `src/middleware/`: middleware para autenticar y proteger rutas; aún pendiente.

## Configuración local

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` como `.env`.
3. En `.env`, configura `MONGODB_URI` con la URI de tu base de datos local y `SESSION_SECRET` con un secreto aleatorio. No publiques ni compartas `.env`.
4. Inicia el servidor con `npm start` y abre `http://localhost:3000`.

MongoDB debe estar iniciado antes de arrancar el servidor.

## Registro de usuarios

El formulario de `public/registro.html` envía `nombre`, `correo` y `password` como JSON a `POST /api/auth/registro`.

El servidor valida esos campos, normaliza el correo, genera un hash de la contraseña y crea la cuenta con el rol `usuario`. El correo debe ser único. La contraseña original no se guarda.

## Sesiones y autenticación

`server.js` configura `express-session` y guarda las sesiones en MongoDB mediante `connect-mongo`. La cookie usa `HttpOnly` y `SameSite=Lax`; `Secure` se activa cuando `NODE_ENV` es `production`.

El inicio de sesión está conectado en `POST /api/auth/login` y espera `correo` y `password`. Comprueba la cuenta activa y la contraseña; si son correctas, crea una sesión en MongoDB y devuelve los datos públicos del usuario. El formulario de login muestra el resultado recibido del servidor.

`POST /api/auth/logout` destruye la sesión guardada y expira la cookie `connect.sid`. El botón «Cerrar sesión» del panel de cuenta llama a esta ruta y recarga la página cuando el cierre se completa.

`GET /api/auth/me` consulta el usuario asociado a la sesión actual y devuelve sus datos públicos. Sin una sesión válida o si la cuenta está inactiva, responde con `401`.

En `public/index.html`, el carrito, el acceso a «Mi cuenta» y el panel de perfil comienzan ocultos. `public/js/sesion.js` consulta `/api/auth/me`; si hay sesión, muestra el carrito y el acceso al panel, y rellena el perfil con nombre, correo y rol. La regla `[hidden]` de `public/css/style.css` evita que los estilos generales de los botones muestren controles ocultos. Esta comprobación solo controla lo que aparece en la interfaz; las operaciones protegidas también deberán validarse en el servidor.

Se comprobó localmente que el servidor arranca, que `/api/auth/me` devuelve `401` sin sesión, que un intento de inicio de sesión con credenciales inválidas devuelve `401`, que `/api/auth/logout` responde correctamente y expira la cookie, y que las páginas principales cargan. Falta comprobar un inicio de sesión válido y un registro real. Sigue pendiente el middleware de autenticación y autorización para proteger funciones de usuario y administrador.

## Ejecutar

```powershell
npm start
```
