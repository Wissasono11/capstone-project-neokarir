import React from 'react';
import LegalLayout from '../layouts/LegalLayout';
import TermsOfServiceContent from '../features/legal/components/TermsOfServiceContent';

const TermsOfServicePage = () => {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="May 2, 2026"
    >
      <TermsOfServiceContent />
    </LegalLayout>
  );
};

export default TermsOfServicePage;
