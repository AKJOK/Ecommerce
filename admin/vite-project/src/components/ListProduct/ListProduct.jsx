import React, { useEffect, useState } from "react"; 
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/allproducts");
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };


  useEffect(() => {
    fetchInfo();
  }, []);

    const remove_product = async()=>{
        await fetch('http://localhost:4000/removeproduct',{
             method:'POST',
             headers:{
                 Accept:'application/json',
                 'Content-Type':'application/json',
             },
             body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }


  return (
    <div className="list-product">
      <h1>All Products</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {isLoading ? (
          <p>Loading products...</p>
        ) : allProducts.length > 0 ? (
          allProducts.map((product, index) => (
             <>
            <div key={product.id || index} className="listproduct-format-main listproduct-format">
              <img
                src={product.image}
                alt={product.name}
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                src={cross_icon}
                className="listproduct-remove-icon"
                alt="Remove"
                onClick={() => remove_product(product.id)} 
              />
            </div>
            <hr />
            </>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
