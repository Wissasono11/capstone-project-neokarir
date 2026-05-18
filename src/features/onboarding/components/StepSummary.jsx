import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, CheckCircle, FileText, Briefcase, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { onboardingStepVariants } from '../../../utils/animations';
import Button from '../../../components/ui/Button';
import CVDataCard from './CVDataCard';

const SUGGESTED_ADDITIONAL = ['Problem Solving', 'Communication', 'Teamwork', 'Leadership', 'Time Management', 'Critical Thinking', 'Project Management'];

const StepSummary = ({
  careerGoal,
  inputMethod,
  cvFile,
  manualData,
  cvData,
  updateCvData,
  additionalSkills,
  addSkill,
  removeSkill,
  prevStep,
  submitOnboarding,
  isSubmitting
}) => {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (skill) => {
    addSkill(skill);
    setSkillInput('');
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      handleAddSkill(skillInput.trim());
    }
  };

  const getGoalText = (goal) => {
    switch(goal) {
      case 'first-job': return 'Finding First Job';
      case 'career-switch': return 'Career Switch';
      case 'upskill': return 'Upskilling';
      default: return goal;
    }
  };

  return (
    <motion.div
      variants={onboardingStepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={1}
      className="flex flex-col items-center w-full"
    >
      <div className="text-center mb-10">
        <h1 className="text-[32px] md:text-[40px] font-bold text-primary-text tracking-tight mb-4">
          Review & Confirm Your Profile
        </h1>
        <p className="text-secondary-text text-lg max-w-2xl mx-auto">
          Make sure all data is correct before our AI analyzes your career profile.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Left Column - Recap */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-primary-text mb-4 border-b border-border pb-4">
              Profile Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-primary"><Briefcase size={20} /></div>
                <div>
                  <p className="text-sm text-secondary-text font-medium">Career Goal</p>
                  <p className="text-primary-text font-semibold">{getGoalText(careerGoal)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-primary"><FileText size={20} /></div>
                <div>
                  <p className="text-sm text-secondary-text font-medium">Data Source</p>
                  <p className="text-primary-text font-semibold flex items-center gap-2">
                    {inputMethod === 'upload' ? 'CV Upload' : 'Manual Input'}
                    {inputMethod === 'upload' && cvFile && (
                      <span className="text-xs font-normal px-2 py-0.5 bg-bg-secondary rounded-md text-secondary-text">
                        {cvFile.name}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {inputMethod === 'manual' && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-primary"><MapPin size={20} /></div>
                    <div>
                      <p className="text-sm text-secondary-text font-medium">Location & Domain</p>
                      <p className="text-primary-text font-semibold">
                        {manualData.location} &bull; <span className="font-normal">{manualData.domain}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-primary"><GraduationCap size={20} /></div>
                    <div>
                      <p className="text-sm text-secondary-text font-medium">Experience & Education</p>
                      <p className="text-primary-text font-semibold">
                        {manualData.experience} &bull; <span className="font-normal">{manualData.education}</span>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {inputMethod === 'upload' && (
            <CVDataCard cvData={cvData} updateCvData={updateCvData} />
          )}

          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-primary-text">Refine Skills (Optional)</h3>
            </div>
            <p className="text-sm text-secondary-text mb-4">
              Add any soft skills or other hard skills that might not be detected from your data.
            </p>
            
            <div className="relative mb-4">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Type skill and press Enter..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="w-full rounded-xl border border-border bg-white pl-12 pr-4 py-3 text-sm text-primary-text focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            {additionalSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 p-4 bg-bg-secondary rounded-xl">
                {additionalSkills.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-border text-primary-text text-sm font-medium shadow-sm">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="text-secondary-text hover:text-error focus:outline-none">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {SUGGESTED_ADDITIONAL.filter(s => !additionalSkills.includes(s)).map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleAddSkill(skill)}
                  className="px-3 py-1.5 rounded-lg border border-border bg-white text-secondary-text text-xs font-medium hover:border-primary/40 hover:text-primary transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-5">
          <div className="bg-dashboard-background rounded-2xl p-8 shadow-lg text-white sticky top-24">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
              <Sparkles className="text-white" size={24} />
            </div>
            
            <h3 className="text-xl font-bold mb-6">What you'll get from our AI:</h3>
            
            <ul className="space-y-4 mb-8">
              {[
                'Career recommendations based on profile',
                'Personalized learning path',
                'Skill gap analysis',
                'Career development advice'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-white/80 shrink-0 mt-0.5" size={20} />
                  <span className="font-medium text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              onClick={submitOnboarding}
              disabled={isSubmitting}
              className="w-full bg-white/10! hover:bg-white/20! backdrop-blur-lg border border-white/30 text-white! py-4 text-[16px] shadow-xl transition-all cursor-pointer"
            >
              {isSubmitting ? 'Analyzing...' : 'Analyze My Profile 🚀'}
            </Button>
            
            <button 
              onClick={prevStep}
              className="w-full mt-4 text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Wait, I want to change my data
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepSummary;
