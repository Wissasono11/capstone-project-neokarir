import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

const RecommendedActions = ({ actionsData }) => {
  if (!actionsData || actionsData.length === 0) return null;

  const iconMap = {
    critical: <AlertCircle className="w-5 h-5 text-red-600" />,
    improvement: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    strength: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
  };

  return (
    <div className="space-y-4">
      <h3 className="text-subtitle font-bold text-slate-800">Aksi yang Direkomendasikan</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actionsData.map((action, index) => {
          let cardStyle = "border-red-200 bg-red-50/50 text-red-900";
          let badgeStyle = "bg-red-100 text-red-800";
          
          if (action.type === "improvement") {
            cardStyle = "border-amber-200 bg-amber-50/50 text-amber-900";
            badgeStyle = "bg-amber-100 text-amber-800";
          } else if (action.type === "strength") {
            cardStyle = "border-emerald-200 bg-emerald-50/50 text-emerald-900";
            badgeStyle = "bg-emerald-100 text-emerald-800";
          }

          return (
            <div 
              key={index} 
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-sm ${cardStyle}`}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {iconMap[action.type] || <AlertCircle className="w-5 h-5" />}
                  <span className={`px-2.5 py-0.5 rounded-lg text-caption font-extrabold uppercase tracking-wide ${badgeStyle}`}>
                    {action.title}
                  </span>
                </div>
                <p className="text-body-sm font-medium leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedActions;
