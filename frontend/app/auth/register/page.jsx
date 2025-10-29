'use client';
import { useState } from 'react';
import AuthForm from '../../../components/auth/AuthForm'; // <-- Đường dẫn 2 chấm
import { useAuth } from '../../../context/AuthContext'; // <-- Đường dẫn 2 chấm
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegisterSubmit = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
       try {
        console.log('Registering (simulated):', formData);
        register(formData);
        toast.success('Đăng ký thành công! Kiểm tra email để xác thực.');
       } catch (error) {
         toast.error('Đăng ký thất bại.');
         setIsLoading(false);
       }
    }, 1500);
  };

  return (
    // Layout gốc (app/layout.jsx) sẽ xử lý căn giữa
     <AuthForm
       formType="register"
       onSubmit={handleRegisterSubmit}
       isLoading={isLoading}
     />
  );
}