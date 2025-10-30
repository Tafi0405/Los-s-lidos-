import React from "react";
import "./Cart.css";

function Cart({ cart, removeFromCart, clearCart, handleCheckout }) { 
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <aside className="cart">
      <h2>🛒 Carrito</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x{item.quantity} - ${item.price * item.quantity}
                <button onClick={() => removeFromCart(item.id)}>X</button>
              </li>
            ))}
          </ul>
          <p className="total">Total: ${total.toFixed(2)}</p>
          
          {/* Botón de Finalizar Compra (Nuevo) */}
          <button className="checkout-btn" onClick={handleCheckout}>
            Finalizar Compra
          </button>
          
          <button className="clear-btn" onClick={clearCart}>
            Vaciar carrito
          </button>
        </>
      )}
    </aside>
  );
}

export default Cart;