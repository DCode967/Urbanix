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
