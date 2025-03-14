import React, { useContext, useState } from "react";
import Imageslider from "../components/Imageslider";
import { useEffect } from "react";
import Products from "../components/Products";
import CartProvider, { CartContext } from "../context/CartContext";

let getProducts = "http://localhost:4000";
const Dashboard = () => {

  // store the categories list like - mobiles, laptops, television etc...
  const [ categoriesList, setCategoriesList ] = useState([]);
  // store products with page nation list or based on categories choose  
  const [products, setProducts] = useState([]);
  // store selected Category
  const [selectedCategory, setSelectedCategory] = useState("");
  // store Brand list to show and filter in the filter option using select tag.
  const [brandsList, setBrandsList] = useState("");
  // store Model list to show and filter in the filter option using select tag.
  const [modelsList, setModelsList] = useState("");
  // store Price list to show and filter in the filter option using select tag.
  const [priceList, setPriceList] = useState("");
  
  // store all the filter products based on filter choosed.
  const [filterProducts, setFilterProducts] = useState("");
  // Use Context for count the Cart product and show
  const { setCartProduct } = useContext(CartContext);
  
  // Mobile screen filter container 
  // If click the categories it show the container
  const [ displayFilter, setDisplayFilter] = useState(false);
  // For page nation 
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetch(`${getProducts}/categories`);
        if(data.ok) {
          let dataValue = await data.json();
          setCategoriesList(dataValue[0].categories)          
          FetchLimitProducts()        
        }
        else {
          setCategoriesList(true)
        }
      } 
      catch(e) {
        console.log(e)
      }
    };
    
      fetchData();
  }, [currentPage]);

  // fetch product with page nation 
  // 
  const FetchLimitProducts = async() => {
    try {
      let data = await fetch(`${getProducts}/get-limit-products?page=${currentPage}&pageSize=10`);
        if(data.ok) {
          let dataValue = await data.json();
          
          setProducts(dataValue.products)
          setTotalPages(dataValue.totalPage)
        }
    }
    catch(e) {
      console.log(e)
    }
  }

  const handlePrevPage = () => {
    window.scrollTo({ top : 550, behavior : 'smooth'})
    if(currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
    // FetchLimitProducts()
  }
  const handleNextPage = () => {
    window.scrollTo({ top : 550, behavior : 'smooth'});
    if(currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
    // FetchLimitProducts()
  }

  // console.log(products)
  const FindScroll = () => {
    if(window.scrollY > 2300 && window.scrollY < 2301) {
      setCurrentPage(currentPage + 1)
    }
    FetchLimitProducts()
  }
  console.log(currentPage)


  // select category product to filter and filter brand list based one category
  const ShowCategoriesProducts = async(e) => {
    try {
        let category = e.target.value
        let data = await fetch(`${getProducts}/category/${category}`);
        if(data.ok) {
          let dataValue = await data.json();
          setProducts(dataValue)        
          setBrandsList( [ ...new Set( dataValue.map((item) => item.brand)) ]);
        }
        else {
          setProducts(true);
        }
    }
    catch(e) {
      console.log(e);
    }
    setSelectedCategory(e.target.value);
  };

  // show selected brand of the selected category and filter model in the brand
  const ShowSelectedBrand = (e) => {
    if(e.target.value) {
      setFilterProducts(products.filter( (item) => item.brand === e.target.value ));
    }
    else {
      setFilterProducts(products);
    }
    // setModelsList(e.target.value);
    setModelsList( [ ...new Set( products.filter( (item) => item.brand === e.target.value ).map((item) => item.name))]);
  };
  
  // show selected model of the brand and filter price in the model
  const ShowSelectedModel = (e) => {
    setFilterProducts(products.filter((item) => item.name === e.target.value));
    setPriceList( [ ...new Set( products.filter( (item) => item.name === e.target.value).map( (item) => item.price) ) ]);
  };

  // show model price and filter the product
  const ShowSelectedPrice = (e) => {
    setFilterProducts(products.filter( (item) => item.price === Number(e.target.value) ));
  };

  // showing products list with filter and without filter
  let showProducts = filterProducts.length ? filterProducts : products;
  
  // store product id in localstorage
  const AddtoCart = (e) => {
    let id = e.target.value;
    setCartProduct((prev) => [ ...prev, id ]);
    // localStorage.setItem("cart", JSON.stringify(value));
  };
  // showing categories in the categories section
  // let categories = [...new Set(products.map((item) => item.category))];

  const [ createProduct, setCreateProduct ] = useState({
    name : "",
    category : "",
    brand : "",
    price : "",
    description : "",
    picture : "",
    warranty : ""
  })

  const CreateNewProduct = async(e) => {
    e.preventDefault();
    try {
      let data = await fetch(`${getProducts}/create-product`, {
        method : 'POST',
        headers : { "Content-Type" : "application/json" },

        body : JSON.stringify(createProduct)
      });
      if(data.ok) {
        setProducts([...products, createProduct])
      }
      else {
        console.log("Product is not created.")
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  const insertValForProduct = (e) => {
    setCreateProduct(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  return (
    <div>
      <Imageslider />
      <section
        style = {{
          borderTop: "1px solid grey",
        }}
        className = "categories-opt"
      >
        <div
          style = {{
            maxWidth: "100%",
            padding: "15px 0",
            backgroundColor: "#121212",
            color: "white",
          }}
        >
          <div
            className = "filter-container-div"
            
            style = {{ 
              margin: "0px auto",
            }}
          >
            <div className = "categories-filter" style = {{ justifyContent : 'space-between', alignItems : 'center'}} onClick={ () => setDisplayFilter(!displayFilter) }>
              <p> Filter </p>
              <div style = {{ width : '20px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </div>              
            </div>

            <div className = "categories-filter" style = {{ display : displayFilter ? 'block' : 'none' }}>
              <div>
                Categories :
                <select name = "" id = "" onChange = {ShowCategoriesProducts}>
                  <option value = "" style = {{ backgroundColor : '#121212' }}> -- </option>
                    { categoriesList?.map( (item, index) => (
                      <option
                        key = { index }
                        value = { item }
                        style = {{ backgroundColor : '#121212' }}
                      >                
                      {item}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                Filter :
                <select name = "" id = "" onChange = {ShowSelectedBrand}>
                  <option value = "" style = {{ backgroundColor : '#121212' }} >--</option>
                    {brandsList ? brandsList?.map( (item, index) => (
                            <option value={item} key={index} style = {{ backgroundColor : '#121212' }}>                            
                              {item}
                            </option>
                    )) : ""}
                </select>
                
                <select name = "" id = "" onChange = {ShowSelectedBrand}>
                  <option value = "" style = {{ backgroundColor : '#121212' }}>--</option>
                    {modelsList ? modelsList?.map( (item, index) => (
                          <option value={item} key={index} style = {{ backgroundColor : '#121212' }}>
                            {item}
                          </option>
                    )) : ""}
                </select>

                <select name = "" id = "" onChange = {ShowSelectedPrice}>
                  <option value = "" style = {{ backgroundColor : '#121212' }}>--</option>
                    {priceList ? priceList?.map( (item, index) => (
                        <option value={item} key={index} style = {{ backgroundColor : '#121212' }}>
                          Rs. {item}
                        </option>
                    )) : ""}
                </select>
              </div>
            </div>            
            
            <div className = "big-screen-categories" style = {{margin : '0 auto', width : '500px'}}>
              { categoriesList?.map( (item, index) => (
                <button
                  key = {index}
                  style = {{ all : 'unset', cursor: "pointer", margin : '0px 15px'}}
                  value = {item}
                  onClick = {ShowCategoriesProducts}
                >                
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className = "filter-products-container" >
          <div
            style = {{
              backgroundColor: "inherit",
              width: "230px",
              height: "380px",
              margin: "0px 0px",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            className = "box-shadowing mb-container"
          >
            <div>
              <div
                style = {{
                  borderBottom: "1px solid grey",
                  width: "100%",
                  padding: "10px 12px",
                  boxSizing: "border-box",
                }}
              >
                <h3 style = {{ margin: "0", fontWeight: 500 }}>Categoies</h3>
              </div>
              <p 
                style = {{
                  margin: "5px 0",
                  fontWeight: 400,
                  padding: "10px 15px",
                }}
              >
                {selectedCategory}
              </p>
            </div>
            <div style = {{ borderTop: "1px solid grey", margin: "0px 0px 15px", }} >
              <label htmlFor = "" style = {{ display: "block", padding: "10px 15px 10px 15px", }} className = "custom-label" >
                Brands
              </label>
              <div style = {{ textAlign : 'center'}}>
                <select
                  className = "custom-select"
                  name = ""
                  id = ""
                  onChange = {ShowSelectedBrand}
                >
                  <option value = "">--</option>
                  { brandsList ? brandsList?.map( (item, index) => (
                        <option value = {item} key = {index}>
                          {item}
                        </option>
                  )) : ""}
                </select>
              </div>
            </div>

            <div style = {{ borderTop: "1px solid grey", margin: "0px 0px 15px", }} >
              <label htmlFor = "" style = {{ display: "block", padding: "10px 15px 10px 15px", }} className="custom-label" >
                Models
              </label>
              <div style = {{ textAlign : 'center'}} >
                <select
                  name=""
                  id=""
                  className="custom-select"
                  onChange={ShowSelectedModel}
                >
                  <option value="">--</option>
                  { modelsList ? modelsList?.map( (item, index) => (
                        <option value = {item} key = {index}>                          
                          {item}
                        </option>
                  )) : ""}
                </select>
              </div>
            </div>

            <div style = {{ borderTop: "1px solid grey", margin: "0px 0px 15px", }} >
              <label htmlFor = "" style = {{ display: "block", padding: "0px 15px 10px 15px", margin: "15px 0px 0px", }} className="custom-label" > 
                Price List
              </label>
              <div style = {{ textAlign : 'center'}}>
                <select 
                  className = "custom-select"
                  name = ""
                  id = ""
                  onChange = {ShowSelectedPrice}
                >
                  <option value = "">--</option>
                  { priceList ? priceList?.map( (item, index) => (
                        <option value = {item} key = {index}>
                          Rs. {item}
                        </option>
                  )) : ""}
                </select>
              </div>
            </div>
          </div>

          <div className = "box-shadowing rs-container">
            <div>
              <h2> {selectedCategory} </h2>              
              <Products showProducts = { showProducts } AddtoCart = {AddtoCart} />
            </div>
          { !selectedCategory ? (      
            <div style = {{ display : 'flex', justifyContent : 'space-between', paddingTop : '35px' }}>
              <div>
                <button style = {{ display : currentPage === 1 ? 'none' : 'block', width : '100px' }} onClick = {handlePrevPage} disabled = {currentPage === 1} >Prev Page</button>
              </div>
              <div>
                <button style = {{ display : currentPage === totalPages ? 'none' : 'block', width : '100px' }} onClick = {handleNextPage} disabled = {currentPage === totalPages} >Next Page</button>
              </div>
            </div>
          ) : ''}
          </div>
          
        </div>
      </section>
      <div style = {{ margin: '10px auto' }}>
        <form style = {{ display : 'flex', flexDirection : 'column', width : '300px' }} onSubmit = {CreateNewProduct}>
          <input style = {{ margin: '5px 0px' }} required type = "text" placeholder = "Model Name" name = "name" value = {createProduct.name} onChange = {insertValForProduct} />
          <input style = {{ margin: '5px 0px' }} required type = "text" placeholder = "Category" name = "category" value = {createProduct.category} onChange = {insertValForProduct} />
          <input style = {{ margin: '5px 0px' }} required type = "text" placeholder = "Brand" name = "brand" value = {createProduct.brand} onChange = {insertValForProduct} />
          <input style = {{ margin: '5px 0px' }} required type = "number" placeholder = "price" name = "price" value = {createProduct.price} onChange = {insertValForProduct} />
          <input style = {{ margin: '5px 0px' }} required type = "text" placeholder = "Description" name = "description" value = {createProduct.description} onChange = {insertValForProduct} />
          <input style = {{ margin: '5px 0px' }} required type = "text" placeholder = "Picture" name = "picture" value = {createProduct.picture} onChange = {insertValForProduct} />
          <input style = {{ margin: '5px 0px' }} required type = "text" placeholder = "Warranty" name = "warranty" value = {createProduct.warranty} onChange = {insertValForProduct} />
          <button type = "submit" style = {{}}>Upload Product</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
