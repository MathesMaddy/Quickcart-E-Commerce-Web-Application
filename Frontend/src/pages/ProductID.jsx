import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CartProvider, { CartContext } from '../context/CartContext';


let productIdURL = 'http://localhost:4000/product'
const ProductID = () => {

  const { id } = useParams();
  const [ product, setProduct ] = useState('');
  const { setCartProduct } = useContext(CartContext);

  useEffect( () => {
    const FetchData = async() => {
      try {

        
        const fetchData = await fetch(`${productIdURL}/${id}`, {
          method : "GET",
          
          headers : {
            "Content-Type" : "application/json"
          }
        });
        if(fetchData.ok) {
          const data = await fetchData.json();
          setProduct(...data);
          console.log(data);
        }
        else {
          console.log('kasjdflkj');
        }
      }
      catch(e) {
        console.log(e);
      }
    }
    FetchData();
  }, []);

  console.log(product)
  const AddtoCart = (e) => {
    let id = e.target.value;
    console.log(id)
    let key = "cart";
    let value = JSON.parse(localStorage.getItem(key));
    if (!value) {
      value = [];
    }
    value.push(id);
    setCartProduct(value.length)
    localStorage.setItem("cart", JSON.stringify(value));
  };

  return (
    <div>
      <div className = 'product-container' >

        <div >
          <Link to = {'/'} style = {{ display : 'inline-flex', alignItems : 'center', gap : '10px'}}>
            <svg style = {{ width : '18px'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Home          
          </Link>
        </div>
        
        { product ? (

          <div className = 'image-description' >
          <div>
            <div style = {{ height : '80%'}}>
              <img className = 'image-banner' src = {product.picture} alt="" height= '100%'/>
            </div>
            <div style = {{ display : 'flex', justifyContent : 'space-evenly'}}>
              <img src = {product.picture} alt="" width='80px'/>
              <img src = {product.picture} alt="" width='80px'/>
              <img src = {product.picture} alt="" width='80px'/>
            </div>
          </div>
          <div>
            <div>
              <h2 style = {{ margin : '15px 0px 5px 0px', fontWeight: '300'}  }>{product.brand}</h2>
              <h2 style = {{ margin : '0px 0px 15px 0px', fontWeight: '400'}  }>{product.model}</h2>
            </div>
            <div style = {{ borderTop : '1px solid #e7e7e7', borderBottom : '1px solid #e7e7e7'}}>
              <div></div>
              <h3 style = {{ fontWeight: '500'}}>Rs. {product.price}</h3>
            </div>
            <div>
              <p style = {{ textAlign : 'justify' }}>{product.description}
              </p>
              <p >Warranty : {product.warranty} </p>
            </div>
            <div>
              <button onClick = {AddtoCart} value = {product.productId}>Add to Cart</button>

            </div>
          </div>
        </div>
        ) : <div style = {{ width : '100%'}}> Product is not Avaliable.</div> }
      </div>
    </div>
  )
}

export default ProductID