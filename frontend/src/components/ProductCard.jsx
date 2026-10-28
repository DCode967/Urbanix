function ProductCard({ producto }) {
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
      <p>${producto.precio.toLocaleString('es-CO')}</p>
      <button type="button" className="button agregar-carrito">Agregar al carrito</button>
    </article>
  )
}

export default ProductCard
