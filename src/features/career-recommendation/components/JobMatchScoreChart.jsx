import { Award, BriefcaseBusiness, GraduationCap, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const JobMatchScoreChart = ({ job }) => {
  const { t } = useLanguage();

  if (!job) return null;

  const { matchScore, matchBreakdown } = job;

  let strokeColor = '#4F46E5'; 
  let scoreClass = 'text-indigo-600';
  let badgeText = t.career.matchVeryHigh;
  let badgeClass = 'bg-indigo-50 text-indigo-700 border-indigo-100';

  if (matchScore < 50) {
    strokeColor = '#EF4444'; 
    scoreClass = 'text-rose-600';
    badgeText = t.career.matchLow;
    badgeClass = 'bg-rose-50 text-rose-700 border-rose-100';
  } else if (matchScore < 80) {
    strokeColor = '#F59E0B'; 
    scoreClass = 'text-amber-500';
    badgeText = t.career.matchMedium;
    badgeClass = 'bg-amber-50 text-amber-700 border-amber-100';
  } else if (matchScore >= 90) {
    strokeColor = '#10B981'; 
    scoreClass = 'text-emerald-600';
    badgeText = t.career.matchIdeal;
    badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-100';
  }

  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <div className="flex justify-between items-center mb-5 border-b border-slate-50 pb-3">
        <h3 className="text-body font-bold text-slate-800">{t.career.matchAnalysis}</h3>
        <span className={`px-2.5 py-0.5 rounded text-caption font-extrabold border ${badgeClass} tracking-wider`}>
          {badgeText}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Left: Gauge */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative flex items-center justify-center">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90"
            >
              {/* Background Circle */}
              <circle
                stroke="#E2E8F0"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Foreground Score Circle */}
              <circle
                stroke={strokeColor}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            
            {/* Central Score Text */}
            <div className="absolute flex flex-col items-center justify-center">
              <div className="flex items-baseline justify-center">
                <span className={`text-heading font-extrabold leading-none ${scoreClass}`}>{matchScore}</span>
                <span className="text-body-sm font-bold text-slate-400 ml-0.5">%</span>
              </div>
              <span className="text-caption font-bold text-slate-400 tracking-wider mt-0.5">Match</span>
            </div>
          </div>
        </div>

        {/* Right: Breakdown bars */}
        <div className="flex-1 w-full space-y-3.5">
          {/* Tech Skills Match */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-caption font-bold">
              <span className="text-slate-600 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                Tech Skills Match
              </span>
              <span className="text-indigo-600">{matchBreakdown.skills}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                style={{ width: `${matchBreakdown.skills}%` }}
              />
            </div>
          </div>

          {/* Experience Match */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-caption font-bold">
              <span className="text-slate-600 flex items-center gap-1.5">
                <BriefcaseBusiness className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {t.career.workExperience}
              </span>
              <span className="text-slate-700">{matchBreakdown.experience}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${matchBreakdown.experience}%` }}
              />
            </div>
          </div>

          {/* Education Match */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-caption font-bold">
              <span className="text-slate-600 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {t.career.formalEducation}
              </span>
              <span className="text-slate-700">{matchBreakdown.education}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-purple rounded-full transition-all duration-700"
                style={{ width: `${matchBreakdown.education}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatchScoreChart;
