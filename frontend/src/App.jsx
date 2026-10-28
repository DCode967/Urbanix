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

function App() {
  return (
    <>
      <Header />
      <Nav />
      <AccountPanel />
      <main>
        <Hero />
        <Categories />
        <ProductList />
        <Offers />
        <Benefits />
        <Testimonials />
      </main>
      <Footer />
      <CartSidebar />
    </>
  )
}

export default App
