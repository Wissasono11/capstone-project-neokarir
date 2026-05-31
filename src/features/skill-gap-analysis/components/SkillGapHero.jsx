import React from 'react';
import { Target, CheckCircle2, AlertTriangle, Briefcase, GraduationCap } from 'lucide-react';

const SkillGapHero = ({ data }) => {
  if (!data) return null;

  const {
    overallReadiness,
    targetRole,
    targetDomain,
    matchedSkillsCount,
    totalRequiredSkills,
    missingSkillsCount,
    experienceGap,
    educationMatch,
    readinessLevel
  } = data;

  // Determine readiness badge styles
  let badgeClass = "bg-blue-50 text-blue-700 border-blue-200";
  if (overallReadiness >= 90) {
    badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (overallReadiness >= 70) {
    badgeClass = "bg-indigo-50 text-indigo-700 border-indigo-200";
  } else if (overallReadiness >= 40) {
    badgeClass = "bg-amber-50 text-amber-700 border-amber-200";
  } else {
    badgeClass = "bg-rose-50 text-rose-700 border-rose-200";
  }

  // Calculate circular progress dash offset
  const radius = 60;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (overallReadiness / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">

      {/* Circular Progress Area */}
      <div className="flex flex-col items-center justify-center shrink-0">
        <div className="relative flex items-center justify-center">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-95"
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
              stroke="#4F46E5"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Central Score Text */}
          <div className="absolute flex flex-col items-center justify-center">
            <div className="flex items-baseline justify-center">
              <span className="text-heading-xl font-extrabold text-slate-800 leading-none">{overallReadiness}</span>
              <span className="text-subtitle font-bold text-slate-400 ml-0.5">%</span>
            </div>
            <span className="text-caption font-semibold text-slate-400 uppercase tracking-wider mt-1">Kesiapan</span>
          </div>
        </div>

        <span className={`mt-3 px-3 py-1 rounded-full text-caption font-bold border ${badgeClass}`}>
          {readinessLevel}
        </span>
      </div>

      {/* Info Details Area */}
      <div className="flex-1 w-full">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-caption font-bold uppercase tracking-wider">
            {targetDomain}
          </span>
        </div>

        <h2 className="text-title font-bold text-slate-800 mb-4 flex items-center gap-2">
          Target Karir: <span className="text-indigo-600 font-extrabold">{targetRole}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Skills Match */}
          <div className="flex items-start gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100/50">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-caption font-semibold text-slate-400 uppercase tracking-wider">Kecocokan Skill</p>
              <p className="text-body font-bold text-slate-700 mt-0.5">
                {matchedSkillsCount}/{totalRequiredSkills} Skill Dimiliki
              </p>
              <p className="text-caption text-slate-500 mt-1">
                {missingSkillsCount} skill lagi perlu dipelajari
              </p>
            </div>
          </div>

          {/* Education Match */}
          <div className="flex items-start gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100/50">
            <div className={`p-2 rounded-lg ${educationMatch.hasGap && educationMatch.required !== 'Tidak Ditentukan' && educationMatch.required !== 'N/A' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-caption font-semibold text-slate-400 uppercase tracking-wider">Pendidikan Minimal</p>
              <p className="text-body font-bold text-slate-700 mt-0.5">
                {educationMatch.required}
              </p>
              <span className={`inline-flex items-center gap-1 text-caption font-bold mt-1 ${educationMatch.hasGap && educationMatch.required !== 'Tidak Ditentukan' && educationMatch.required !== 'N/A' ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                {educationMatch.hasGap && educationMatch.required !== 'Tidak Ditentukan' && educationMatch.required !== 'N/A' ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                {educationMatch.hasGap && educationMatch.required !== 'Tidak Ditentukan' && educationMatch.required !== 'N/A' ? `Gap pendidikan: Kamu ${educationMatch.current}` : 'Sesuai dengan kualifikasi'}
              </span>
            </div>
          </div>

          {/* Experience Match */}
          <div className="flex items-start gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 sm:col-span-2">
            <div className={`p-2 rounded-lg ${experienceGap.hasGap && experienceGap.required !== 'Tidak Ditentukan' && experienceGap.required !== 'N/A' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-caption font-semibold text-slate-400 uppercase tracking-wider">Pengalaman Kerja</p>
              <p className="text-body font-bold text-slate-700 mt-0.5">
                Dibutuhkan: {experienceGap.required}
              </p>
              <span className={`inline-flex items-center gap-1 text-caption font-bold mt-1 ${experienceGap.hasGap && experienceGap.required !== 'Tidak Ditentukan' && experienceGap.required !== 'N/A' ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                {experienceGap.hasGap && experienceGap.required !== 'Tidak Ditentukan' && experienceGap.required !== 'N/A' ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                {experienceGap.hasGap && experienceGap.required !== 'Tidak Ditentukan' && experienceGap.required !== 'N/A'
                  ? `Ada gap: Pengalaman kamu saat ini adalah ${experienceGap.current}`
                  : 'Memenuhi kualifikasi pengalaman kerja'
                }
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SkillGapHero;
