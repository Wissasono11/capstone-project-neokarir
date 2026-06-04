import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelpCircle } from 'lucide-react';

import DashboardLayout from '../layouts/DashboardLayout';
import Breadcrumb from '../components/ui/Breadcrumb';
import SupportSkeleton from '../features/support/components/SupportSkeleton';

import { useSupport } from '../features/support/hooks/useSupport';
import { useLanguage } from '../contexts/LanguageContext';

import SupportHero from '../features/support/components/SupportHero';
import SupportTabs from '../features/support/components/SupportTabs';
import FAQSection from '../features/support/components/FAQSection';
import UsageGuideSection from '../features/support/components/UsageGuideSection';
import ContactFormSection from '../features/support/components/ContactFormSection';

const SupportPage = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const {
    activeTab,
    setActiveTab,
    expandedFAQ,
    toggleFAQ,
    searchQuery,
    setSearchQuery,
    contactForm,
    handleInputChange,
    formErrors,
    isSubmitting,
    submitSuccess,
    handleSubmit
  } = useSupport();

  const breadcrumbItems = [
    { label: t.common.support, path: '/dashboard/support', icon: HelpCircle }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'faq':
        return (
          <FAQSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            expandedFAQ={expandedFAQ}
            toggleFAQ={toggleFAQ}
          />
        );
      case 'guide':
        return <UsageGuideSection />;
      case 'contact':
        return (
          <ContactFormSection
            contactForm={contactForm}
            handleInputChange={handleInputChange}
            formErrors={formErrors}
            isSubmitting={isSubmitting}
            submitSuccess={submitSuccess}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t.title?.support ? `${t.title.support} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {isLoading ? (
        <SupportSkeleton />
      ) : (
        <div className="space-y-6 pb-12 animate-fade-in">
          {/* Hero */}
          <SupportHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Tabs */}
          <SupportTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          <div>
            {renderTabContent()}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SupportPage;
