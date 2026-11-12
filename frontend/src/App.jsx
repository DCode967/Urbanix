import { useEffect, useState } from 'react'
import Header from './components/Header'
import Nav from './components/Nav'
import AccountPanel from './components/AccountPanel'
import Hero from './components/Hero'
import Categories from './components/Categories'
import ProductList from './components/ProductList'
import Offers from './components/Offers'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import CartSidebar from './components/CartSidebar'
import Footer from './components/Footer'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import StoreAssistant from './components/StoreAssistant'
import { obtenerProductos, obtenerSesion, cerrarSesion } from './api'

function App() {
  const [ruta, setRuta] = useState(window.location.hash || '#/')
  const [carrito, setCarrito] = useState([])
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [cuentaAbierta, setCuentaAbierta] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const [sesionVerificada, setSesionVerificada] = useState(false)
  const [productos, setProductos] = useState([])
  const [cargandoProductos, setCargandoProductos] = useState(true)
  const [errorProductos, setErrorProductos] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const handleHashChange = () => {
      setRuta(window.location.hash || '#/')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (!usuario || !sesionVerificada) return
    localStorage.setItem(`urbanix-carrito-${usuario.correo}`, JSON.stringify(carrito))
  }, [carrito, usuario, sesionVerificada])

  useEffect(() => {
    // cargar sesión
    obtenerSesion()
      .then((resultado) => {
        if (resultado && resultado.user) {
          setUsuario(resultado.user)
          try {
            const guardado = JSON.parse(localStorage.getItem(`urbanix-carrito-${resultado.user.correo}`) || '[]')
            setCarrito(Array.isArray(guardado) ? guardado : [])
          } catch {
            localStorage.removeItem(`urbanix-carrito-${resultado.user.correo}`)
            setCarrito([])
          }
        } else {
          setCarrito([])
        }
      })
      .catch(() => {
        setUsuario(null)
        setCarrito([])
      })
      .finally(() => {
        // Descarta el carrito anónimo de versiones anteriores.
        localStorage.removeItem('urbanix-carrito')
        setSesionVerificada(true)
      })
  }, [])

  const handleInicioSesion = (usuarioAutenticado) => {
    setUsuario(usuarioAutenticado)
    try {
      const guardado = JSON.parse(localStorage.getItem(`urbanix-carrito-${usuarioAutenticado.correo}`) || '[]')
      setCarrito(Array.isArray(guardado) ? guardado : [])
    } catch {
      localStorage.removeItem(`urbanix-carrito-${usuarioAutenticado.correo}`)
      setCarrito([])
    }
    window.location.hash = '#/'
  }

  useEffect(() => {
    setErrorProductos('')
    obtenerProductos()
      .then((data) => {
        setProductos(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        setErrorProductos(error.message || 'Error al cargar productos')
      })
      .finally(() => {
        setCargandoProductos(false)
      })
  }, [])

  const agregarAlCarrito = (producto) => {
    if (!usuario || !sesionVerificada) {
      if (sesionVerificada) window.location.hash = '#/login'
      return
    }
    const id = producto.id || producto._id
    const stock = Number(producto.stock)
    if (stock <= 0) return
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === id)
      if (existente) {
        if (existente.cantidad >= stock) return prev
        return prev.map((item) =>
          item.id === id ? { ...item, stock, cantidad: item.cantidad + 1 } : item
        )
      }
      return [
        ...prev,
        {
          id,
          nombre: producto.nombre,
          precio: Number(producto.precio),
          imagen: producto.imagen,
          stock,
          cantidad: 1
        }
      ]
    })
    setCarritoAbierto(true)
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const aumentarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) => (item.id === id && item.cantidad < Number(item.stock) ? { ...item, cantidad: item.cantidad + 1 } : item))
    )
  }

  const disminuirCantidad = (id) => {
    setCarrito((prev) => {
      const item = prev.find((producto) => producto.id === id)
      if (!item) return prev
      if (item.cantidad > 1) {
        return prev.map((producto) =>
          producto.id === id ? { ...producto, cantidad: producto.cantidad - 1 } : producto
        )
      }
      return prev.filter((producto) => producto.id !== id)
    })
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0)
  const productosFiltrados = productos.filter((producto) => `${producto.nombre} ${producto.descripcion} ${producto.categoria}`.toLocaleLowerCase('es').includes(filtro.trim().toLocaleLowerCase('es')))
  const buscarProductos = () => { setFiltro(busqueda.trim()); document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' }) }
  const seleccionarCategoria = (categoria) => { setBusqueda(categoria); setFiltro(categoria); document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' }) }

  const handleCerrarSesion = async () => {
    try {
      await cerrarSesion()
    } catch {
      // ignorar
    }
    setUsuario(null)
    setCarrito([])
    setCuentaAbierta(false)
    window.location.hash = '#/'
  }

  if (ruta === '#/login') {
    return <LoginPage onLogin={handleInicioSesion} />
  }
  if (ruta === '#/registro') {
    return <RegisterPage />
  }

  return (
    <>
      <Header
        cantidadCarrito={cantidadTotal}
        busqueda={busqueda}
        onCambiarBusqueda={setBusqueda}
        onBuscar={buscarProductos}
        onAbrirCarrito={() => setCarritoAbierto(true)}
        onAbrirCuenta={() => setCuentaAbierta(true)}
        usuario={usuario}
      />
      <Nav />
      <AccountPanel
        abierto={cuentaAbierta}
        onCerrar={() => setCuentaAbierta(false)}
        usuario={usuario}
        onCerrarSesion={handleCerrarSesion}
      />
      <main>
        <Hero />
        <Categories onSeleccionar={seleccionarCategoria} />
        <ProductList productos={productosFiltrados} cargando={cargandoProductos} error={errorProductos} onAgregar={agregarAlCarrito} autenticado={Boolean(usuario)} sesionVerificada={sesionVerificada} filtro={filtro} onLimpiarFiltro={() => { setFiltro(''); setBusqueda('') }} />
        <Offers />
        <Benefits />
        <Testimonials />
      </main>
      <Footer />
      <StoreAssistant productos={productos} cargando={cargandoProductos} />
      <CartSidebar
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
        carrito={carrito}
        onAumentar={aumentarCantidad}
        onDisminuir={disminuirCantidad}
        onEliminar={eliminarDelCarrito}
        onVaciar={vaciarCarrito}
      />
    </>
  )
}

export default App

