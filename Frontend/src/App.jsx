import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProductID from './pages/ProductID'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartContext from './context/CartContext'

function App() {

  return (
    <div>
      <CartContext>
        <Navbar />
        <Routes>
          <Route path = '/' element = {<Dashboard />} index />
          <Route path = '/cart' element = {<Cart />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/product/:id' element = {<ProductID />} />
        </Routes>
        <Footer />
      </CartContext>
    </div>
  )
}

export default App