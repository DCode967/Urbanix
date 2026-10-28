function AccountPanel({ abierto, onCerrar }) {
  return (
    <section id="mi-cuenta" className="panel-cuenta" aria-labelledby="titulo-mi-cuenta" hidden={!abierto}>
      <div className="panel-cuenta-cabecera">
        <div>
          <p className="etiqueta-cuenta">Tu perfil</p>
          <h2 id="titulo-mi-cuenta">Mi cuenta</h2>
        </div>
        <button type="button" id="cerrar-mi-cuenta" className="boton-cerrar-cuenta" aria-label="Cerrar Mi cuenta" onClick={onCerrar}>×</button>
      </div>
      <dl className="datos-cuenta">
        <div>
          <dt>Nombre</dt>
          <dd id="cuenta-nombre"></dd>
        </div>
        <div>
          <dt>Correo electrónico</dt>
          <dd id="cuenta-correo"></dd>
        </div>
        <div>
          <dt>Tipo de cuenta</dt>
          <dd id="cuenta-rol"></dd>
        </div>
      </dl>
      <p id="estado-cuenta" role="status" aria-live="polite"></p>
      <button type="button" id="cerrar-sesion" className="boton-cerrar-sesion">Cerrar sesión</button>
    </section>
  )
}

export default AccountPanel
