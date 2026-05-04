import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export const useOnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [careerGoal, setCareerGoal] = useState('');
  const [inputMethod, setInputMethod] = useState('upload'); // 'upload' | 'manual'
  const [cvFile, setCvFile] = useState(null);
  
  const [manualData, setManualData] = useState({
    domain: '',
    role: '',
    techStack: [],
    experience: '',
    education: '',
    location: ''
  });
  
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };
  
  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const updateManualData = (field, value) => {
    setManualData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill) => {
    if (!additionalSkills.includes(skill)) {
      setAdditionalSkills(prev => [...prev, skill]);
    }
  };

  const removeSkill = (skill) => {
    setAdditionalSkills(prev => prev.filter(s => s !== skill));
  };

  const submitOnboarding = async () => {
    setIsSubmitting(true);
    
    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Combine manual data tech stack and additional skills
    const combinedSkills = Array.from(new Set([...manualData.techStack, ...additionalSkills]));
    
    // Profile data to save
    const profileData = {
      careerGoal,
      inputMethod,
      skills: combinedSkills,
      domain: manualData.domain,
      role: manualData.role || (careerGoal === 'first-job' ? 'Junior Developer' : 'Developer'),
      experience: manualData.experience || 'Fresh Graduate',
      education: manualData.education || 'Bachelor Degree',
      location: manualData.location || 'Yogyakarta, Indonesia',
      status: 'Open to Work'
    };
    
    completeOnboarding(profileData);
    navigate('/ai-career-profiling');
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    careerGoal,
    setCareerGoal,
    inputMethod,
    setInputMethod,
    cvFile,
    setCvFile,
    manualData,
    updateManualData,
    additionalSkills,
    addSkill,
    removeSkill,
    isSubmitting,
    submitOnboarding
  };
};
