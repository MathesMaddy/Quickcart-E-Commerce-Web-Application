import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import CartProvider, { CartContext } from '../context/CartContext'

const Navbar = () => {

  const [ success, setSuccess ] = useState(false);
  const { cartProduct } = useContext(CartContext);
  
  const logout = () => {    
    localStorage.removeItem('auth')
    setSuccess(false);
    return <Navigate to={'/'} />
  }
  
  useEffect(() => {
    if(localStorage.getItem('auth')){
      setSuccess(true);
    }
  }, [])
  
  return (
    <div className = 'navbar' style = {{ 
          display : 'flex', 
          alignItems : 'center', 
          justifyContent : 'space-between', 
          padding : '15px 30px', 
          backgroundColor: '#121212', 
          color: '#f2f2f2', 
          colorScheme: 'light dark', 
          position: 'sticky', 
          top: '0px', 
          zIndex : '1'        
        }}>
            <div>
              <Link to = '/' style = {{ all : 'unset', cursor : 'pointer' }}>              
                <img src="logo.png" alt="" width = '180px' />              
              </Link>
            </div>
            <div style = {{ display : 'flex', width : '120px', justifyContent: 'space-around', position : 'relative'}}>
              <Link to = '/cart' style = {{ all : 'unset', width : '25px', cursor : 'pointer'}} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                
                <span style = {{ color : "rgb(242,242,242)", fontSize : '13px', top : '25px', left : '12px', position : 'absolute'}}>Cart {cartProduct?.length}</span>
              </Link>

              { success ? (
                 <button onClick={logout} style = {{ all : 'unset', width : '25px', cursor : 'pointer'}} > Logout </button> )
                :
                ( <Link to = '/login' style = {{ all : 'unset', width : '25px', cursor : 'pointer'}} > Login </Link> )
              }
            </div>
    </div>
  )
}

export default Navbar