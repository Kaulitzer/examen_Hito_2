import React, { createContext, useReducer, useContext } from 'react';

// Acciones
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const INCREMENT_ITEM = 'INCREMENT_ITEM';
const DECREMENT_ITEM = 'DECREMENT_ITEM';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Reducer para manejar acciones en el carrito
function carritoReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
        // Comprobar si el ítem ya está en el carrito
      const existingItem = state.items.find(item => item.id === action.item.id);
      if (existingItem) {
        // Si el ítem ya está en el carrito, incrementar su cantidad
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.item.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      } else {
        // Si el ítem no está en el carrito, agregarlo con una cantidad inicial de 1
        return {
          ...state,
          items: [...state.items, { ...action.item, cantidad: 1 }],
        };
      }
    case REMOVE_ITEM:
      // Agregar lógica para remover ítem
      return { ...state };
    case INCREMENT_ITEM:
      // Agregar lógica para incrementar cantidad de ítem
      return { ...state };
    case DECREMENT_ITEM:
      // Agregar lógica para decrementar cantidad de ítem
      return { ...state };
    default:
      return state;
  }
}

// Componente proveedor del contexto
export function CarritoProvider({ children }) {
  const [state, dispatch] = useReducer(carritoReducer, { items: [] });

  // Agregar item al carrito
  const addItem = (item) => {
    dispatch({ type: ADD_ITEM, item });
  };

  // Remover item del carrito
  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, id });
  };

  // Incrementar cantidad de un item
  const incrementItem = (id) => {
    dispatch({ type: INCREMENT_ITEM, id });
  };

  // Decrementar cantidad de un item
  const decrementItem = (id) => {
    dispatch({ type: DECREMENT_ITEM, id });
  };

  // Valor proporcionado por el contexto
  const value = { items: state.items, addItem, removeItem, incrementItem, decrementItem };

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
}


export function useCarrito() {
  return useContext(CarritoContext);
}
