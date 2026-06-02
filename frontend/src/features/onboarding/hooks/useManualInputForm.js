import { useState } from 'react';
import { ROLES_BY_DOMAIN } from '../data/onboardingData';

export const useManualInputForm = (manualData, updateManualData) => {
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

  return {
    skillInput,
    setSkillInput,
    availableRoles,
    handleAddSkill,
    handleRemoveSkill,
    handleSkillKeyDown
  };
};
