import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage = () => {
  const { t } = useLanguage();
  return (
    <AuthLayout 
      title="Selamat Datang Kembali"
      subtitle="Masuk ke akun Anda untuk melanjutkan perjalanan karier"
    >
      <Helmet>
        <title>{t.title?.login ? `${t.title.login} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
