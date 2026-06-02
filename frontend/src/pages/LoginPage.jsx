import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout 
      title="Selamat Datang Kembali"
      subtitle="Masuk ke akun Anda untuk melanjutkan perjalanan karier"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
