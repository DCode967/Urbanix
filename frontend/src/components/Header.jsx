function Header({ cantidadCarrito, onAbrirCarrito, onAbrirCuenta }) {
  return (
    <header id="inicio" className="header">
      <div className="header-contenido">
        <div className="marca">
          <div className="logo">
            <img src="/img/Urbanix_logo.png" alt="Logo de UrbanIX" />
          </div>
          <h1>Urban<span>IX</span></h1>
        </div>

        <div className="buscador">
          <input type="search" placeholder="Buscar productos..." aria-label="Buscar productos" />
          <span id="mensaje-busqueda" role="status" aria-live="polite"></span>
          <button type="button" id="bt-b">Buscar</button>
        </div>

        <div className="acciones">
          <a id="enlace-login" href="login.html">Iniciar sesión</a>
          <button type="button" id="abrir-mi-cuenta" className="boton-cuenta" aria-controls="mi-cuenta" aria-expanded="false" onClick={onAbrirCuenta}>Mi cuenta</button>
          <button type="button" id="abrir-carrito" className="boton-carrito" onClick={onAbrirCarrito}>
            Carrito
            <span id="contador-carrito">{cantidadCarrito}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
