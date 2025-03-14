import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const AuthURL = 'http://localhost:4000';

const AuthPage = () => {

  if(localStorage.getItem('auth')) {
    return <Navigate to={'/'} />
  }

  // toggle to the login and signup
  const [ SignUp, setSignUp] = useState(false);
  // store the signup value in one state
  const [ newSignUp, setNewSignUp ] = useState({
    fullname : '',
    email : '',
    password : ''
  })
  // store the login value in one state
  const [ login, setLogin ] = useState({
    email : '',
    password : ''
  })
  // if user is not Authenticated or user is already signup
  const [ notAuth, setNotAuth ] = useState(false);

  // to change between login and signup 
  const toggleForm = () => {
    setSignUp(!SignUp);
  };
  // submit the login authentication and if user authenticate navigate to home
  const loginForm = async(e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${AuthURL}/login`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(login)
      })      
      const name   = await data.json();
      if(data.ok) {
        setNotAuth(false);
        setSignUp(true);
        localStorage.setItem('auth',JSON.stringify(name . fullname));
        window.location.replace('/');
      }
      else {
        setNotAuth(true);
      }
    }
    catch(e) {      
      console.log(e);
    }    
  }
  // store the login details in one state 
  // this method storing all value in one state learned from youtube
  const loginDetail = (e) => {    
    setLogin( (prev) => ({
      ...prev,      
      [e.target.name ]  : e.target.value
    }))
  }
  // store the signup details in one state 
  // this method storing all value in one state learned from youtube
  const signupDetail = (e) => {
    setNewSignUp( (prev) => ({
      ...prev,      
      [e.target.name ]  : e.target.value
    }))    
  }
  
  // submit the signup and if user signup navigate to login
  const signupForm = async(e) => {
    e.preventDefault();    
    try {
      const data = await fetch(`${AuthURL}/signup`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(newSignUp)
      })
      if(data.ok) {
        setSignUp(!SignUp);
        setNotAuth(false);
        return <Navigate to = {'/login'} />
      }
      else {
        setNotAuth(true);
      }
    }
    catch(e) {      
      console.log(e);
    }    
  }
  
  return (
    <>
      <div style = {{ textAlign : 'center', marginTop : '15px', marginBottom : '-30px' }}>
        <img src = "logo.png" alt = "" width = '300px'/>
      </div>
      <div style = {{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
      className = 'login-container'
      >
        <div style = {{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          width: "350px",
          }}
          className = "box-shadowing"
          >
            <h2 style = {{ display: "flex", flexDirection: "column" }}>             
              { SignUp ? "Sign Up" : "Login" } 
            </h2>
            { !SignUp ? (
              <form style = {{ display: "flex", flexDirection: "column", }} onSubmit = {loginForm} >
                    <input type = "email" placeholder = "Email" required name = "email" onChange = {loginDetail} value = {login.email} />
                    <input type = "password" placeholder = "Password" required name = "password" onChange = {loginDetail} value = {login.password} />
                    { notAuth ? 
                        <p style = {{ margin : '0px', textAlign : 'start', color : 'red'}}>
                            Email or Password is invalid.
                        </p> : 
                        <p style = {{ margin : '0px'}}></p> 
                    }
                    <button type = "submit" > { SignUp ? "Sign Up" : "Login" } </button>
              </form>
            ) : ''}
            { SignUp ? ( 
              <form style = {{ display: "flex", flexDirection: "column" }} onSubmit = {signupForm} >                
                  <input type = "text" placeholder = "Full Name" required name = "fullname" onChange = {signupDetail} value = {newSignUp.fullname} />
                  <input type = "email" placeholder = "Email" required name = "email" onChange = {signupDetail} value = {newSignUp.email} />
                  <input type = "password" placeholder = "Password" required name = "password" onChange = {signupDetail} value = {newSignUp.password} />
                  { notAuth ? 
                        <p style = {{ margin : '0px', textAlign : 'start', color : 'red'}}>
                            User already exists.
                        </p> : 
                        <p style = {{ margin : '0px'}}></p> 
                  }
                  <button type = "submit" > { SignUp ? "Sign Up" : "Login" } </button>
              </form> 
            ) : '' }
            <p className = "switch-text" >
              { SignUp ? "Already have an account?" : "Don't have an account?"}
              <span onClick = {toggleForm} className = "toggle-link" >
                { SignUp ? "Login" : "Sign Up" }
              </span>
            </p>
            <Link to = "/" className = "home-link"> Back to Home</Link>
        </div>
      </div>
    </>
  );
};


export default AuthPage;
