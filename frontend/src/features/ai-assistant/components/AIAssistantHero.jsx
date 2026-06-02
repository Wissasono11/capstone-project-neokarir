import React from 'react';
import { MessageSquareMore } from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import { useLanguage } from '../../../contexts/LanguageContext';

const AIAssistantHero = () => {
  const { t } = useLanguage();

  const breadcrumbItems = [
    { label: t.sidebar.aiAssistant, path: '/dashboard/ai-assistant', icon: MessageSquareMore }
  ];

  return (
    <div className="mb-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} className="mb-4" />

      {/* Hero Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-heading md:text-heading font-bold text-primary-text mb-1 tracking-tight flex items-center gap-2">
            {t.aiAssistant.heroTitle}
          </h1>
          <p className="text-body-sm font-medium text-secondary-text">
            {t.aiAssistant.heroDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantHero;
