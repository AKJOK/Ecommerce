import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/Frontend_Assets/star_icon.png';
import star_dull_icon from '../Assets/Frontend_Assets/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={props.image} alt={props.name} />
                    <img src={props.image} alt={props.name} />
                    <img src={props.image} alt={props.name} />
                    <img src={props.image} alt={props.name} />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={props.image} alt={props.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{props.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_dull_icon} alt="star" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${props.old_price || '0.00'}</div>
                    <div className="productdisplay-right-prce-new">${props.new_price || '0.00'}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually knitted pullover shirt, close-fitting with a round neckline and short sleeves, worn as an undershirt or outerwear garment.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => { addToCart(props.id) }}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span> Women, T-Shirt, Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags :</span> Modern, Latest</p>
            </div>
        </div>
    );
}

export default ProductDisplay;
