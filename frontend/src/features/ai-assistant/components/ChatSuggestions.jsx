import React from 'react';
import { Sparkles, FileText, Compass, BriefcaseBusiness } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const ChatSuggestions = ({ onSelectSuggestion }) => {
  const { t } = useLanguage();
  const icons = [Compass, BriefcaseBusiness, FileText, Sparkles];
  const suggestions = t.aiAssistant.suggestions || [];

  return (
    <div className="flex flex-nowrap overflow-x-auto gap-2 mb-3 w-full justify-start scrollbar-hide pb-1.5 md:flex-wrap md:overflow-x-visible md:pb-0">
      {suggestions.map((suggestion, index) => {
        const Icon = icons[index] || Sparkles;
        return (
          <button
            key={index}
            onClick={() => onSelectSuggestion(suggestion.query)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200/60 bg-slate-50/50 text-body-sm font-semibold text-slate-600 hover:text-primary hover:border-primary/30 hover:bg-primary-light/20 transition-all duration-200 cursor-pointer shadow-xs active:scale-95 whitespace-nowrap shrink-0"
          >
            <Icon className="w-3.5 h-3.5 text-secondary-text" />
            <span>{suggestion.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ChatSuggestions;
