import { useState, useCallback } from 'react';

export const useChatInput = (sendMessage, enhancePrompt, setIsHistoryOpen) => {
  const [inputText, setInputText] = useState('');
  const [showEnhanceTooltip, setShowEnhanceTooltip] = useState(false);
  const [enhancedSuccessfully, setEnhancedSuccessfully] = useState(false);

  const handleSend = useCallback((e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText);
    setInputText('');
    setEnhancedSuccessfully(false);

    // Close sidebar history on mobile
    if (window.innerWidth < 768 && setIsHistoryOpen) {
      setIsHistoryOpen(false);
    }
  }, [inputText, sendMessage, setIsHistoryOpen]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleEnhance = useCallback(() => {
    if (!inputText.trim()) return;
    const enhanced = enhancePrompt(inputText);
    setInputText(enhanced);
    setEnhancedSuccessfully(true);
    
    // Reset success animation after a short delay
    setTimeout(() => {
      setEnhancedSuccessfully(false);
    }, 1500);
  }, [inputText, enhancePrompt]);

  const handleSelectSuggestion = useCallback((query) => {
    sendMessage(query);
    if (window.innerWidth < 768 && setIsHistoryOpen) {
      setIsHistoryOpen(false);
    }
  }, [sendMessage, setIsHistoryOpen]);

  return {
    inputText,
    setInputText,
    showEnhanceTooltip,
    setShowEnhanceTooltip,
    enhancedSuccessfully,
    handleSend,
    handleKeyPress,
    handleEnhance,
    handleSelectSuggestion
  };
};
export default useChatInput;
