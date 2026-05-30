import { useState, useCallback } from 'react';
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
    currentRole: initialUser?.role || 'Full Stack Developer',
    targetRole: 'Senior Full Stack Developer',
    experienceLevel: initialUser?.experience || 'Fresh Graduate',
    skills: ['React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Git', 'REST API'],
    education: [
      {
        id: 1,
        institution: 'Universitas Gadjah Mada',
        degree: 'S1 Informatika',
        year: '2022 - 2026',
      },
    ],
  });

  const updateCareerInfo = useCallback(async (field, value) => {
    setCareerInfo(prev => ({ ...prev, [field]: value }));

    // Sync update to global context & mock api call
    if (field === 'currentRole') {
      updateProfile({ role: value });
      profileService.updateCareerInfo({ currentRole: value });
    } else if (field === 'experienceLevel') {
      updateProfile({ experience: value });
      profileService.updateCareerInfo({ experienceLevel: value });
    }
  }, [updateProfile]);

  const addSkill = useCallback(async (skill) => {
    if (skill && !careerInfo.skills.includes(skill)) {
      const updatedSkills = [...careerInfo.skills, skill];
      setCareerInfo(prev => ({
        ...prev,
        skills: updatedSkills,
      }));
      // Persist to mock backend
      profileService.updateCareerInfo({ skills: updatedSkills });
    }
  }, [careerInfo.skills]);

  const removeSkill = useCallback(async (skillToRemove) => {
    const updatedSkills = careerInfo.skills.filter(s => s !== skillToRemove);
    setCareerInfo(prev => ({
      ...prev,
      skills: updatedSkills,
    }));
    // Persist to mock backend
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
