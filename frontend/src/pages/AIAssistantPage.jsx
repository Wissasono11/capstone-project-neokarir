import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import AIAssistantHero from '../features/ai-assistant/components/AIAssistantHero';
import ChatWindow from '../features/ai-assistant/components/ChatWindow';
import AIAssistantSkeleton from '../features/ai-assistant/components/AIAssistantSkeleton';

const AIAssistantPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
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
