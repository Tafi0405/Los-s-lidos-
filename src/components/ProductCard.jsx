import React from "react";
import "./ProductCard.css"

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <div className="image-container">
          <img src={product.image} alt={product.name} />
      </div>
      
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>${product.price}</span>
      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductCard;
