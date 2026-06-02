import { useState, useEffect } from 'react';

export const useChatWindowState = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [searchSessionQuery, setSearchSessionQuery] = useState('');

  // Set default history sidebar state based on screen size on mount
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsHistoryOpen(false);
      } else {
        setIsHistoryOpen(true);
      }
    };

    handleResize(); // run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isHistoryOpen,
    setIsHistoryOpen,
    searchSessionQuery,
    setSearchSessionQuery
  };
};
