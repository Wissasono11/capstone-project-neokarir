import React from 'react';
import { Target, Award, FileText, MessageSquareMore, Settings, TrendingUp } from 'lucide-react';
import GuideCard from './GuideCard';
import { useLanguage } from '../../../contexts/LanguageContext';

const GUIDE_ITEMS = [
  {
    icon: Target,
    path: '/dashboard/skill-gap',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    icon: Award,
    path: '/dashboard/recommendations',
    color: 'text-teal-600',
    bg: 'bg-teal-50'
  },
  {
    icon: FileText,
    path: '/dashboard/cv-analyzer',
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
  {
    icon: TrendingUp,
    path: '/dashboard/jobs-market',
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    icon: MessageSquareMore,
    path: '/dashboard/ai-assistant',
    color: 'text-pink-600',
    bg: 'bg-pink-50'
  },
  {
    icon: Settings,
    path: '/dashboard/settings',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  }
];

const UsageGuideSection = () => {
  const { t } = useLanguage();
  const guideItemsLocale = t.support.guideItems || [];

  const localizedGuideItems = GUIDE_ITEMS.map((item, index) => ({
    ...item,
    title: guideItemsLocale[index]?.title || '',
    description: guideItemsLocale[index]?.description || '',
  }));

  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-4 mb-2">
        <h2 className="text-body-lg md:text-subtitle font-bold text-primary-text">{t.support.guideTitle}</h2>
        <p className="text-body-sm text-secondary-text">{t.support.guideSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localizedGuideItems.map((item, index) => (
          <GuideCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            path={item.path}
            color={item.color}
            bg={item.bg}
          />
        ))}
      </div>
    </div>
  );
};

export default UsageGuideSection;

