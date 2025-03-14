import React from 'react'
import { Link } from 'react-router-dom'


const Products = ({ AddtoCart, showProducts }) => {  
  return (
    <>
        <div className = "products-container">
            { showProducts ? showProducts.map( (item, index) => (
                <div key = {index} style = {{ width: "90%", display : 'flex', flexDirection : 'column', justifyContent : 'space-between' }}>
                    <Link to = { `/product/${item.productId}` }>
                      <div style = {{ textAlign: "center" }}>
                          <img width = "200px" src = {item.picture} alt = "" />
                      </div>
                    </Link>
                    
                    <div
                        style = {{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}>
                          <Link to = { `/product/${item.productId}` } >                          
                            <h2 style = {{ margin: "0", textAlign: "justify" }}>
                                { item.name }
                            </h2>
                          </Link>
                            <h3 style = {{ margin: "5px 0px" }}>
                                Rs. { item.price }
                            </h3>
                            <p
                              style = {{ margin: "5px 0px", textAlign: "justify" }}
                            >
                              { item.description }
                            </p>
                            <div>
                              <button value = { item.productId } onClick = { AddtoCart }>
                                Add to Cart
                              </button>
                            </div>
                      </div>
                </div>
            )) : ""}
        </div>
    </>
  )
}
export default Products