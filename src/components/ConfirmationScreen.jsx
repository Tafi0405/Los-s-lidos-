import React, { useState, useEffect } from 'react';
import './ConfirmationScreen.css'; // ¡Importa el nuevo CSS!

function ConfirmationScreen({ handleReturnToShop }) {
  // Estado para simular la carga: 'loading', 'success'
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    // Simular un proceso de finalización de compra que dura 2 segundos
    const timer = setTimeout(() => {
      setStatus('success'); // Cambia a 'success' después de 2 segundos
    }, 2000);

    // Función de limpieza para evitar fugas de memoria
    return () => clearTimeout(timer);
  }, []); // El array vacío asegura que el useEffect se ejecute solo una vez al montar

  return (
    <div className="confirmation-container">
      {status === 'loading' ? (
        <div className="loading-state">
          <h2>Procesando Compra...</h2>
          <div className="spinner"></div> {/* El spinner se define en el CSS */}
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