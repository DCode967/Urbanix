function Categories({ onSeleccionar }) {
  const categorias = ['Ropa', 'Calzado', 'Accesorios']
  return (
    <section id="categorias" className="categorias">
      <h2>Categorías</h2>
      <div className="contenedor-tarjetas">
        {categorias.map((categoria) => (
          <article className="tarjeta" key={categoria}>
            <h3>{categoria}</h3>
            <button type="button" className="button" onClick={() => onSeleccionar(categoria)}>Ver más</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Categories
