import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import LegalLayout from '../layouts/LegalLayout';
import TermsOfServiceContent from '../features/legal/components/TermsOfServiceContent';

const TermsOfServicePage = () => {
  const { t } = useLanguage();
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="May 2, 2026"
    >
      <Helmet>
        <title>{t.title?.terms ? `${t.title.terms} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      <TermsOfServiceContent />
    </LegalLayout>
  );
};

export default TermsOfServicePage;
