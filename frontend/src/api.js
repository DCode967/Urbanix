const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/api/productos`);
  if (!respuesta.ok) {
    throw new Error('Error al obtener productos');
  }
  return respuesta.json();
}

export async function obtenerProductosAdmin() {
  const respuesta = await fetch(`${API_URL}/api/productos/admin`, {
    credentials: 'include'
  });
  if (!respuesta.ok) {
    throw new Error('Error al obtener productos (admin)');
  }
  return respuesta.json();
}

async function solicitarAdmin(url, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${url}`, {
    ...opciones,
    headers: { ...(opciones.body ? { 'Content-Type': 'application/json' } : {}), ...opciones.headers },
    credentials: 'include'
  })
  const resultado = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) throw new Error(resultado.message || 'No se pudo completar la acción administrativa.')
  return resultado
}

export const crearProductoAdmin = (datos) => solicitarAdmin('/api/productos', { method: 'POST', body: JSON.stringify(datos) })
export const actualizarProductoAdmin = (id, datos) => solicitarAdmin(`/api/productos/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(datos) })
export const eliminarProductoAdmin = (id) => solicitarAdmin(`/api/productos/${encodeURIComponent(id)}`, { method: 'DELETE' })

export async function obtenerSesion() {
  const respuesta = await fetch(`${API_URL}/api/auth/me`, {
    credentials: 'include'
  });
  if (!respuesta.ok) {
    throw new Error('Sin sesión');
  }
  return respuesta.json();
}

export async function iniciarSesion(datos) {
  const respuesta = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    throw new Error(resultado.message || 'Error al iniciar sesión');
  }
  return resultado;
}

export async function registrarUsuario(datos) {
  const respuesta = await fetch(`${API_URL}/api/auth/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    throw new Error(resultado.message || 'Error al registrar');
  }
  return resultado;
}

export async function cerrarSesion() {
  const respuesta = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  const resultado = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    throw new Error(resultado.message || 'Error al cerrar sesión');
  }
  return resultado;
}

export async function preguntarAsistente(pregunta) {
  const respuesta = await fetch(`${API_URL}/api/asistente`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pregunta })
  })
  const resultado = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) throw new Error(resultado.message || 'Asistente no disponible')
  return resultado.respuesta
}
