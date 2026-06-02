import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import ForgotPasswordForm from '../features/auth/components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout 
      title="Lupa Password?"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
