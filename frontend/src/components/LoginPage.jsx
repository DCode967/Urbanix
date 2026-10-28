import { useState } from 'react'
import { iniciarSesion } from '../api'

function LoginPage() {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [estado, setEstado] = useState('')
  const [tipo, setTipo] = useState('info')

  const handleSubmit = async (evento) => {
    evento.preventDefault()
    setEstado('')
    setTipo('info')

    if (!correo.trim()) {
      setEstado('Escribe tu correo electrónico.')
      setTipo('error')
      return
    }
    if (!password) {
      setEstado('Escribe tu contraseña.')
      setTipo('error')
      return
    }
    if (password.length < 8) {
      setEstado('La contraseña debe tener al menos 8 caracteres.')
      setTipo('error')
      return
    }
    if (password.length > 128) {
      setEstado('La contraseña no puede superar 128 caracteres.')
      setTipo('error')
      return
    }

    setEstado('Iniciando sesión...')
    setTipo('info')

    try {
      const resultado = await iniciarSesion({ correo: correo.trim().toLowerCase(), password })
      setEstado(`Bienvenido, ${resultado.user.nombre}.`)
      setTipo('info')
    } catch (error) {
      setEstado(error.message || 'No se pudo conectar con el servidor. Inténtalo de nuevo.')
      setTipo('error')
    }
  }

  return (
    <main className="contenedor-auth">
      <section className="tarjeta-auth">
        <h1>Iniciar sesión</h1>
        <form id="form-login" noValidate onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" type="email" name="email" autoComplete="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" name="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Entrar</button>
        </form>
        <p id="estado-login" role="status" aria-live="polite" data-tipo={tipo}>{estado}</p>
        <p><a href="#/registro">Crear una cuenta</a></p>
        <p><a href="#/">Volver a la tienda</a></p>
      </section>
    </main>
  )
}

export default LoginPage
