import React, { useState, useEffect } from 'react';
import './ConfirmationScreen.css';

function ConfirmationScreen({ handleReturnToShop }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="confirmation-container">
      {status === 'loading' ? (
        <div className="loading-state">
          <h2>Procesando Compra...</h2>
          <div className="spinner"></div>
          <p>Tu pedido está siendo enviado a nuestros sólidos servidores.</p>
        </div>
      ) : (
        <div className="success-state">
          <h1>¡Compra Finalizada con Éxito!</h1>
          <p>¡Gracias por tu pedido! Tus sólidos productos serán despachados pronto.</p>
          <button onClick={handleReturnToShop} className="back-to-shop-btn">
            Volver a la Tienda
          </button>
        </div>
      )}
    </div>
  );
}

export default ConfirmationScreen;
