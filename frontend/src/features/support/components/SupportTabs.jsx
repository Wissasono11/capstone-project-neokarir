import React from 'react';
import { HelpCircle, BookOpen, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const SupportTabs = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  
  const tabs = [
    { id: 'faq', label: t.support.faqTitle, icon: HelpCircle },
    { id: 'guide', label: t.support.guideTitle, icon: BookOpen },
    { id: 'contact', label: t.support.contactTitle, icon: MessageSquare },
  ];

  return (
    <div className="flex border-b border-border mb-8 overflow-x-auto scrollbar-hide gap-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-body-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'border-primary text-primary bg-primary-light/40 rounded-t-xl'
                : 'border-transparent text-secondary-text hover:text-primary-text hover:border-border'
            }`}
          >
            <Icon size={18} className={isActive ? 'text-primary' : 'text-secondary-text'} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default SupportTabs;
