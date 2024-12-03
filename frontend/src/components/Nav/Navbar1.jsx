import React, { useContext, useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import logo from '../Assets/Frontend_Assets/logo.png'
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png'
import { ShopContext } from '../../context/ShopContext'
import nav_dropdown from  '../Assets/Frontend_Assets/dropdown_icon.png'
const Navbar1 = () => {

      const [menu,setmenu] = useState("shop")
      const {getTotalCartItems} = useContext(ShopContext);
      const dropdown_toggle = (e) =>{
            menuRef.current.classList.toggle('nav-menu-visible');
            e.target.classList.toggle('open');
      }
      const menuRef = useRef()

  return (
    <div className='navbar'>
         <div class='nav-logo'>
            <img src={logo} alt="" />
            <p>SHOPPER</p>
         </div>
         <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
         <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setmenu("shop")}}><Link style={{textDecoration:'none'}}   to='/'>Shop</Link> {menu==="shop"?<hr/>:<></>} </li>
            <li onClick={()=>{setmenu("men")}}><Link style={{textDecoration:'none'}}   to='/men'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
            <li onClick={()=>{setmenu("women")}}><Link style={{textDecoration:'none'}}    to='/women'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
            
         </ul>
         <div className='nav-login-cart'>
            {localStorage.getItem('auth-token')? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
               <Link to='/login'><button>Login</button></Link>}
                <Link to='/Cart'> <img src={cart_icon} alt="" /> </Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>   
         </div>
    </div>
  )
}

export default Navbar1;
