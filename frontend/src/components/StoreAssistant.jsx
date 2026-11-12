import { useState } from 'react'
import { preguntarAsistente } from '../api'

function normalize(value) {
  return value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function responder(pregunta, productos, cargando) {
  const texto = normalize(pregunta)
  if (/envio|envian|entrega|domicilio|despacho|seguimiento/.test(texto)) return 'La tienda no tiene publicados datos verificables sobre envíos ni un canal de soporte. Pide al responsable que confirme esta información antes de comprar.'
  if (cargando) return 'Estoy cargando el catálogo. Inténtalo de nuevo en unos segundos.'
  if (!productos.length) return 'No puedo consultar el catálogo ahora. Inténtalo más tarde o pide al responsable de la tienda que confirme los detalles.'
  const coincidencias = productos.filter((producto) => normalize(`${producto.nombre} ${producto.categoria}`).split(/\s+/).some((termino) => termino.length > 2 && texto.includes(termino)))
  if (coincidencias.length) return coincidencias.slice(0, 3).map((producto) => `${producto.nombre}: ${producto.descripcion} Precio: $${Number(producto.precio).toLocaleString('es-CO')} COP. ${Number(producto.stock) > 0 ? 'Disponible según el stock publicado.' : 'Sin unidades según el stock publicado.'}`).join('\n\n')
  if (/producto|catalogo|disponible|precio|stock/.test(texto)) return `Hay ${productos.length} producto(s) activo(s) en el catálogo. Pregúntame por su nombre o categoría para ver precio y descripción. Confirma el stock antes de comprar.`
  return 'Puedo ayudarte con los productos del catálogo y la información de envíos. Dime el nombre de un producto o pregunta por envíos. Si necesitas confirmar otra cosa, pide confirmación al responsable de la tienda.'
}

export default function StoreAssistant({ productos, cargando }) {
  const [abierto, setAbierto] = useState(false)
  const [pregunta, setPregunta] = useState('')
  const [mensajes, setMensajes] = useState([])
  const [enviando, setEnviando] = useState(false)
  const enviar = async (event) => {
    event.preventDefault()
    const texto = pregunta.trim()
    if (!texto || enviando) return
    setMensajes((actuales) => [...actuales, { tipo: 'cliente', texto }])
    setPregunta('')
    setEnviando(true)
    try {
      const respuesta = await preguntarAsistente(texto)
      setMensajes((actuales) => [...actuales, { tipo: 'asistente', texto: respuesta }])
    } catch {
      const respaldo = responder(texto, productos, cargando)
      setMensajes((actuales) => [...actuales, { tipo: 'asistente', texto: `${respaldo} (Respuesta de respaldo; la IA no está disponible.)` }])
    } finally {
      setEnviando(false)
    }
  }
  return (
    <div className="asistente-tienda">
      {abierto && <section className="asistente-panel" aria-label="Nix, asistente de Urbanix">
        <header><div><strong>Nix</strong><span>Asistente de Urbanix · Productos y envíos</span></div><button type="button" aria-label="Cerrar Nix" onClick={() => setAbierto(false)}>×</button></header>
        <div className="asistente-mensajes" aria-live="polite"><p className="mensaje-asistente">¡Hola! Soy Nix. Puedo ayudarte con el catálogo y los datos de envío publicados.</p>{mensajes.map((mensaje, indice) => <p key={indice} className={`mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>)}</div>
        <form onSubmit={enviar}><label className="sr-only" htmlFor="pregunta-asistente">Pregunta</label><input id="pregunta-asistente" value={pregunta} onChange={(event) => setPregunta(event.target.value)} placeholder="Pregunta por un producto o envío" disabled={enviando} /><button type="submit" disabled={enviando}>{enviando ? 'Consultando…' : 'Enviar'}</button></form>
      </section>}
      <button type="button" className="asistente-boton" aria-expanded={abierto} onClick={() => setAbierto((estado) => !estado)}>{abierto ? 'Cerrar Nix' : 'Habla con Nix'}</button>
    </div>
  )
}
