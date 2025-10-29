'use client';
import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = (username, email, password) => {
    console.log("Login attempt:", { username, email, password });
    const fakeUser = { name: "Nguyễn Hữu Niêm", username, email, avatar: "/avatar.png" };
    setUser(fakeUser);
    router.push('/home'); // Redirect handled here
  };

  // Add register function
  const register = (formData) => {
    console.log("Register attempt (simulated):", formData);
    const fakeUser = { name: `${formData.firstName} ${formData.lastName}`, username: formData.username, email: formData.email, avatar: "/avatar.png" };
    setUser(fakeUser); // Log the user in immediately after registration (simulation)
    if (!formData.isExternal) {
      toast.info('Kiểm tra email PTIT để xác thực!');
      setTimeout(() => router.push('/home'), 2000); // Redirect after delay
    } else {
      toast.info('Kiểm tra email để nhận thông tin tài khoản PTIT!');
      setTimeout(() => router.push('/home'), 2000); // Redirect after delay
    }
  };


  const logout = () => { setUser(null); router.push('/'); };

  const value = { user, isAuthenticated: !!user, login, logout, register }; // Add register to value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};