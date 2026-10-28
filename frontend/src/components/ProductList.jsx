import ProductCard from './ProductCard'
import { productos } from '../data/productos'

function ProductList({ onAgregar }) {
  return (
    <section id="tienda" className="productos">
      <h2>Productos destacados</h2>
      <div className="galeria">
        {productos.map((producto) => (
          <ProductCard key={producto._id || producto.id} producto={producto} onAgregar={onAgregar} />
        ))}
      </div>
    </section>
  )
}

export default ProductList
