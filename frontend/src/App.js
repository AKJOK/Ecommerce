import  {StrictMode} from 'react';
import './App.css';
import Navbar from '../src/components/Nav/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import LoginSignup from './pages/LoginSignup';
import Shop from './pages/Shop';
import men_banner from './components/Assets/Frontend_Assets/banner_mens.png';
import women_banner from './components/Assets/Frontend_Assets/banner_women.png';
import ShopCategory from './pages/ShopCategory';
import Products from './pages/Product'
import Cart from './pages/Cart'
function App() {
  return (
     <StrictMode>
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/product'>
            <Route path=':productId' element={<Products />} />  
          </Route>
          <Route path='/Cart' element={<Cart />} /> 
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
    </StrictMode>
  );
}

export default App;
