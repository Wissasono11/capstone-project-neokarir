import { useLanguage } from '../../../contexts/LanguageContext';

const ProfileInsightsCard = ({ job }) => {
  const { t } = useLanguage();

  if (!job) return null;

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-slate-700">
      <h4 className="text-body-sm font-bold text-slate-800 mb-2">{t.career.whyMatchTitle}</h4>
      <p className="text-caption text-slate-600 font-medium leading-relaxed mb-4">
        {t.career.whyMatchDesc}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {job.matchedSkills.map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded text-caption font-bold bg-emerald-50 border border-emerald-100 text-emerald-700"
          >
            ✓ {skill}
          </span>
        ))}
        {job.missingSkills.map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded text-caption font-bold bg-slate-100 border border-slate-200 text-slate-500"
          >
            ○ {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileInsightsCard;
