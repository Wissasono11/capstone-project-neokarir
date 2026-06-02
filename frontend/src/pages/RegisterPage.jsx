import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import RegisterForm from '../features/auth/components/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayout 
      title="Buat Akun Anda"
      subtitle="Mulai perjalanan karier Anda"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
