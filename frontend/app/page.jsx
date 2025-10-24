'use client';
import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm'; // Import AuthForm
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'; // Import toast

export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (formData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      try {
        login(formData.msv, formData.password);
        toast.success('Đăng nhập thành công!');
        // No need to setIsLoading(false) here because navigation happens
      } catch (error) {
         console.error("Login error (simulated):", error);
         toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
         setIsLoading(false); // Stop loading on error
      }
    }, 1000); // 1 second delay
  };

  return (
    <AuthForm
      formType="login"
      onSubmit={handleLoginSubmit}
      isLoading={isLoading}
    />
  );
}