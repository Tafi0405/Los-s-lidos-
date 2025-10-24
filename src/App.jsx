import React, { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ConfirmationScreen from "./components/ConfirmationScreen";
import "./App.css";

// =================================================================
// 20 Productos (Electrónica y Ropa)
// =================================================================
const initialProducts = [
  // --- Electrónica ---
  { id: 1, name: "Osciloscopio Digital", price: 350, description: "Herramienta esencial para medición de señales.", image: "/assets/fotos/osciloscopio.jpg" },
  { id: 2, name: "Microcontrolador ATmega328P", price: 5, description: "El corazón de proyectos Arduino.", image: "/assets/fotos/atmega.jpg" },
  { id: 3, name: "Kit de Resistencias", price: 12, description: "Caja surtida de precisión (1/4W).", image: "/assets/fotos/resistencias.jpg" },
  { id: 4, name: "Multímetro Profesional", price: 45, description: "Mide voltaje, corriente y continuidad.", image: "/assets/fotos/multimetro.jpg" },
  { id: 5, name: "Display OLED 0.96\"", price: 8, description: "Pantalla compacta de alta resolución.", image: "/assets/fotos/oled.jpg" },
  { id: 6, name: "Protoboard 830 Puntos", price: 7, description: "Base para el prototipado sin soldadura.", image: "/assets/fotos/protoboard.jpg" },
  { id: 7, name: "Sensor de Humedad DHT11", price: 3, description: "Mide temperatura y humedad relativa.", image: "/assets/fotos/dht11.jpg" },
  { id: 8, name: "Diodos Zener Surtidos", price: 10, description: "Reguladores de voltaje en distintos valores.", image: "/assets/fotos/diodos.jpg" },
  { id: 9, name: "Cable Dupont Macho-Macho", price: 6, description: "Paquete de 40 cables para conexiones.", image: "/assets/fotos/dupont.jpg" },
  { id: 10, name: "Fuente de Alimentación Regulable", price: 150, description: "Fuente de corriente continua (0-30V).", image: "/assets/fotos/fuente_regulable.jpg" },
  // --- Ropa Elegante ---
  { id: 11, name: "Traje de Lana Merina", price: 550, description: "Corte Slim Fit, color azul noche.", image: "/assets/fotos/traje.jpg" },
  { id: 12, name: "Vestido de Noche (Seda)", price: 420, description: "Diseño A-line, bordado minimalista.", image: "/assets/fotos/vestido.jpg" },
  { id: 13, name: "Mocasines de Cuero Italiano", price: 180, description: "Acabado brillante y suela antideslizante.", image: "/assets/fotos/mocasines.jpg" },
  { id: 14, name: "Cinturón Piel de Cocodrilo", price: 110, description: "Accesorio de lujo con hebilla plateada.", image: "/assets/fotos/cinturon.jpg" },
  { id: 15, name: "Camisa de Lino Egipcio", price: 90, description: "Frescura y elegancia para climas cálidos.", image: "/assets/fotos/camisa.jpg" },
  { id: 16, name: "Gemelos de Acero Inoxidable", price: 65, description: "Diseño geométrico minimalista.", image: "/assets/fotos/gemelos.jpg" },
  { id: 17, name: "Bolso de Mano Clásico", price: 280, description: "Cuero vegano, cierre magnético y cadena dorada.", image: "/assets/fotos/bolso.jpg" },
  { id: 18, name: "Reloj de Pulsera Automático", price: 750, description: "Caja de titanio y movimiento japonés.", image: "/assets/fotos/reloj.jpg" },
  { id: 19, name: "Bufanda de Cachemira", price: 120, description: "Suave y cálida, color gris perla.", image: "/assets/fotos/bufanda.jpg" },
  { id: 20, name: "Chaqueta de Tweed Clásica", price: 320, description: "Estructura sólida y ajuste a medida.", image: "/assets/fotos/chaqueta_tweed.jpg" },
];
// =================================================================

function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  // Estado para la navegación: 'shop' o 'confirm'
  const [screen, setScreen] = useState('shop'); 

  // Lógica del Carrito (Add)
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

  // Lógica del Carrito (Remove)
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

  // Lógica del Carrito (Clear)
  const clearCart = () => {
    setCart([]);
  };

  // --- Lógica de Finalización de Compra (Clave) ---
  const handleCheckout = () => {
    if (cart.length > 0) {
      setScreen('confirm'); // Cambia a la pantalla de confirmación
    } else {
      alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
    }
  };

  const handleReturnToShop = () => {
    setCart([]); // Vacía el carrito al volver a la tienda
    setScreen('shop'); // Vuelve a la pantalla principal
  };

  return (
    <>
      <Header />
      {/* Renderizado Condicional */}
      {screen === 'shop' ? (
        // Pantalla de la Tienda
        <main className="main-content">
          <ProductList products={products} addToCart={addToCart} />
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            // Pasamos la función handleCheckout como prop
            handleCheckout={handleCheckout} 
          />
        </main>
      ) : (
        // Pantalla de Confirmación
        <ConfirmationScreen handleReturnToShop={handleReturnToShop} />
      )}
    </>
  );
}

export default App;