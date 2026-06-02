import React from 'react';
import { PanelLeftOpen, Bot } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const ChatFeedHeader = ({
  isHistoryOpen,
  setIsHistoryOpen,
  activeSessionTitle
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-primary px-5 py-4 flex items-center justify-between text-white select-none">
      <div className="flex items-center gap-3">
        {!isHistoryOpen && (
          <button
            type="button"
            onClick={() => setIsHistoryOpen(true)}
            className="p-2 rounded-xl hover:bg-white/10 text-white transition-colors cursor-pointer shrink-0"
            title={t.aiAssistant.history}
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        )}
        
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center border border-white/10 shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        
        <div className="min-w-0">
          <h2 className="text-body-sm md:text-body-lg font-bold tracking-tight truncate">
            {activeSessionTitle || 'Neobots'}
          </h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block"></span>
            <span className="text-caption font-semibold text-white/90">{t.aiAssistant.headerSubtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFeedHeader;
