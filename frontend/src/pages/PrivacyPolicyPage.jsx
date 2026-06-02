import React from 'react';
import LegalLayout from '../layouts/LegalLayout';
import PrivacyPolicyContent from '../features/legal/components/PrivacyPolicyContent';

const PrivacyPolicyPage = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="May 2, 2026"
    >
      <PrivacyPolicyContent />
    </LegalLayout>
  );
};

export default PrivacyPolicyPage;
