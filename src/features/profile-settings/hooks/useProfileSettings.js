import { useState, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePersonalInfo } from './usePersonalInfo';
import { useCareerSkills } from './useCareerSkills';
import { useAccountSecurity } from './useAccountSecurity';
import { usePreferences } from './usePreferences';
import { profileService } from '../api/profileService';
import { useToast } from '../../../contexts/ToastContext';

export const useProfileSettings = () => {
  const { user, updateProfile, refreshUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const { success: toastSuccess, error: toastError } = useToast();

  // Sub-hooks delegasi
  const { personalInfo, updatePersonalInfo } = usePersonalInfo(user);
  const {
    careerInfo,
    updateCareerInfo,
    saveCareerInfo,
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
        await profileService.updatePersonalInfo(personalInfo);
        await refreshUserProfile();
        toastSuccess('Informasi pribadi berhasil disimpan!');
      } else if (activeTab === 'career') {
        await saveCareerInfo();
        await refreshUserProfile();
        toastSuccess('Informasi karir & skills berhasil disimpan!');
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
        await refreshUserProfile();
        toastSuccess('Preferensi akun berhasil diperbarui!');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      toastError(err.message || 'Gagal menyimpan perubahan. Silakan coba kembali.');
    } finally {
      setIsSaving(false);
    }
  }, [activeTab, personalInfo, security, preferences, saveCareerInfo, refreshUserProfile, updateSecurity, toastSuccess, toastError]);

  const handleAvatarUpload = useCallback(async (file) => {
    setIsUploadingAvatar(true);
    try {
      const response = await profileService.uploadAvatar(file);
      const responseData = response.data || response;
      if (responseData && responseData.avatar_url) {
        await refreshUserProfile();
        toastSuccess('Foto profil berhasil diperbarui!');
      } else {
        throw new Error('Gagal mendapatkan URL foto profil baru.');
      }
    } catch (err) {
      toastError(err.message || 'Gagal mengunggah foto profil.');
    } finally {
      setIsUploadingAvatar(false);
    }
  }, [refreshUserProfile, toastSuccess, toastError]);

  return {
    activeTab,
    setActiveTab,
    personalInfo,
    updatePersonalInfo,
    careerInfo,
    updateCareerInfo,
    saveCareerInfo,
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
    handleAvatarUpload,
    isUploadingAvatar,
  };
};
