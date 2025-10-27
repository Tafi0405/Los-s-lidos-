import React, { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ConfirmationScreen from "./components/ConfirmationScreen"; 
import "./App.css";

const initialProducts = [
  { id: 1, name: "Osciloscopio Digital", price: 350, description: "Dispositivo de medición y análisis avanzado.", image: "/productos/xds2102a-owon-cosmel.png" },
  { id: 2, name: "Microcontrolador ATmega328P", price: 5, description: "Unidad de procesamiento esencial para proyectos.", image: "/productos/139655179.png" },
  { id: 3, name: "Kit de Resistencias", price: 12, description: "Surtido de componentes para control de flujo eléctrico.", image: "/productos/IMG_1253.png" },
  { id: 4, name: "Multímetro Profesional", price: 45, description: "Instrumento universal para pruebas eléctricas.", image: "/productos/testo-multimeter-product-range.png" },
  { id: 5, name: "Display OLED 0.96\"", price: 8, description: "Módulo compacto de visualización digital.", image: "/productos/2534_1_H.png" },
  { id: 6, name: "Protoboard 830 Puntos", price: 7, description: "Plataforma para prototipado sin soldadura.", image: "/productos/610.png" },
  { id: 7, name: "Sensor de Humedad DHT11", price: 3, description: "Componente para el monitoreo de variables ambientales.", image: "/productos/DHT11-300x289.png" },
  { id: 8, name: "Diodos Zener Surtidos", price: 10, description: "Conjunto de reguladores de voltaje de precisión.", image: "/productos/kit-diodos-zener-2-500x500.png" },
  { id: 9, name: "Cable Dupont Macho-Macho", price: 6, description: "Juego de cables para interconexiones sólidas.", image: "/productos/603916cff36ad.png" },
  { id: 10, name: "Fuente de Alimentación Regulable", price: 150, description: "Dispositivo para suministro de energía controlada.", image: "/productos/spe1.png" },
  { id: 11, name: "Traje de Lana Merina", price: 550, description: "Conjunto de vestimenta formal y de alta calidad.", image: "/productos/without_model_small.png" },
  { id: 12, name: "Vestido de Noche (Seda)", price: 420, description: "Prenda de ocasión especial con diseño exclusivo.", image: "/productos/640.png" },
  { id: 13, name: "Mocasines de Cuero Italiano", price: 180, description: "Calzado clásico de estilo, confort y durabilidad.", image: "/productos/6.png" },
  { id: 14, name: "Cinturón Piel de Cocodrilo", price: 110, description: "Accesorio de marroquinería de lujo y distinción.", image: "/productos/WB297-LCL395X_1N001_OS_A.png" },
  { id: 15, name: "Camisa de Lino Egipcio", price: 90, description: "Prenda superior de tela liviana y transpirable.", image: "/productos/folded_small.png" },
  { id: 16, name: "Gemelos de Acero Inoxidable", price: 65, description: "Detalle metálico para realzar cualquier vestimenta.", image: "/productos/images.jpeg" },
  { id: 17, name: "Bolso de Mano Clásico", price: 280, description: "Cartera elegante con amplio espacio interior.", image: "/productos/220tf-canela-suela-frente-600x600.png" },
  { id: 18, name: "Reloj de Pulsera Automático", price: 750, description: "Cronómetro de movimiento mecánico y diseño robusto.", image: "/productos/images (2).jpeg" },
  { id: 19, name: "Bufanda de Cachemira", price: 120, description: "Accesorio textil para confort y abrigo.", image: "/productos/echarpe-moire-aubergine-1_740x.png" },
  { id: 20, name: "Chaqueta de Tweed Clásica", price: 320, description: "Prenda exterior con textura y acabado sólido.", image: "/productos/without_model_small (1).png" },
];

function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [screen, setScreen] = useState('shop');

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (idToRemove) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === idToRemove);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === idToRemove
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== idToRemove);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      setScreen('confirm');
    } else {
      alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
    }
  };

  const handleReturnToShop = () => {
    setCart([]);
    setScreen('shop');
  };

  return (
    <>
      <Header />
      {screen === 'shop' ? (
        <main className="main-content">
          <ProductList products={products} addToCart={addToCart} />
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            handleCheckout={handleCheckout}
          />
        </main>
      ) : (
        <ConfirmationScreen handleReturnToShop={handleReturnToShop} />
      )}
    </>
  );
}

export default App;
