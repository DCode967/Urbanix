import { useEffect, useMemo, useState } from 'react'
import { crearProductoAdmin, eliminarProductoAdmin, obtenerProductosAdmin, actualizarProductoAdmin } from '../api'

const productoVacio = { nombre: '', descripcion: '', precio: '', imagen: '', categoria: 'Ropa', stock: '' }
const moneda = (valor) => `$${Number(valor || 0).toLocaleString('es-CO')} COP`

export default function AdminPanel({ usuario, onVolver }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [formulario, setFormulario] = useState(productoVacio)
  const [editando, setEditando] = useState(null)
  const [estado, setEstado] = useState('')
  const [error, setError] = useState('')

  const cargarProductos = async () => {
    setCargando(true)
    setError('')
    try { setProductos(await obtenerProductosAdmin()) }
    catch (e) { setError(e.message || 'No se pudieron cargar los productos.') }
    finally { setCargando(false) }
  }

  useEffect(() => { cargarProductos() }, [])

  const visibles = useMemo(() => productos.filter((p) => `${p.nombre} ${p.categoria} ${p.descripcion}`.toLocaleLowerCase('es').includes(busqueda.trim().toLocaleLowerCase('es'))), [productos, busqueda])
  const activos = productos.filter((p) => p.activo !== false).length
  const valorInventario = productos.reduce((total, p) => total + (p.activo === false ? 0 : Number(p.precio) * Number(p.stock)), 0)

  const cambiarCampo = (event) => setFormulario((actual) => ({ ...actual, [event.target.name]: event.target.value }))
  const iniciarEdicion = (producto) => {
    setEditando(producto._id)
    setFormulario({ nombre: producto.nombre, descripcion: producto.descripcion, precio: String(producto.precio), imagen: producto.imagen, categoria: producto.categoria, stock: String(producto.stock) })
    setEstado('')
    document.getElementById('admin-formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const cancelarEdicion = () => { setEditando(null); setFormulario(productoVacio) }

  const guardarProducto = async (event) => {
    event.preventDefault()
    setGuardando(true); setEstado(''); setError('')
    const datos = { ...formulario, nombre: formulario.nombre.trim(), descripcion: formulario.descripcion.trim(), imagen: formulario.imagen.trim(), precio: Number(formulario.precio), stock: Number(formulario.stock) }
    try {
      if (editando) await actualizarProductoAdmin(editando, datos)
      else await crearProductoAdmin(datos)
      setEstado(editando ? 'Producto actualizado.' : 'Producto creado.')
      cancelarEdicion()
      await cargarProductos()
    } catch (e) { setError(e.message || 'No se pudo guardar el producto.') }
    finally { setGuardando(false) }
  }

  const quitarProducto = async (producto) => {
    if (!window.confirm(`¿Desactivar «${producto.nombre}»?`)) return
    setError(''); setEstado('')
    try { await eliminarProductoAdmin(producto._id); setEstado('Producto desactivado.'); await cargarProductos() }
    catch (e) { setError(e.message || 'No se pudo desactivar el producto.') }
  }

  return (
    <main className="admin-pagina">
      <header className="admin-encabezado">
        <div><p className="admin-eyebrow">URBANIX · ADMINISTRACIÓN</p><h1>Panel administrativo</h1><p>Hola, {usuario?.nombre}. Gestiona el catálogo y el inventario de la tienda.</p></div>
        <button type="button" className="admin-volver" onClick={onVolver}>← Volver a la tienda</button>
      </header>

      <section className="admin-resumen" aria-label="Resumen del catálogo">
        <article><span>Productos registrados</span><strong>{productos.length}</strong></article>
        <article><span>Productos activos</span><strong>{activos}</strong></article>
        <article><span>Unidades en inventario</span><strong>{productos.reduce((n, p) => n + (p.activo === false ? 0 : Number(p.stock)), 0)}</strong></article>
        <article><span>Valor del inventario</span><strong>{moneda(valorInventario)}</strong></article>
      </section>

      <section id="admin-formulario" className="admin-seccion">
        <div className="admin-seccion-titulo"><div><p className="admin-eyebrow">CATÁLOGO</p><h2>{editando ? 'Editar producto' : 'Agregar producto'}</h2></div></div>
        <form className="admin-formulario" onSubmit={guardarProducto}>
          <label>Nombre<input name="nombre" value={formulario.nombre} onChange={cambiarCampo} maxLength="100" required /></label>
          <label>Categoría<select name="categoria" value={formulario.categoria} onChange={cambiarCampo}><option>Ropa</option><option>Calzado</option><option>Accesorios</option></select></label>
          <label>Precio (COP)<input name="precio" type="number" min="0" step="1" value={formulario.precio} onChange={cambiarCampo} required /></label>
          <label>Stock<input name="stock" type="number" min="0" step="1" value={formulario.stock} onChange={cambiarCampo} required /></label>
          <label className="admin-campo-ancho">URL de imagen<input name="imagen" type="url" value={formulario.imagen} onChange={cambiarCampo} required /></label>
          <label className="admin-campo-ancho">Descripción<textarea name="descripcion" rows="3" value={formulario.descripcion} onChange={cambiarCampo} required /></label>
          <div className="admin-formulario-acciones"><button type="submit" disabled={guardando}>{guardando ? 'Guardando…' : editando ? 'Guardar cambios' : 'Crear producto'}</button>{editando && <button type="button" className="admin-secundario" onClick={cancelarEdicion}>Cancelar edición</button>}</div>
        </form>
      </section>

      <section className="admin-seccion">
        <div className="admin-seccion-titulo admin-lista-cabecera"><div><p className="admin-eyebrow">INVENTARIO</p><h2>Productos</h2></div><input type="search" aria-label="Buscar productos del inventario" placeholder="Buscar en el inventario…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} /></div>
        {estado && <p className="admin-mensaje" role="status">{estado}</p>}{error && <p className="admin-error" role="alert">{error}</p>}
        {cargando ? <p>Cargando inventario…</p> : visibles.length ? <div className="admin-tabla-contenedor"><table className="admin-tabla"><thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{visibles.map((p) => <tr key={p._id}><td><div className="admin-producto"><img src={p.imagen} alt="" /><span>{p.nombre}</span></div></td><td>{p.categoria}</td><td>{moneda(p.precio)}</td><td>{p.stock}</td><td><span className={`admin-etiqueta ${p.activo === false ? 'inactivo' : 'activo'}`}>{p.activo === false ? 'Inactivo' : 'Activo'}</span></td><td><div className="admin-acciones"><button type="button" onClick={() => iniciarEdicion(p)}>Editar</button>{p.activo !== false && <button type="button" className="admin-eliminar" onClick={() => quitarProducto(p)}>Desactivar</button>}</div></td></tr>)}</tbody></table></div> : <p>No hay productos que coincidan con la búsqueda.</p>}
      </section>
    </main>
  )
}
