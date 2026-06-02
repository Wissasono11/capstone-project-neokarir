import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const SkillBreakdownList = ({ breakdownData }) => {
  const { t } = useLanguage();
  const isEmpty = !breakdownData || breakdownData.length === 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4 shrink-0">
        <h3 className="text-body-lg font-bold text-slate-800">{t.skillGap.skillBreakdown}</h3>
        <p className="text-slate-500 text-caption mt-0.5">{t.skillGap.skillBreakdownDesc}</p>
      </div>

      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-body-sm font-medium">{t.skillGap.noSkillBreakdown}</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {breakdownData.map((item, index) => {
            const isGap = item.gap < 0;
            
            return (
              <div key={index} className="space-y-1.5 border-b border-slate-50 pb-3 last:border-b-0 last:pb-0">
                
                {/* Info Top */}
                <div className="flex items-center justify-between text-body-sm font-semibold">
                  <span className="text-slate-700">{item.skill}</span>
                  <div className="flex items-center gap-1">
                    {isGap ? (
                      <span className="flex items-center gap-0.5 text-rose-600 text-caption bg-rose-50 px-2 py-0.5 rounded font-bold">
                        <TrendingDown className="w-3.5 h-3.5" />
                        {item.gap}%
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-emerald-600 text-caption bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        +{item.gap || 0}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  {/* Current progress */}
                  <div 
                    className="absolute left-0 top-0 h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, item.current))}%` }}
                  />
                  {/* Target line indicator (Required marker) */}
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-slate-400 z-10"
                    style={{ left: `${Math.min(100, Math.max(0, item.required))}%` }}
                    title={t.skillGap.requiredScore(item.required)}
                  />
                </div>

                {/* Info Bottom */}
                <div className="flex items-center justify-between text-caption font-bold text-slate-400">
                  <span>{t.skillGap.yoursLabel} <strong className="text-slate-600">{item.current}%</strong></span>
                  <span>{t.skillGap.requiredLabel} <strong className="text-slate-600">{item.required}%</strong></span>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SkillBreakdownList;
