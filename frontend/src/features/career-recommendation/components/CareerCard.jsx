import { CheckCircle2, AlertCircle, ChevronRight, Award, GraduationCap, BriefcaseBusiness } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';

const CareerCard = ({ job, isActive, onClick }) => {
  const { t } = useLanguage();
  let scoreClass = 'text-indigo-600 bg-indigo-50/50 border-indigo-100';
  let barColor = 'bg-indigo-600';
  if (job.matchScore < 50) {
    scoreClass = 'text-rose-600 bg-rose-50/50 border-rose-100';
    barColor = 'bg-rose-500';
  } else if (job.matchScore < 80) {
    scoreClass = 'text-amber-600 bg-amber-50/50 border-amber-100';
    barColor = 'bg-amber-500';
  } else if (job.matchScore >= 90) {
    scoreClass = 'text-emerald-600 bg-emerald-50/50 border-emerald-100';
    barColor = 'bg-emerald-500';
  }

  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200 relative overflow-hidden group
        ${isActive
          ? 'bg-indigo-50/10 border-indigo-600 shadow-sm'
          : 'bg-white border-slate-100 hover:border-indigo-200 shadow-sm'
        }
      `}
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        {/* Company & Title */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 p-1.5 flex items-center justify-center shrink-0">
            <img
              src={job.logo}
              alt={job.company}
              className="w-full h-full object-contain mix-blend-multiply"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<span class="font-bold text-indigo-600 text-body-sm">${job.company.charAt(0)}</span>`;
              }}
            />
          </div>
          <div>
            <span className="inline-block text-caption font-extrabold tracking-wider text-indigo-600 mb-0.5">
              {job.job_domain}
            </span>
            <h3 className="font-bold text-body text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1">
              {job.job_title}
            </h3>
            <p className="text-caption font-semibold text-slate-400 mt-0.5">
              {job.company}
            </p>
          </div>
        </div>

        {/* Match Score Badge */}
        <div className="flex flex-col items-end shrink-0">
          <div className={`px-2.5 py-1 rounded-lg border text-caption font-extrabold flex items-center gap-1 ${scoreClass}`}>
            <Award className="w-3.5 h-3.5" />
            {job.matchScore}% Match
          </div>
        </div>
      </div>

      {/* Requirement Specs */} 
      <div className="flex items-center gap-4 text-caption font-bold text-slate-600 mb-4 px-1">
        <div className="flex items-center gap-1.5">
          <BriefcaseBusiness className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{job.min_experience}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{job.min_education}</span>
        </div>
      </div>

      {/* Skills Match Progress Bar */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-caption font-bold text-slate-500">
            {t.dashboard.categorySkill}
          </span>
          <span className="text-caption font-extrabold text-indigo-600">
            {job.matchedSkills.length} / {job.required_skills.length} Skill
          </span>
        </div>

        {/* Mini progress bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full ${barColor} transition-all duration-300`}
            style={{ width: `${(job.matchedSkills.length / job.required_skills.length) * 100}%` }}
          />
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5 max-h-[58px] overflow-hidden relative">
          {job.required_skills.map((skill, idx) => {
            const isMatched = job.matchedSkills.includes(skill);
            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-caption font-extrabold border transition-colors
                  ${isMatched
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                    : 'bg-slate-50 border-slate-100 text-slate-500'
                  }
                `}
              >
                {isMatched ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-slate-400 shrink-0" />
                )}
                {skill}
              </span>
            );
          })}
        </div>
      </div>

      {/* Bottom info link */}
      <div className="flex justify-end items-center mt-3 pt-3 border-t border-dashed border-slate-100">
        <span className="text-caption font-extrabold text-indigo-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform tracking-wider">
          Detail & Roadmap <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
};

export default CareerCard;
