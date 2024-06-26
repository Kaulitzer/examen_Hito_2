import React, { useState } from 'react';
import { FaPaw } from 'react-icons/fa'; // Icono de la huella
import './CardVenta.css'; 
import { useCarrito } from './CarritoContext';

function CardVenta({ producto, addToFavorites }) {
  const {addItem}=useCarrito()
  const [favorito, setFavorito] = useState(false);

  // Función para manejar el click en el icono de favorito
  const toggleFavorito = () => {
    setFavorito(!favorito);
    addToFavorites(producto.id);
  };

  
  const agregarAlCarrito = () => {
    addItem(producto)
  };

  return (
    <div className="card-venta">
      <img src={producto.imagen_url} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <button onClick={() => { /* Navegación a DetalleProductoPage */ }}>Ver más</button>
      <button onClick={agregarAlCarrito}>Agregar al carrito</button>
      {/* <FaPaw className={`icono-favorito ${favorito ? 'favorito' : ''}`} onClick={toggleFavorito} /> */}
    </div>
  );
}

export default CardVenta;
