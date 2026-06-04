import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import AuthLayout from '../layouts/AuthLayout';
import ResetPasswordForm from '../features/auth/components/ResetPasswordForm';

const ResetPasswordPage = () => {
  const { t } = useLanguage();
  return (
    <AuthLayout 
      title="Atur Ulang Password"
      subtitle="Buat password baru untuk akun Anda"
    >
      <Helmet>
        <title>{t.title?.resetPassword ? `${t.title.resetPassword} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
