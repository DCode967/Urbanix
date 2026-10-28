const API_URL = import.meta.env.VITE_API_URL;

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
