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
import { obtenerProductos, obtenerSesion, cerrarSesion } from './api'

function App() {
  const [ruta, setRuta] = useState(window.location.hash || '#/')
  const [carrito, setCarrito] = useState([])
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [cuentaAbierta, setCuentaAbierta] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const [productos, setProductos] = useState([])
  const [cargandoProductos, setCargandoProductos] = useState(true)
  const [errorProductos, setErrorProductos] = useState('')

  useEffect(() => {
    const handleHashChange = () => {
      setRuta(window.location.hash || '#/')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem('urbanix-carrito') || '[]')
      if (Array.isArray(guardado)) {
        setCarrito(guardado)
      }
    } catch {
      localStorage.removeItem('urbanix-carrito')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('urbanix-carrito', JSON.stringify(carrito))
  }, [carrito])

  useEffect(() => {
    // cargar sesión
    obtenerSesion()
      .then((resultado) => {
        if (resultado && resultado.user) {
          setUsuario(resultado.user)
        }
      })
      .catch(() => {
        setUsuario(null)
      })
  }, [])

  useEffect(() => {
    setCargandoProductos(true)
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
    const id = producto.id || producto._id
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === id)
      if (existente) {
        return prev.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [
        ...prev,
        {
          id,
          nombre: producto.nombre,
          precio: Number(producto.precio),
          imagen: producto.imagen,
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
      prev.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item))
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

  const handleCerrarSesion = async () => {
    try {
      await cerrarSesion()
    } catch {
      // ignorar
    }
    setUsuario(null)
    setCuentaAbierta(false)
    window.location.hash = '#/'
  }

  if (ruta === '#/login') {
    return <LoginPage />
  }
  if (ruta === '#/registro') {
    return <RegisterPage />
  }

  return (
    <>
      <Header
        cantidadCarrito={cantidadTotal}
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
        <Categories />
        <ProductList productos={productos} cargando={cargandoProductos} error={errorProductos} onAgregar={agregarAlCarrito} />
        <Offers />
        <Benefits />
        <Testimonials />
      </main>
      <Footer />
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
