import ProductCard from './ProductCard'

function ProductList({ productos = [], cargando, error, onAgregar, autenticado, sesionVerificada, filtro, onLimpiarFiltro }) {
  return (
    <section id="tienda" className="productos">
      <h2>Productos destacados</h2>
      {filtro && <p className="filtro-activo">Resultados para “{filtro}” <button type="button" onClick={onLimpiarFiltro}>Limpiar</button></p>}
      {cargando && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <div className="galeria">
          {productos.map((producto) => (
            <ProductCard key={producto._id || producto.id} producto={producto} onAgregar={onAgregar} autenticado={autenticado} sesionVerificada={sesionVerificada} />
          ))}
          {productos.length === 0 && <p>No encontramos productos para esta búsqueda.</p>}
        </div>
      )}
    </section>
  )
}

export default ProductList
