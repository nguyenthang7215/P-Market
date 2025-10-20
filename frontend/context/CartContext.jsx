'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Tạo Context
const CartContext = createContext();

// 2. Tạo Provider (Component bao bọc ứng dụng)
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Hàm thêm sản phẩm vào giỏ
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Nếu có, tăng số lượng (ví dụ) - hoặc không làm gì cả
        // return prevItems.map(item => 
        //   item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        // );
        alert(`${product.title} đã có trong giỏ hàng!`); // Thông báo đơn giản
        return prevItems;
      } else {
        // Nếu chưa có, thêm vào với số lượng 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    alert(`Đã thêm ${product.title} vào giỏ hàng!`);
  };

  // Hàm xóa sản phẩm khỏi giỏ
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };
  
  // (Bạn có thể thêm các hàm khác như cập nhật số lượng...)

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    itemCount: cartItems.length, // Số loại sản phẩm trong giỏ
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 3. Tạo hook để dễ sử dụng Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};