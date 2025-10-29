'use client';
import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth(); // Assume login needs username, email, password
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (formData) => {
    setIsLoading(true);
    setTimeout(() => { // Simulate API call
      try {
        login(formData.username, formData.email, formData.password);
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
       <AuthForm
         formType="login"
         onSubmit={handleLoginSubmit}
         isLoading={isLoading}
       />
    </div>
  );
}