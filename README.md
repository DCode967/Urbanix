# Urbanix

Urbanix es una tienda web en español creada como prototipo. El frontend usa React y Vite; la API usa Node.js y Express; los productos y las sesiones se guardan en MongoDB Atlas.

## Sitio publicado

- **Tienda:** <https://urbanix-yyv9.onrender.com>
- **API:** <https://urbanix-api.onrender.com>
- **Estado de la API:** <https://urbanix-api.onrender.com/health>
- **Catálogo de la API:** <https://urbanix-api.onrender.com/api/productos>
- **Rama desplegada:** `migracion-react`

El sitio es público y se puede abrir desde un navegador con conexión a internet. La API gratuita de Render puede tardar alrededor de un minuto en responder después de un periodo sin actividad.

## Funciones

- Catálogo de productos cargado desde MongoDB Atlas; búsqueda por nombre, descripción y categoría.
- Registro, inicio y cierre de sesión.
- El botón del carrito y su panel solo aparecen después de confirmar una sesión activa. Para agregar productos también se requiere iniciar sesión.
- El carrito se guarda localmente por cuenta y por navegador; las cantidades respetan el stock publicado.
- **Nix**, asistente para preguntas sobre el catálogo y los datos de envío. Consulta la API Responses de OpenAI desde el backend y usa los productos activos de la base. Si faltan datos o falla la IA, informa que no puede confirmarlos y ofrece una respuesta de respaldo.

## Límites del prototipo

- El botón de finalizar compra es informativo: todavía no se crean pedidos ni se reciben pagos.
- Nix necesita `OPENAI_API_KEY` en las variables de entorno del backend para responder con IA. Sin esa clave, usa el respaldo local.
- Para responder con datos precisos sobre envíos y derivar al soporte, hay que configurar `SHIPPING_POLICY` y `SUPPORT_CONTACT` en Render.
- El carrito se guarda en el navegador, no en MongoDB; no se sincroniza entre dispositivos.

## Tecnologías y estructura

- `frontend/`: React, Vite, componentes y estilos.
- `backend/`: API Express, autenticación por sesión, catálogo y asistente Nix.
- `backend/src/models/productos.js`: modelo que guarda productos en la colección `productos` (minúscula).
- Base de datos usada en Atlas: `Urbanix` (respetar mayúsculas y minúsculas).
- `render.yaml`: configuración Blueprint del servicio API en Render.

## Desarrollo local

Requisitos: Node.js 20.19+ o 22.12+ y acceso a MongoDB local o Atlas.

1. En la carpeta `backend`, instala dependencias: `npm install`.
2. Copia `backend/.env.example` como `backend/.env` y configura `MONGODB_URI`, `SESSION_SECRET` y `ALLOWED_ORIGINS`.
3. En la carpeta `frontend`, instala dependencias: `npm install`.
4. Copia `frontend/.env.example` como `frontend/.env`. Para desarrollo, `VITE_API_URL=http://localhost:3000`.
5. Abre dos terminales: en `backend`, ejecuta `npm run dev`; en `frontend`, ejecuta `npm run dev`.
6. Abre <http://localhost:5173>. La API local está en <http://localhost:3000>.

No subas archivos `.env`, contraseñas, URI de MongoDB ni claves de API al repositorio.

## Variables de entorno

Configurar en el servicio API de Render:

| Variable | Uso |
|---|---|
| `MONGODB_URI` | URI de Atlas con la base `Urbanix`. |
| `SESSION_SECRET` | Secreto privado para firmar sesiones; Render puede generarlo. |
| `ALLOWED_ORIGINS` | Dominio exacto del frontend: `https://urbanix-yyv9.onrender.com`. Para desarrollo, agrega `http://localhost:5173` separado por coma. |
| `NODE_ENV` | `production` en Render. |
| `PORT` | Render lo proporciona automáticamente. |
| `OPENAI_API_KEY` | Clave privada para habilitar las respuestas generativas de Nix. |
| `OPENAI_MODEL` | Modelo disponible en la cuenta de OpenAI; el valor predeterminado del proyecto es `gpt-6-astra`. |
| `SHIPPING_POLICY` | Información confirmada sobre cobertura, costos y tiempos de envío. |
| `SUPPORT_CONTACT` | Correo, teléfono u otro canal de soporte de la tienda. |

Configurar en el Static Site del frontend, antes de compilar:

| Variable | Valor |
|---|---|
| `VITE_API_URL` | `https://urbanix-api.onrender.com` |

Vite incluye `VITE_API_URL` en la compilación del sitio; después de cambiarla, vuelve a desplegar el frontend.

## Despliegue actual en Render

Los dos servicios deben usar la rama `migracion-react`:

1. **API (`urbanix-api`)**: servicio Web con directorio raíz `backend`, comando de compilación `npm ci` y comando de inicio `npm start`. La ruta de salud es `/health`.
2. **Frontend (`urbanix-yyv9`)**: Static Site con directorio raíz `frontend`, comando de compilación `npm ci && npm run build` y directorio publicado `dist`. Define `VITE_API_URL` con la URL de la API.
3. En el entorno de la API, define `ALLOWED_ORIGINS` con `https://urbanix-yyv9.onrender.com` exactamente. Si cambias el dominio del frontend, actualiza este valor y despliega de nuevo la API.
4. Comprueba `/health`, `/api/productos`, el inicio de sesión, el carrito y Nix desde el dominio de la tienda.

El servicio API del plan gratuito puede suspenderse cuando no recibe tráfico; el primer acceso posterior puede tardar. El frontend estático permanece publicado en la URL pública de Render.

## Verificaciones

- Frontend: desde `frontend`, ejecuta `npm run lint` y `npm run build`.
- Backend: desde `backend`, ejecuta `npm test`.
- API en producción: abre `/health` y `/api/productos` en las URL indicadas arriba.
- Flujo de compra del prototipo: prueba el catálogo sin iniciar sesión; verifica que no se vean el botón ni el panel del carrito. Inicia sesión y comprueba el carrito, Mi cuenta y el cierre de sesión.

La integración de texto utiliza la [API Responses de OpenAI](https://developers.openai.com/api/docs/guides/text).
