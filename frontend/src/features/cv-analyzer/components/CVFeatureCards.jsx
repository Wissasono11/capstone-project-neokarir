import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const CVFeatureCards = () => {
  const { t } = useLanguage();
  const cards = [
    {
      title: t.cvAnalyzer.featureCards.atsTitle,
      description: t.cvAnalyzer.featureCards.atsDesc,
      icon: ShieldCheck,
      iconColor: 'text-[#4F46E5]',
      bgColor: 'bg-[#EEF2FF]',
      borderColor: 'border-[#4F46E5]/10'
    },
    {
      title: t.cvAnalyzer.featureCards.strengthsTitle,
      description: t.cvAnalyzer.featureCards.strengthsDesc,
      icon: CheckCircle2,
      iconColor: 'text-[#059669]',
      bgColor: 'bg-[#ECFDF5]',
      borderColor: 'border-[#059669]/10'
    },
    {
      title: t.cvAnalyzer.featureCards.tipsTitle,
      description: t.cvAnalyzer.featureCards.tipsDesc,
      icon: AlertTriangle,
      iconColor: 'text-[#D97706]',
      bgColor: 'bg-[#FFFBEB]',
      borderColor: 'border-[#D97706]/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-white rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start min-w-0`}
          >
            {/* Icon Box */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0 ${card.bgColor} ${card.iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>

            {/* Details */}
            <h4 className="text-base font-bold text-primary-text mb-2 tracking-tight">
              {card.title}
            </h4>
            <p className="text-sm font-medium text-secondary-text leading-relaxed">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CVFeatureCards;
