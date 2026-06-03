import React from 'react';
import { Send, Wand2 } from 'lucide-react';
import ChatSuggestions from './ChatSuggestions';
import { useChatInput } from '../hooks/useChatInput';
import { useLanguage } from '../../../contexts/LanguageContext';

const ChatInputForm = ({
  sendMessage,
  enhancePrompt,
  setIsHistoryOpen
}) => {
  const { t } = useLanguage();
  const {
    inputText,
    setInputText,
    showEnhanceTooltip,
    setShowEnhanceTooltip,
    enhancedSuccessfully,
    handleSend,
    handleKeyPress,
    handleEnhance,
    handleSelectSuggestion
  } = useChatInput(sendMessage, enhancePrompt, setIsHistoryOpen);

  return (
    <div className="border-t border-slate-200/70 p-4 bg-white">
      {/* Suggestion Chips */}
      <ChatSuggestions onSelectSuggestion={handleSelectSuggestion} />

      {/* Input Form (Unified Pill Shape Bar) */}
      <form onSubmit={handleSend} className="relative flex items-center gap-2 border border-slate-200/80 rounded-2xl bg-slate-50/50 p-1.5 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200 shadow-xs">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={t.aiAssistant.placeholder}
          className="flex-1 min-w-0 py-2.5 pl-4 pr-12 bg-transparent text-body-sm font-semibold text-primary-text placeholder-secondary-text/70 outline-none"
        />

        {/* Enhance Prompt Button (Skill: enhance-prompt) */}
        <button
          type="button"
          onClick={handleEnhance}
          disabled={!inputText.trim()}
          onMouseEnter={() => setShowEnhanceTooltip(true)}
          onMouseLeave={() => setShowEnhanceTooltip(false)}
          className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
            inputText.trim()
              ? 'text-primary hover:bg-primary-light hover:text-primary'
              : 'text-secondary-text/30 cursor-not-allowed'
          } ${enhancedSuccessfully ? 'scale-110 text-emerald-500 hover:text-emerald-500 bg-emerald-50' : ''}`}
          title={t.aiAssistant.enhancePrompt}
          aria-label={t.aiAssistant.enhancePrompt}
        >
          <Wand2 className={`w-4.5 h-4.5 ${enhancedSuccessfully ? 'animate-spin' : ''}`} />
          
          {/* Tooltip */}
          {showEnhanceTooltip && inputText.trim() && (
            <div className="absolute bottom-full right-16 mb-2 w-48 bg-slate-800 text-white text-caption font-semibold p-2 rounded-lg shadow-lg z-50">
              {t.aiAssistant.enhanceTooltip}
            </div>
          )}
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim()}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
            inputText.trim()
              ? 'bg-primary text-white hover:bg-indigo-700 active:scale-95 shadow-sm'
              : 'bg-slate-100 text-secondary-text/30 cursor-not-allowed'
          }`}
          title={t.aiAssistant.send}
          aria-label={t.aiAssistant.send}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Disclaimer */}
      <p className="text-caption text-center text-secondary-text/70 mt-3 font-semibold select-none">
        {t.aiAssistant.disclaimer}
      </p>
    </div>
  );
};

export default ChatInputForm;
