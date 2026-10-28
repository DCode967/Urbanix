import ProductCard from './ProductCard'

function ProductList({ productos = [], cargando, error, onAgregar }) {
  return (
    <section id="tienda" className="productos">
      <h2>Productos destacados</h2>
      {cargando && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <div className="galeria">
          {productos.map((producto) => (
            <ProductCard key={producto._id || producto.id} producto={producto} onAgregar={onAgregar} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList
