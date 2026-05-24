import React from 'react';
import { User, Briefcase, Shield, SlidersHorizontal } from 'lucide-react';

const TABS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'career', label: 'Career & Skills', icon: Briefcase },
  { id: 'security', label: 'Account Security', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
];

const ProfileTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-border overflow-x-auto scrollbar-hide">
      <nav className="flex gap-1 min-w-max" role="tablist" aria-label="Profile settings tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

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
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfileTabs;
