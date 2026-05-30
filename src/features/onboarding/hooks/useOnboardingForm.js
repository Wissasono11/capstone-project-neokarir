import { useState } from 'react';
import { replace, useNavigate, useLocation } from 'react-router-dom';
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
    education: ''
  });

  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [cvData, setCvData] = useState({
    fullName: 'Bayu Wicaksono',
    targetDomain: 'Web Development',
    targetRole: 'Frontend Engineer',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js'],
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js'],
    experience: '< 1 Tahun (Termasuk Magang/Internship)',
    education: 'S1'
  });

  const { completeOnboarding, updateProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasCompletedOnce = localStorage.getItem('neokarir_has_completed_onboarding_once') === 'true';
  const isReprocessingFlow = hasCompletedOnce || location.state?.reprocess === true;

  const nextStep = async () => {
    if (currentStep === 2 && inputMethod === 'upload') {
      setIsAnalyzing(true);
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsAnalyzing(false);
    }
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

  const updateCvData = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
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

    // Combine manual data tech stack, cv skills and additional skills
    const combinedSkills = Array.from(new Set([
      ...manualData.techStack,
      ...(inputMethod === 'upload' ? (cvData.techStack || cvData.skills) : []),
      ...additionalSkills
    ]));

    // Profile data to save
    const profileData = {
      careerGoal,
      inputMethod,
      fullName: inputMethod === 'upload' ? cvData.fullName : 'User',
      skills: combinedSkills,
      domain: inputMethod === 'upload' ? cvData.targetDomain : manualData.domain,
      role: inputMethod === 'upload' ? cvData.targetRole : (manualData.role || (careerGoal === 'first-job' ? 'Junior Engineer' : 'Engineer')),
      experience: inputMethod === 'upload' ? (cvData.experience || 'Belum ada (Fresh Graduate / Sedang belajar)') : (manualData.experience || 'Belum ada (Fresh Graduate / Sedang belajar)'),
      education: inputMethod === 'upload' ? (cvData.education || 'S1') : (manualData.education || 'S1'),
      status: 'Open to Work'
    };

    if (isReprocessingFlow) {
      completeOnboarding(profileData);
      navigate('/dashboard', { replace: true });
    } else {
      updateProfile(profileData);
      navigate('/ai-career-profiling', { replace: true });
    }
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
    cvData,
    updateCvData,
    additionalSkills,
    addSkill,
    removeSkill,
    isSubmitting,
    isAnalyzing,
    submitOnboarding
  };
};
