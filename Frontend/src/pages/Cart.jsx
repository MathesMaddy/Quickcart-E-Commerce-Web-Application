import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
let productURI = 'http://localhost:4000'

const Cart = () => {

  const [ products, setProducts ] = useState('');
  const [ totalPrice, setTotalPrice ] = useState([]);  
  const { cartProduct, setCartProduct } = useContext(CartContext)
  
  useEffect( () => {
    const fetched = async () => {      
      try {
        let uniProducts = [ ...new Set(cartProduct) ]
        const data = await fetch(`${productURI}/cart`, {
          method : 'POST',
          headers : {
            "Content-Type" : "application/json"
          },  
          body : JSON.stringify(uniProducts) 
        })
        const datajson = await data.json();
        setProducts(datajson);
        if(data.ok) {
          let price = datajson.map((item) => item.price); 
          setTotalPrice(price.reduce((acc, price) => acc + price, 0)); 
        }
      }
      catch(e) {
        console.log(e)
      }
    }
    fetched()
  }, [cartProduct])

  const DeleteProduct = (e) => {
    let reduceProduct = cartProduct.filter(item => item !== e.target.value);
    let price = products.map((item) => item.price); 
    setTotalPrice(price.reduce((acc, price) => acc + price, 0)); 
    setCartProduct(reduceProduct)
  }

  const MoreOnThisProduct = (id) => {
    let findProduct = cartProduct.map((item) => item === id).length
    if(findProduct < 10) {
      setCartProduct((prev) => [ ...prev, id ]);      
    }
  }

  const LessOnThisProduct = (id) => {
    const findIndex = cartProduct.indexOf(id)
    if(findIndex !== -1) {
      setCartProduct((prev) => {
        return prev.filter((item,value) => value !== findIndex);
      })
    }
  }

  const CheckLogin = () => {
    console.log(!localStorage.getItem('auth'))
    if(!localStorage.getItem('auth')) {
      return <Navigate to = {'/login'} />
    }
  }
  
  return (
    <div>
      <div style = {{ margin : '0 auto', padding : '20px 15px'}}>
        <div className = 'cart-container' style = {{ margin : '0 auto'}}>
          <h2> Your Cart </h2>
        </div>
        <div className = 'cart-container' style = {{ margin : '0 auto' }}>
            { products.length ? products?.map( (item, index) => (
              <div className = 'cart-product' key = {index}>                         
                <div>
                  <img src = {item.picture} alt="" width = '150px' />
                </div>
                <div>
                  <h3 style = {{ margin : '0px 0px'}}>{item.name}</h3>
                  <h3 style = {{ margin : '5px 0px'}}>Rs. {item.price}</h3>
                  <p style = {{ margin : '5px 0px', textAlign : 'justify' }}>{item.description}</p>
                  <div style = {{ margin : '10px 0px', textAlign : 'end', display : 'flex', justifyContent : 'space-between'}}>
                    <div>
                      <button style = {{ all : 'unset', padding : '2px 10px', backgroundColor : '#121212', color : 'white', cursor : 'pointer', margin : '0px 5px 0px 0px'}} onClick = {() => LessOnThisProduct(item.productId)} value = '-'>-</button>
                      <span style = {{ fontWeight : '500'}} >{cartProduct.filter((product) => product === item.productId).length}</span>
                      <button style = {{ all : 'unset', padding : '2px 10px', backgroundColor : '#121212', color : 'white', cursor : 'pointer', margin : '0px 0px 0px 5px'}} onClick = {() => MoreOnThisProduct(item.productId)} value = '+'>+</button>
                    </div>
                    <div>
                      <button onClick={DeleteProduct} style = {{ all : 'unset', padding : '10px 20px', backgroundColor : '#121212', color : 'white', cursor : 'pointer'}} value = {item.productId}>Delete</button>                      
                    </div>
                  </div>
                </div>
              </div>
            )) : 
              <div>
                <div style = {{ height : '50dvh', textAlign : 'center' }}>
                  
                  <img src = 'rejected.png' width='200px'/>
                  <p>
                    No Product.
                  </p>
                  <Link to='/'>Continue Shopping </Link>
                </div>
              </div>
            }
        </div>
        { products.length ? (
          <div>
            <div className = 'cart-container' style = {{ borderTop : '1px solid grey', borderBottom : '1px solid grey', padding : "10px 10px 10px 0px", textAlign: 'end', fontWeight : '500', margin : '0px auto'}}>
              <div>SubTotal : Rs. {totalPrice}</div>
              <div>Delivery : Rs. 50</div>
              <div>Total Price : {totalPrice + 50}</div>
            </div>
            <div className = 'cart-container' style = {{ margin : '10px auto'}}>
              <button onClick = {CheckLogin}>Pay Now</button>
            </div>
          </div> 
          ) : ''}
      </div>
    </div>
  )
}

export default Cart