import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import AuthLayout from '../layouts/AuthLayout';
import RegisterForm from '../features/auth/components/RegisterForm';

const RegisterPage = () => {
  const { t } = useLanguage();
  return (
    <AuthLayout 
      title="Buat Akun Anda"
      subtitle="Mulai perjalanan karier Anda"
    >
      <Helmet>
        <title>{t.title?.register ? `${t.title.register} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
