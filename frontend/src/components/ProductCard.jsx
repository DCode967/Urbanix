function ProductCard({ producto, onAgregar }) {
  const agotado = Number(producto.stock) <= 0
  const handleAgregar = () => {
    if (!agotado) onAgregar(producto)
  }

  return (
    <article
      className="producto"
      data-id={producto.id || producto._id}
      data-nombre={producto.nombre}
      data-precio={producto.precio}
      data-imagen={producto.imagen}
    >
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>${Number(producto.precio).toLocaleString('es-CO')}</p>
      <p>{agotado ? 'Agotado' : `${producto.stock} disponible(s)`}</p>
      <button type="button" className="button agregar-carrito" onClick={handleAgregar} disabled={agotado}>{agotado ? 'Agotado' : 'Agregar al carrito'}</button>
    </article>
  )
}

export default ProductCard
