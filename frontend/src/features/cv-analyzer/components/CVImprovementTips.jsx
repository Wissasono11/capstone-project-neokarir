import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const CVImprovementTips = ({ tips = [] }) => {
  const { t } = useLanguage();

  const getPriorityConfig = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return {
          label: 'High Priority',
          badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
          dotColor: 'bg-rose-500',
          iconColor: 'text-rose-500'
        };
      case 'medium':
        return {
          label: 'Medium Priority',
          badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
          dotColor: 'bg-amber-500',
          iconColor: 'text-amber-500'
        };
      default:
        return {
          label: 'Low Priority',
          badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotColor: 'bg-indigo-500',
          iconColor: 'text-indigo-500'
        };
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-border p-6 md:p-8 shadow-sm w-full mb-8">
      {/* Title */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-primary-text leading-none mb-1">{t.cvAnalyzer.improvementTipsTitle}</h4>
          <p className="text-xs font-semibold text-secondary-text">{t.cvAnalyzer.improvementTipsDesc}</p>
        </div>
      </div>

      {/* Checklist Rows */}
      <div className="space-y-4">
        {tips.map((tip, idx) => {
          const cfg = getPriorityConfig(tip.priority);
          return (
            <div 
              key={idx} 
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border/80 bg-canvas-white hover:border-primary/20 transition-colors duration-200"
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Dot Bullet */}
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-2 ${cfg.dotColor}`}></span>
                <span className="text-sm font-semibold text-primary-text leading-relaxed">
                  {tip.text}
                </span>
              </div>

              {/* Priority badge */}
              <div className="flex items-center shrink-0 self-start sm:self-center gap-2">
                <span className={`inline-flex px-3 py-1 rounded-full text-caption font-extrabold border ${cfg.badgeClass}`}>
                  {cfg.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CVImprovementTips;
