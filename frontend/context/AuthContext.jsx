'use client';
import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = chưa đăng nhập
  const router = useRouter();

  const login = (msv, password) => {
    // (Sau này gọi API backend)
    const fakeUser = { name: "Nguyễn Hữu Niêm", msv: msv, avatar: "/avatar.png" };
    setUser(fakeUser);
    router.push('/home'); // Chuyển hướng sau khi đăng nhập
  };

  const logout = () => {
    setUser(null);
    router.push('/');
  };

  const value = {
    user,
    isAuthenticated: !!user, // true nếu user khác null
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};