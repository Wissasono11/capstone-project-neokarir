import { useState, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePersonalInfo } from './usePersonalInfo';
import { useCareerSkills } from './useCareerSkills';
import { useAccountSecurity } from './useAccountSecurity';
import { usePreferences } from './usePreferences';
import { profileService } from '../api/profileService';
import { useToast } from '../../../contexts/ToastContext';

export const useProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { success: toastSuccess, error: toastError } = useToast();

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
    handleReprocess,
    isModalOpen,
    openModal,
    closeModal
  } = useCareerSkills(user);
  
  const { security, updateSecurity, removeSession } = useAccountSecurity();
  const { preferences, updatePreferences } = usePreferences();

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      if (activeTab === 'personal') {
        const result = await profileService.updatePersonalInfo(personalInfo);
        updateProfile({
          name: personalInfo.fullName,
          email: personalInfo.email,
        });
        toastSuccess('Informasi pribadi berhasil disimpan!');
      } else if (activeTab === 'security') {
        if (security.newPassword && security.newPassword !== security.confirmPassword) {
          throw new Error('Konfirmasi kata sandi baru tidak cocok.');
        }
        await profileService.updateSecurity({
          currentPassword: security.currentPassword,
          newPassword: security.newPassword,
        });
        updateSecurity('currentPassword', '');
        updateSecurity('newPassword', '');
        updateSecurity('confirmPassword', '');
        toastSuccess('Kata sandi berhasil diperbarui!');
      } else if (activeTab === 'preferences') {
        await profileService.updatePreferences(preferences);
        toastSuccess('Preferensi akun berhasil diperbarui!');
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      toastError(err.message || 'Gagal menyimpan perubahan. Silakan coba kembali.');
    } finally {
      setIsSaving(false);
    }
  }, [activeTab, personalInfo, security, preferences, updateProfile, updateSecurity, toastSuccess, toastError]);

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
    isModalOpen,
    openModal,
    closeModal,
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
