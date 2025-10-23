'use client';
import React, { createContext, useState, useContext } from 'react';

// 1. Tạo Context
const WalletContext = createContext();

// 2. Tạo Provider (Component quản lý)
export function WalletProvider({ children }) {
  // --- NGUỒN SỰ THẬT DUY NHẤT LÀ ĐÂY ---
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Hàm kết nối ví (giả lập)
  const connectWallet = () => {
    return new Promise((resolve) => {
      console.log("Connecting wallet...");
      setTimeout(() => {
        const fakeAddress = "0x1a2b3c4d5e6f...9c8d";
        setIsConnected(true);
        setWalletAddress(fakeAddress);
        console.log("Wallet connected:", fakeAddress);
        resolve(true);
      }, 1000);
    });
  };

  const value = {
    isConnected,
    walletAddress,
    connectWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

// 3. Tạo hook để dễ sử dụng
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};