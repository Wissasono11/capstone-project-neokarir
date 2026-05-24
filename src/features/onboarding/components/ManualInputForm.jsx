import { Search, X } from 'lucide-react';
import FormInput from '../../../components/ui/FormInput';
import { useManualInputForm } from '../hooks/useManualInputForm';
import {
  IT_DOMAINS,
  SUGGESTED_SKILLS,
  EXPERIENCE_LEVELS,
  EDUCATION_LEVELS
} from '../data/onboardingData';

const ManualInputForm = ({ manualData, updateManualData }) => {
  const {
    skillInput,
    setSkillInput,
    availableRoles,
    handleAddSkill,
    handleRemoveSkill,
    handleSkillKeyDown
  } = useManualInputForm(manualData, updateManualData);

  return (
    <div className="w-full bg-white rounded-2xl border border-border shadow-sm p-8 space-y-8">
      {/* 1. Domain */}
      <div>
        <h3 className="text-body font-bold text-primary-text mb-4">1. What IT domain do you want to focus on?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {IT_DOMAINS.map(domain => (
            <button
              key={domain}
              type="button"
              onClick={() => {
                updateManualData('domain', domain);
                updateManualData('role', ''); // Reset role when domain changes
              }}
              className={`
                text-left px-5 py-3.5 rounded-xl border transition-all text-sm font-medium
                ${manualData.domain === domain
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-secondary-text hover:border-primary/40'
                }
              `}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Role */}
      {manualData.domain && (
        <div>
          <h3 className="text-body font-bold text-primary-text mb-4">2. Select a specific role you are targeting!</h3>
          <div className="flex flex-wrap gap-3">
            {availableRoles.map(role => (
              <button
                key={role}
                type="button"
                onClick={() => updateManualData('role', role)}
                className={`
                  px-5 py-2.5 rounded-full border transition-all text-sm font-medium
                  ${manualData.role === role
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white border-border text-secondary-text hover:border-primary/40'
                  }
                `}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Tech Stack */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-body font-bold text-primary-text">3. Select up to 10 Tech Stacks, Frameworks, or Tools you master.</h3>
          <span className="text-xs font-semibold bg-bg-secondary text-secondary-text px-2 py-1 rounded-md">
            {manualData.techStack.length}/10
          </span>
        </div>

        <div className="relative mb-4">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search tech stack..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            disabled={manualData.techStack.length >= 10}
            className="w-full rounded-xl border border-border bg-white pl-12 pr-4 py-3.5 text-sm text-primary-text placeholder:text-secondary-text/60 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
          />
        </div>

        {/* Selected Skills */}
        {manualData.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {manualData.techStack.map(skill => (
              <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                {skill}
                <button onClick={() => handleRemoveSkill(skill)} className="hover:text-emerald-900 focus:outline-none">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Suggested Skills */}
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.filter(s => !manualData.techStack.includes(s)).slice(0, 15).map(skill => (
            <button
              key={skill}
              type="button"
              onClick={() => handleAddSkill(skill)}
              disabled={manualData.techStack.length >= 10}
              className="px-4 py-2 rounded-xl border border-border bg-white text-secondary-text text-sm hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 4. Experience */}
        <div>
          <h3 className="text-body font-bold text-primary-text mb-4">4. How long is your work experience?</h3>
          <div className="space-y-3">
            {EXPERIENCE_LEVELS.map(level => (
              <label key={level} className="flex items-center gap-3 cursor-pointer group">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                  ${manualData.experience === level ? 'border-primary' : 'border-border group-hover:border-primary/50'}
                `}>
                  {manualData.experience === level && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <span className="text-sm text-primary-text">{level}</span>
                <input
                  type="radio"
                  name="experience"
                  value={level}
                  checked={manualData.experience === level}
                  onChange={() => updateManualData('experience', level)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        {/* 5. Education */}
        <div>
          <h3 className="text-body font-bold text-primary-text mb-4">5. What is your highest education level?</h3>
          <div className="space-y-3">
            {EDUCATION_LEVELS.map(level => (
              <label key={level} className="flex items-center gap-3 cursor-pointer group">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                  ${manualData.education === level ? 'border-primary' : 'border-border group-hover:border-primary/50'}
                `}>
                  {manualData.education === level && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <span className="text-sm text-primary-text">{level}</span>
                <input
                  type="radio"
                  name="education"
                  value={level}
                  checked={manualData.education === level}
                  onChange={() => updateManualData('education', level)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>
      </div>



    </div>
  );
};

export default ManualInputForm;
