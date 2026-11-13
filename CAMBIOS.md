# CAMBIOS - Migración a React

| Archivo / Funcionalidad | Antes (vanilla) | Ahora (React) | Explicación para principiantes |
|---|---|---|---|
| Estructura | Todo junto (public/ + src/ en raíz) | Separado en backend/ y frontend/ | Ahora el API va en una carpeta y la web en otra, más ordenado. |
| Servidor | Express servía archivos estáticos desde public/ | Solo API REST | El frontend ahora corre en Vite (puerto 5173) y llama al backend (puerto 3000). |
| CORS | Sin CORS | cors configurable con ALLOWED_ORIGINS | Permite que React y el API en Render se comuniquen desde los dominios autorizados. |
| package.json backend | Sin script dev con --watch | dev: node --watch src/server.js, start: node src/server.js | Más fácil reiniciar en desarrollo. |
| Frontend | HTML/CSS/JS con querySelector/addEventListener/innerHTML | React + Vite, componentes .jsx, useState/useEffect | Se divide en piezas reutilizables. Ya no se manipula el DOM directamente. |
| Carrito | JS vanilla + localStorage | Estado en App.jsx ligado a sesión + localStorage por cuenta | Solo usuarios autenticados pueden ver y usar el carrito; las cantidades respetan el stock. |
| Productos | Hardcodeados en index.html | Cargados desde API con useEffect ([], cargando/error) | Ahora vienen de la base de datos vía GET /api/productos. |
| Login/Registro/Sesión | Páginas HTML + JS vanilla | Componentes React con hash routing (#/login, #/registro) | Todo funciona dentro de la app React. |
| Llamadas API | fetch directo en archivos JS | frontend/src/api.js con import.meta.env.VITE_API_URL | Centralizamos las llamadas al backend. |

## Mejoras y tareas pendientes

- El buscador filtra el catálogo por nombre, descripción y categoría; los botones de categoría aplican el filtro.
- El asistente móvil, ahora llamado Nix, consulta la API Responses de OpenAI con datos de productos de MongoDB y las políticas/contacto configurados. Si faltan datos, los reconoce; si la IA falla, usa una respuesta guiada de respaldo.
- El carrito requiere una sesión iniciada, se guarda por cuenta en el navegador y limita las cantidades al stock publicado. El pago y la creación de pedidos siguen pendientes de integrar con un proveedor.
- La API permite configurar CORS por `ALLOWED_ORIGINS`, utiliza cookies seguras en producción y expone `/health`.
- El frontend y la API están desplegados en Render; las URL, variables de entorno y pasos de despliegue están en el README.
- Pendiente para una tienda operativa: configurar los datos confirmados de envíos y soporte, verificar OPENAI_API_KEY y conectar una pasarela de pagos con creación de pedidos. El prototipo no procesa pagos ni pedidos.
