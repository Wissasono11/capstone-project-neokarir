import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import ResetPasswordForm from '../features/auth/components/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <AuthLayout 
      title="Atur Ulang Password"
      subtitle="Buat password baru untuk akun Anda"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
