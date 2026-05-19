import { useState } from 'react';

export const useStepSummary = (addSkill) => {
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

  return {
    skillInput,
    setSkillInput,
    handleAddSkill,
    handleSkillKeyDown,
    getGoalText
  };
};
