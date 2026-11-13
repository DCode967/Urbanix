import { useState } from 'react'
import { registrarUsuario } from '../api'

function RegisterPage() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [estado, setEstado] = useState('')

  const handleSubmit = async (evento) => {
    evento.preventDefault()
    setEstado('Creando cuenta...')

    try {
      const resultado = await registrarUsuario({
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        password
      })
      setEstado(resultado.message)
      setNombre('')
      setCorreo('')
      setPassword('')
    } catch (error) {
      setEstado(error.message || 'No se pudo conectar con el servidor. Inténtalo de nuevo.')
    }
  }

  return (
    <main className="contenedor-auth">
      <section className="tarjeta-auth">
        <h1>Crear cuenta</h1>
        <form id="form-register" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" type="text" name="nombre" autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <label htmlFor="correo">Correo electrónico</label>
          <input id="correo" type="email" name="correo" autoComplete="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" name="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Registrarme</button>
        </form>
        <p id="estado-registro" role="status" aria-live="polite">{estado}</p>
        <p><a href="#/login">Ya tengo cuenta</a></p>
        <p><a href="#/">Volver a la tienda</a></p>
      </section>
    </main>
  )
}

export default RegisterPage
