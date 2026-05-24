import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePersonalInfo } from './usePersonalInfo';
import { useCareerSkills } from './useCareerSkills';
import { useAccountSecurity } from './useAccountSecurity';
import { usePreferences } from './usePreferences';
import { useProfileSave } from './useProfileSave';

export const useProfileSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  // Sub-hooks delegasi
  const { personalInfo, updatePersonalInfo } = usePersonalInfo(user);
  const {
    careerInfo,
    updateCareerInfo,
    addSkill,
    removeSkill,
    newSkill,
    setNewSkill,
    isReprocessing,
    handleReprocess
  } = useCareerSkills(user);
  
  const { security, updateSecurity, removeSession } = useAccountSecurity();
  const { preferences, updatePreferences } = usePreferences();
  const { isSaving, saveSuccess, handleSave } = useProfileSave();

  return {
    activeTab,
    setActiveTab,
    personalInfo,
    updatePersonalInfo,
    careerInfo,
    updateCareerInfo,
    addSkill,
    removeSkill,
    newSkill,
    setNewSkill,
    isReprocessing,
    handleReprocess,
    security,
    updateSecurity,
    removeSession,
    preferences,
    updatePreferences,
    isSaving,
    saveSuccess,
    handleSave,
    user,
  };
};
