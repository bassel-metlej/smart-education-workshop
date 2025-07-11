import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import type { CartContextType, CartState, CartItem, Product } from './types';

// Action types for useReducer
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity if it already exists in the cart
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        // Update the total items and price of the cart
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (product.price * quantity),
        };
      } else {
        // Add new item
        const newItem: CartItem = { product, quantity };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (product.price * quantity),
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload;
      const itemToRemove = state.items.find(item => item.product.id === productId);
      
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== productId),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.product.price * itemToRemove.quantity),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.product.id === productId);
      
      if (itemIndex === -1) return state;
      
      const item = state.items[itemIndex];
      const quantityDifference = quantity - item.quantity;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - (item.product.price * item.quantity),
        };
      }
      
      const updatedItems = [...state.items];
      updatedItems[itemIndex] = { ...item, quantity };
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
        totalPrice: state.totalPrice + (item.product.price * quantityDifference),
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Memoized actions to prevent unnecessary re-renders
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getItemQuantity = useCallback((productId: number) => {
    const item = state.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }, [state.items]);

  // Memoized context value
  const contextValue = useMemo<CartContextType>(() => ({
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
  }), [state, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 