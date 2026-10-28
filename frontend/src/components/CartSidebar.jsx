function formatearPrecio(precio) {
  return Number(precio).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })
}

function CartSidebar({ abierto, onCerrar, carrito, onAumentar, onDisminuir, onEliminar, onVaciar }) {
  const total = carrito.reduce((suma, item) => suma + Number(item.precio) * Number(item.cantidad), 0)
  const vacio = carrito.length === 0

  return (
    <>
      <div id="overlay-carrito" className={abierto ? 'overlay-carrito overlay-visible' : 'overlay-carrito'} onClick={onCerrar}></div>
      <aside id="panel-carrito" className={abierto ? 'panel-carrito carrito-abierto' : 'panel-carrito'}>
        <div className="carrito-header">
          <h2>Mi carrito</h2>
          <button type="button" id="cerrar-carrito" className="cerrar-carrito" aria-label="Cerrar carrito" onClick={onCerrar}>×</button>
        </div>

        <div id="carrito-productos" className="carrito-productos">
          {!vacio &&
            carrito.map((producto) => (
              <div className="item-carrito" key={producto.id}>
                <div className="item-carrito-imagen">
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <div className="item-carrito-info">
                  <h3>{producto.nombre}</h3>
                  <p className="item-precio">{formatearPrecio(producto.precio)}</p>
                  <div className="controles-cantidad">
                    <button type="button" className="boton-cantidad disminuir" aria-label="Disminuir cantidad" onClick={() => onDisminuir(producto.id)}>−</button>
                    <span>{producto.cantidad}</span>
                    <button type="button" className="boton-cantidad aumentar" aria-label="Aumentar cantidad" onClick={() => onAumentar(producto.id)}>+</button>
                  </div>
                </div>
                <button type="button" className="boton-eliminar" aria-label="Eliminar producto" onClick={() => onEliminar(producto.id)}>🗑️</button>
              </div>
            ))}
        </div>

        <div id="carrito-vacio" className="carrito-vacio" style={{ display: vacio ? 'flex' : 'none' }}>
          <div className="carrito-vacio-icono">🛒</div>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega algunos productos para comenzar.</p>
        </div>

        <div className="carrito-footer">
          <div className="carrito-resumen">
            <div className="carrito-total">
              <span>Total</span>
              <strong id="carrito-total">{formatearPrecio(total)}</strong>
            </div>
          </div>
          <button type="button" id="vaciar-carrito" className="boton-vaciar" style={{ display: vacio ? 'none' : 'block' }} onClick={onVaciar}>Vaciar carrito</button>
          <button type="button" id="finalizar-compra" className="boton-finalizar" style={{ display: vacio ? 'none' : 'block' }} onClick={() => alert('La función de pago se agregará próximamente.')}>Finalizar compra</button>
        </div>
      </aside>
    </>
  )
}

export default CartSidebar
