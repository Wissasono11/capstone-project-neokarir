import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { profileService } from '../api/profileService';

export const useCareerSkills = (initialUser) => {
  const navigate = useNavigate();
  const { resetOnboarding, updateProfile } = useAuth();
  const [newSkill, setNewSkill] = useState('');
  const [isReprocessing, setIsReprocessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [careerInfo, setCareerInfo] = useState({
    currentRole: initialUser?.current_role || initialUser?.role || '',
    targetRole: initialUser?.target_role || initialUser?.profile_data?.target_role || '',
    experienceLevel: initialUser?.experience || initialUser?.profile_data?.user_experience || 'Fresh Graduate',
    skills: [],
    education: [],
  });

  useEffect(() => {
    if (initialUser) {
      const dbSkills = initialUser.profile_data?.owned_skills || 
        (initialUser.skills_summary ? initialUser.skills_summary.split(',').map(s => s.trim()).filter(Boolean) : []);
      
      setCareerInfo(prev => ({
        ...prev,
        currentRole: initialUser.current_role || initialUser.role || '',
        targetRole: initialUser.target_role || initialUser.profile_data?.target_role || '',
        experienceLevel: initialUser.experience || initialUser.profile_data?.user_experience || 'Fresh Graduate',
        skills: dbSkills,
        education: initialUser.profile_data?.education || prev.education,
      }));
    }
  }, [initialUser]);

  const updateCareerInfo = useCallback((field, value) => {
    setCareerInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const saveCareerInfo = useCallback(async (currentCareerInfo) => {
    const info = currentCareerInfo || careerInfo;
    await profileService.updateCareerInfo({
      currentRole: info.currentRole,
      targetRole: info.targetRole,
      experienceLevel: info.experienceLevel,
      skills: info.skills,
    });
    updateProfile({
      role: info.currentRole,
      current_role: info.currentRole,
      target_role: info.targetRole,
      experience: info.experienceLevel,
    });
  }, [careerInfo, updateProfile]);

  const addSkill = useCallback(async (skill) => {
    if (skill && !careerInfo.skills.includes(skill)) {
      const updatedSkills = [...careerInfo.skills, skill];
      setCareerInfo(prev => ({
        ...prev,
        skills: updatedSkills,
      }));
      profileService.updateCareerInfo({ skills: updatedSkills });
    }
  }, [careerInfo.skills]);

  const removeSkill = useCallback(async (skillToRemove) => {
    const updatedSkills = careerInfo.skills.filter(s => s !== skillToRemove);
    setCareerInfo(prev => ({
      ...prev,
      skills: updatedSkills,
    }));
    profileService.updateCareerInfo({ skills: updatedSkills });
  }, [careerInfo.skills]);

  const handleReprocess = useCallback(async () => {
    setIsReprocessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsReprocessing(false);
    setIsModalOpen(false);
    resetOnboarding();
    navigate('/onboarding');
  }, [navigate, resetOnboarding]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
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
  };
};
