import React from 'react'

const Footer = () => {
  return (
    <div className = 'footer-container' style = {{ 
        display : 'flex', 
        justifyContent : 'space-between', 
        alignItems : 'center', 
        backgroundColor : 'black', 
        color : 'white'
        }}>
        <div className='footer-container-inside'>
            <div>
                <img src="logo.png" alt="" style = {{ width : '200px'}} />
            </div>
            <div className = 'footer-msg' style = {{padding : '0px 0px 0px 12px'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aspernatur, voluptatum iure error nam molestias autem voluptatem animi nihil cumque itaque, recusandae sunt, veniam culpa inventore exercitationem odio blanditiis architecto.
            </div>
        </div>

        <div style = {{ display : 'flex', gap : '50px'}}>
            <div>
                <h2>Company</h2>
                <ul style = {{ listStyleType : 'none', padding : '0px'}}>
                    <li style = {{padding : '4px 0'}}>Home</li>
                    <li style = {{padding : '4px 0'}}>Cart</li>
                    <li style = {{padding : '4px 0'}}>About us</li>
                    <li style = {{padding : '4px 0'}}>Privacy policy</li>
                </ul>

            </div>
            <div>
                <h2>Get in Touch</h2>
                <ul style = {{ listStyleType : 'none', padding : '0px'}}> 
                    <li style = {{padding : '4px 0'}}>+91 </li>
                    <li style = {{padding : '4px 0'}}>contactquickcart@gmail.com</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer