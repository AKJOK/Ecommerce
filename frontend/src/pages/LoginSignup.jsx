import { useState, React } from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {

   const [state,setState] = useState("Login")
      const [formData,setFormData] = useState({
        username:"",
        password:"",
        email:"",
      }) 
   const changeHandler = (e)=>{
              setFormData({...formData,[e.target.name]:e.target.value})
   }

    const login = async () =>{
         console.log("login function executed",formData)
         let responseData;
      await fetch('http://localhost:4000/login',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response)=>response.json()).then((data)=>responseData=data)

      if(responseData.success){
         localStorage.setItem('auth-token',responseData.token);
         window.location.replace("/");
      }
      else{
        alert(responseData.errors)
      }
    }
    const  signup = async () =>{
      console.log("signup function executed",formData)
      let responseData;
      await fetch('http://localhost:4000/signup',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response)=>response.json()).then((data)=>responseData=data)

      if(responseData.success){
         localStorage.setItem('auth-token',responseData.token);
         window.location.replace("/");
      }
      else{
        alert(responseData.errors)
      }
    }


  return (
    <div className='loginsignup'>
        <div className="loginSignup-container">
            <h1>{state}</h1>
             <div className="loginsignup-fields">
                  {state ==="Sign Up"? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
                  <input type="email" name='email' onChange={changeHandler} value={formData.email} placeholder='Email Address' />
                  <input type="password"  name='password' onChange={changeHandler} value={formData.password} placeholder='password' />
             </div>
             <button onClick={()=>{state==="login"?login():signup()}}>Coninue</button>
             {state==="Sign Up"?<p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}} style={{cursor:'pointer'}}>Login</span></p>: 
             <p className="loginsignup-login">Create an account?<span onClick={()=>{setState("Sign Up")}} style={{cursor:'pointer'}}>Click here</span></p>}
      
              <div className="loginsignup-agree">
                 <input type="checkbox" name="" id="" />
                 <p>By continuing, i agree to the terms of use & privacy policy</p>
              </div>
        </div>
    </div>
  )
}

export default LoginSignup
