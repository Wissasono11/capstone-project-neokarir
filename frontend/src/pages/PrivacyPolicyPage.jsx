import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import LegalLayout from '../layouts/LegalLayout';
import PrivacyPolicyContent from '../features/legal/components/PrivacyPolicyContent';

const PrivacyPolicyPage = () => {
  const { t } = useLanguage();
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="May 2, 2026"
    >
      <Helmet>
        <title>{t.title?.privacy ? `${t.title.privacy} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      <PrivacyPolicyContent />
    </LegalLayout>
  );
};

export default PrivacyPolicyPage;
