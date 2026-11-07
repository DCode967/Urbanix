# CAMBIOS - Migración a React

| Archivo / Funcionalidad | Antes (vanilla) | Ahora (React) | Explicación para principiantes |
|---|---|---|---|
| Estructura | Todo junto (public/ + src/ en raíz) | Separado en backend/ y frontend/ | Ahora el API va en una carpeta y la web en otra, más ordenado. |
| Servidor | Express servía archivos estáticos desde public/ | Solo API REST | El frontend ahora corre en Vite (puerto 5173) y llama al backend (puerto 3000). |
| CORS | Sin CORS | cors configurado para http://localhost:5173 | Permite que React llame al API desde otro puerto. |
| package.json backend | Sin script dev con --watch | dev: node --watch src/server.js, start: node src/server.js | Más fácil reiniciar en desarrollo. |
| Frontend | HTML/CSS/JS con querySelector/addEventListener/innerHTML | React + Vite, componentes .jsx, useState/useEffect | Se divide en piezas reutilizables. Ya no se manipula el DOM directamente. |
| Carrito | JS vanilla + localStorage | Estado en App.jsx con useState + localStorage | El carrito se comparte entre componentes con props. |
| Productos | Hardcodeados en index.html | Cargados desde API con useEffect ([], cargando/error) | Ahora vienen de la base de datos vía GET /api/productos. |
| Login/Registro/Sesión | Páginas HTML + JS vanilla | Componentes React con hash routing (#/login, #/registro) | Todo funciona dentro de la app React. |
| Llamadas API | fetch directo en archivos JS | frontend/src/api.js con import.meta.env.VITE_API_URL | Centralizamos las llamadas al backend. |

## Mejoras y tareas pendientes

- El buscador filtra el catálogo por nombre, descripción y categoría; los botones de categoría aplican el filtro.
- El asistente móvil consulta la API Responses de OpenAI con datos de productos de MongoDB y las políticas/contacto configurados. Si faltan datos, los reconoce; si la IA falla, usa una respuesta guiada de respaldo.
- La API permite configurar CORS por `ALLOWED_ORIGINS`, utiliza cookies seguras en producción y expone `/health`.
- Se añadió una configuración inicial de Vercel para el frontend y Render para la API; los pasos están en el README.
- Pendiente: cargar productos reales, proporcionar OPENAI_API_KEY, publicar políticas de envío, indicar correo/teléfono de soporte, conectar cuentas/dominios de hosting y MongoDB Atlas. El carrito no procesa pagos todavía.
