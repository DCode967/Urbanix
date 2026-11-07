# Urbanix

Tienda en línea en español. El frontend usa React y Vite; la API usa Node.js, Express y MongoDB. Incluye catálogo, filtros, carrito local y registro/inicio de sesión. El pago aún no está implementado.

## Requisitos

- Node.js 20.19+ o 22.12+ (Vite 8 requiere una de estas versiones).
- MongoDB local para desarrollo, o una URI de MongoDB Atlas.

## Desarrollo local

1. Instala dependencias en cada aplicación:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Copia `backend/.env.example` a `backend/.env` y configura `MONGODB_URI` y un `SESSION_SECRET aleatorio`.
3. Copia `frontend/.env.example` a `frontend/.env`. El valor de ejemplo apunta a `http://localhost:3000`.
4. En dos terminales, ejecuta `npm run dev` dentro de `backend` y `frontend`.
5. Abre <http://localhost:5173>. La API está en <http://localhost:3000>; su comprobación de salud es `/health`.

## Funciones disponibles y límites

- El catálogo y los detalles de productos se cargan desde MongoDB por la API.
- Buscar filtra nombre, descripción y categoría; los botones de categoría aplican un filtro.
- El carrito se guarda en el navegador. El botón de finalizar compra solo informa que el pago está pendiente; no procesa pedidos ni pagos.
- El asistente consulta el catálogo disponible. Es un asistente de respuestas guiadas, no un modelo generativo externo; no inventa políticas de envío, costos ni tiempos. El catálogo y las políticas de envío deben mantenerse completos y actualizados. Cuando falten datos, indica que el cliente debe confirmar con soporte.
- Antes de publicar, añade a la tienda un canal real de soporte y sus políticas de envío. No hay credenciales de pago ni pasarela integradas.

## Variables de entorno

Backend (`backend/.env`):

- `MONGODB_URI`: URI de conexión y base de datos MongoDB.
- `SESSION_SECRET`: secreto aleatorio y privado para las sesiones.
- `ALLOWED_ORIGINS`: orígenes web autorizados separados por coma; incluye `http://localhost:5173` en desarrollo y el dominio Vercel en producción.
- `PORT`: opcional; Render lo proporciona automáticamente.
- `NODE_ENV`: define `production` en despliegue.

Frontend (`frontend/.env`):

- `VITE_API_URL`: URL pública de la API. Debe establecerse antes de compilar; Vite incorpora este valor al frontend.

No subas archivos `.env` ni secretos al repositorio.

## Verificaciones

Desde `frontend`: `npm run lint` y `npm run build`. En `backend`, `npm test` no está implementado aún; el endpoint `/health` permite comprobar que la API arrancó. Los flujos autenticados y del catálogo requieren una base de datos configurada.

## Despliegue gratuito

La configuración está preparada para **Vercel Hobby** (frontend estático) y **Render Free** (API Express). Render puede suspender la instancia gratuita cuando no recibe tráfico, por lo que el primer acceso puede tardar. El repositorio debe estar conectado a ambos servicios:

1. En Render, crea un Blueprint desde la raíz del repositorio usando `render.yaml`. Configura `MONGODB_URI` con una base MongoDB Atlas y `ALLOWED_ORIGINS` con `http://localhost:5173` y el dominio final de Vercel, separados por coma. Render genera `SESSION_SECRET`.
2. En Vercel, importa el mismo repositorio y define `frontend` como directorio raíz. Configura `VITE_API_URL` con la URL `https://...onrender.com` de la API y despliega.
3. Añade el dominio final de Vercel a `ALLOWED_ORIGINS` en Render y redepliega la API.
4. Comprueba `https://...onrender.com/health` y luego los productos, sesiones y el asistente en el dominio web.

Se necesitan cuentas propias en Vercel, Render y MongoDB Atlas, una base con productos cargados y autorización para conectar el repositorio. El dominio público final depende de esos despliegues y de cargar datos de productos y envíos.
