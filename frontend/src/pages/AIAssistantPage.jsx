import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../layouts/DashboardLayout';
import AIAssistantHero from '../features/ai-assistant/components/AIAssistantHero';
import ChatWindow from '../features/ai-assistant/components/ChatWindow';
import AIAssistantSkeleton from '../features/ai-assistant/components/AIAssistantSkeleton';

const AIAssistantPage = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t.title?.aiAssistant ? `${t.title.aiAssistant} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      {isLoading ? (
        <AIAssistantSkeleton />
      ) : (
        <div className="space-y-6 animate-fade-in">
          <AIAssistantHero />

          <div className="w-full pb-16">
            <ChatWindow />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AIAssistantPage;
