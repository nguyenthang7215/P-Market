'use client';
import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm'; // Import AuthForm
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'; // Import toast
import { useRouter } from 'next/navigation'; // Import router for redirect


export default function RegisterPage() {
  const { register } = useAuth(); // Assuming register function in AuthContext
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Initialize router

  const handleRegisterSubmit = (formData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
       try {
        console.log('Registering (simulated):', formData);
        register(formData); // Call register function from context
        toast.success('Đăng ký thành công!');
        // Redirect handled by register function in AuthContext
       } catch (error) {
         console.error("Registration error (simulated):", error);
         toast.error('Đăng ký thất bại. Vui lòng thử lại.');
         setIsLoading(false); // Stop loading on error
       }
    }, 1500); // 1.5 second delay
  };

  return (
    <AuthForm
      formType="register"
      onSubmit={handleRegisterSubmit}
      isLoading={isLoading}
    />
  );
}