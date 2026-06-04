import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import AuthLayout from '../layouts/AuthLayout';
import ForgotPasswordForm from '../features/auth/components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  const { t } = useLanguage();
  return (
    <AuthLayout 
      title="Lupa Password?"
    >
      <Helmet>
        <title>{t.title?.forgotPassword ? `${t.title.forgotPassword} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
