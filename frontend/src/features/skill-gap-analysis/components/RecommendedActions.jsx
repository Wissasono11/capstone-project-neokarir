import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const RecommendedActions = ({ actionsData }) => {
  const { t } = useLanguage();

  const formatDescription = React.useCallback((type, desc) => {
    if (!desc) return '';
    
    if (type === 'critical') {
      if (desc === 'You have no critical skill gaps.') {
        return t.skillGap.actionNoCritical || desc;
      }
      if (desc.startsWith('Focus on ') && desc.endsWith(' skills.')) {
        const skills = desc.slice(9, -8);
        return t.skillGap.actionFocusSkills ? t.skillGap.actionFocusSkills(skills) : desc;
      }
    }
    
    if (type === 'improvement') {
      if (desc === 'All your core skills are solid.') {
        return t.skillGap.actionSkillsSolid || desc;
      }
      if (desc.startsWith('Enhance ') && desc.endsWith(' expertise.')) {
        const skills = desc.slice(8, -11);
        return t.skillGap.actionEnhanceSkills ? t.skillGap.actionEnhanceSkills(skills) : desc;
      }
    }
    
    if (type === 'strength') {
      if (desc === 'Keep learning to surpass industry standards.') {
        return t.skillGap.actionNoStrength || desc;
      }
      if (desc.endsWith(' skills exceed requirements.')) {
        const skills = desc.slice(0, -28);
        return t.skillGap.actionExceedRequirements ? t.skillGap.actionExceedRequirements(skills) : desc;
      }
    }
    
    return desc;
  }, [t]);
  
  const normalizedData = React.useMemo(() => {
    if (!actionsData) return [];
    if (Array.isArray(actionsData)) {
      return actionsData.map(act => ({
        ...act,
        description: formatDescription(act.type, act.description)
      }));
    }

    const actions = [];
    if (actionsData.critical_gap || actionsData.critical) {
      actions.push({
        type: 'critical',
        title: t.skillGap.criticalGap,
        description: formatDescription('critical', actionsData.critical_gap || actionsData.critical)
      });
    }
    if (actionsData.needs_improvement || actionsData.improvement || actionsData.improvements) {
      actions.push({
        type: 'improvement',
        title: t.skillGap.needsImprovement,
        description: formatDescription('improvement', actionsData.needs_improvement || actionsData.improvements || actionsData.improvement)
      });
    }
    if (actionsData.strengths || actionsData.strength) {
      actions.push({
        type: 'strength',
        title: t.skillGap.strengthsTitle,
        description: formatDescription('strength', actionsData.strengths || actionsData.strength)
      });
    }
    return actions;
  }, [actionsData, t, formatDescription]);

  const isEmpty = normalizedData.length === 0;

  const iconMap = {
    critical: <AlertCircle className="w-5 h-5 text-red-600" />,
    improvement: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    strength: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
  };

  return (
    <div className="space-y-4">
      <h3 className="text-subtitle font-bold text-slate-800">{t.skillGap.recommendedActions}</h3>
      
      {isEmpty ? (
        <div className="p-6 bg-emerald-50/30 border border-emerald-100 rounded-2xl flex items-center justify-center gap-3 text-emerald-800 font-medium text-body-sm">
          <Award className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{t.skillGap.skillsAlignedSuccess}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {normalizedData.map((action, index) => {
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
      )}
    </div>
  );
};

export default RecommendedActions;
