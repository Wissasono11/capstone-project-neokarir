import React from 'react';
import { User, BriefcaseBusiness, ShieldCheck, Settings2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const TABS = [
  { id: 'personal', labelKey: 'personalInfo', icon: User },
  { id: 'career', labelKey: 'careerSkills', icon: BriefcaseBusiness },
  { id: 'security', labelKey: 'security', icon: ShieldCheck },
  { id: 'preferences', labelKey: 'preferences', icon: Settings2 },
];

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();
  return (
    <div className="border-b border-border overflow-x-auto scrollbar-hide">
      <nav className="flex gap-1 min-w-max" role="tablist" aria-label="Profile settings tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const label = t.profile[tab.labelKey];

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3.5 text-body-sm font-medium
                border-b-2 transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-secondary-text hover:text-primary-text hover:border-border'
                }
              `}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfileTabs;
