function Testimonials() {
  return (
    <section id="contacto" className="testimonios">
      <h2>Opiniones de clientes</h2>
      <p>En esta sección podras contarnos tu valiosa opinión sobre nuestros productos y servicios.</p>
      <form id="form-opinion">
        <label htmlFor="opinion">Comparte tu opinión</label>
        <input id="opinion" type="text" placeholder="Escribe tu opinión aquí" name="opinion" required maxLength="500" />
        <button type="submit">Enviar opinión</button>
        <p id="estado-opinion" role="status" aria-live="polite"></p>
      </form>
    </section>
  )
}

export default Testimonials
