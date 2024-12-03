import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/Frontend_Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
    const { product } = props;

    // Fallback if product or its properties are undefined
    const category = product?.category || 'Category';
    const productName = product?.name || 'Product Name';

    return (
        <div className="breadcrum">
            HOME <img src={arrow_icon} alt="arrow" /> SHOP <img src={arrow_icon} alt="arrow" /> 
            {category} <img src={arrow_icon} alt="arrow" /> {productName}
        </div>
    );
};

export default Breadcrum;
