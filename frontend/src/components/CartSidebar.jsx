function CartSidebar() {
  return (
    <>
      <div id="overlay-carrito" className="overlay-carrito"></div>
      <aside id="panel-carrito" className="panel-carrito">
        <div className="carrito-header">
          <h2>Mi carrito</h2>
          <button type="button" id="cerrar-carrito" className="cerrar-carrito" aria-label="Cerrar carrito">×</button>
        </div>
        <div id="carrito-productos" className="carrito-productos"></div>
        <div id="carrito-vacio" className="carrito-vacio">
          <div className="carrito-vacio-icono">🛒</div>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega algunos productos para comenzar.</p>
        </div>
        <div className="carrito-footer">
          <div className="carrito-resumen">
            <div className="carrito-total">
              <span>Total</span>
              <strong id="carrito-total">$0</strong>
            </div>
          </div>
          <button type="button" id="vaciar-carrito" className="boton-vaciar">Vaciar carrito</button>
          <button type="button" id="finalizar-compra" className="boton-finalizar">Finalizar compra</button>
        </div>
      </aside>
    </>
  )
}

export default CartSidebar
