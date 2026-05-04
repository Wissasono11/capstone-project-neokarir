import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import FormInput from '../../../components/ui/FormInput';

const IT_DOMAINS = [
  'Data Science & Artificial Intelligence',
  'Mobile Development',
  'Cyber Security',
  'Cloud & DevOps',
  'UI/UX Design',
  'Quality Assurance (QA) & Testing',
  'Web Development'
];

const ROLES_BY_DOMAIN = {
  'Data Science & Artificial Intelligence': ['Data Analyst', 'Data Scientist', 'Machine Learning Engineer', 'AI Engineer'],
  'Web Development': ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
  'default': ['Junior Specialist', 'Specialist', 'Senior Specialist', 'Lead']
};

const SUGGESTED_SKILLS = ['Python', 'SQL', 'Pandas', 'TensorFlow', 'Scikit-Learn', 'Tableau', 'R', 'PyTorch', 'Hadoop', 'Spark', 'Git', 'GitHub', 'Docker', 'Agile/Scrum', 'JIRA', 'Trello', 'React', 'Node.js', 'Figma'];

const EXPERIENCE_LEVELS = [
  'None (Fresh Graduate / Student)',
  '< 1 year',
  '1 - 3 years',
  '3 - 5 years',
  '> 5 years'
];

const EDUCATION_LEVELS = [
  'High School / Vocational',
  'Associate Degree (D3)',
  'Bachelor\'s Degree (S1)',
  'Master\'s Degree (S2)',
  'Doctorate (S3)'
];

const ManualInputForm = ({ manualData, updateManualData }) => {
  const [skillInput, setSkillInput] = useState('');

  const availableRoles = manualData.domain && ROLES_BY_DOMAIN[manualData.domain] 
    ? ROLES_BY_DOMAIN[manualData.domain] 
    : ROLES_BY_DOMAIN.default;

  const handleAddSkill = (skill) => {
    if (manualData.techStack.length < 10 && !manualData.techStack.includes(skill)) {
      updateManualData('techStack', [...manualData.techStack, skill]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    updateManualData('techStack', manualData.techStack.filter(s => s !== skillToRemove));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      handleAddSkill(skillInput.trim());
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-border shadow-sm p-8 space-y-8">
      {/* 1. Domain */}
      <div>
        <h3 className="text-[15px] font-bold text-primary-text mb-4">1. What IT domain do you want to focus on?</h3>
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
          <h3 className="text-[15px] font-bold text-primary-text mb-4">2. Select a specific role you are targeting!</h3>
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
          <h3 className="text-[15px] font-bold text-primary-text">3. Select up to 10 Tech Stacks, Frameworks, or Tools you master.</h3>
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
          <h3 className="text-[15px] font-bold text-primary-text mb-4">4. How long is your work experience?</h3>
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
          <h3 className="text-[15px] font-bold text-primary-text mb-4">5. What is your highest education level?</h3>
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

      {/* 6. Location */}
      <div className="pt-2">
        <FormInput
          label="6. Where are you currently located? (City, Province)"
          id="location"
          placeholder="e.g., Jakarta, Indonesia"
          value={manualData.location}
          onChange={(e) => updateManualData('location', e.target.value)}
        />
      </div>

    </div>
  );
};

export default ManualInputForm;
