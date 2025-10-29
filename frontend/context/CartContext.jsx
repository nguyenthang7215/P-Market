'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

// Helper to get initial cart safely
const getInitialCart = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('pmarket-cart');
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) { console.error("Failed to parse cart", e); return []; }
  }
  return [];
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('pmarket-cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        toast.error(`${product.title} đã có trong giỏ!`);
        return prevItems;
      } else {
        toast.success(`Đã thêm ${product.title} vào giỏ!`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    toast.success('Đã xóa sản phẩm khỏi giỏ.');
  };

  const updateQuantity = (productId, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity, 10) || 1); // Ensure it's a positive integer >= 1
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const value = { cartItems, addToCart, removeFromCart, updateQuantity, itemCount: cartItems.length };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};