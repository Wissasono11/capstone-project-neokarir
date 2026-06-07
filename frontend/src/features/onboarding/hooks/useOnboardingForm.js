import { useState, useEffect } from 'react';
import { replace, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { cvAnalyzerService } from '../../cv-analyzer/api/cvAnalyzerService';
import { profileService } from '../../profile-settings/api/profileService';
import { useToast } from '../../../contexts/ToastContext';
import { EXPERIENCE_LEVELS, EDUCATION_LEVELS } from '../data/onboardingData';

const fuzzyMatchLevel = (raw, levels, keywordMap) => {
  if (!raw) return '';
  const lower = raw.toLowerCase().trim();

  const exact = levels.find(l => l.toLowerCase() === lower);
  if (exact) return exact;

  for (const [index, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(kw => lower.includes(kw))) return levels[index] ?? '';
  }

  return levels.find(l =>
    l.toLowerCase().includes(lower) || lower.includes(l.toLowerCase())
  ) || raw;
};

const EXP_KEYWORDS = {
  0: ['belum', 'fresh', 'sedang belajar'],
  1: ['< 1', '<1', 'kurang dari 1', 'magang', 'internship'],
  2: ['1-3', '1 - 3', 'junior'],
  3: ['3', 'mid', 'senior', '> 5', '3-5'],
};

const EDU_KEYWORDS = {
  3: ['s2', 's3', 'master', 'doktor'],
  2: ['s1', 'sarjana', 'bachelor', 'd4'],
  1: ['d3', 'diploma'],
  0: ['sma', 'smk', 'smp', 'sekolah'],
  4: ['sertifikasi', 'bootcamp', 'profesional'],
};

const normalizeExperience = (raw) => fuzzyMatchLevel(raw, EXPERIENCE_LEVELS, EXP_KEYWORDS);
const normalizeEducation = (raw) => {
  const lower = (raw || '').toLowerCase().trim();
  if (['tidak', 'belum', '-'].some(kw => lower.includes(kw))) return '';
  return fuzzyMatchLevel(raw, EDUCATION_LEVELS, EDU_KEYWORDS);
};

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
  const { user, updateProfile, completeOnboarding, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, success } = useToast();
  const isReprocessingFlow = user?.profile_data?.has_completed_once === true || user?.profile_data?.is_onboarding_completed === false || location.state?.reprocess || location.state?.fromSettings;

  // Pre-populate form if the user is reprocessing and has existing profile data
  const [isPrepopulated, setIsPrepopulated] = useState(false);

  useEffect(() => {
    if (user && isReprocessingFlow && !isPrepopulated) {
      const pData = user.profile_data || {};
      if (pData.career_goal) setCareerGoal(pData.career_goal);
      if (pData.input_method) setInputMethod(pData.input_method);
      
      const skillsArray = pData.owned_skills || (user.skills_summary ? user.skills_summary.split(',').map(s => s.trim()).filter(Boolean) : []);
      
      setManualData({
        domain: pData.target_domain || user.target_domain || '',
        role: pData.target_role || user.target_role || '',
        techStack: skillsArray,
        experience: pData.user_experience || user.experience || '',
        education: pData.user_education || user.education || ''
      });
      
      setCvData({
        fullName: user.name || '',
        targetDomain: pData.target_domain || user.target_domain || '',
        targetRole: pData.target_role || user.target_role || '',
        skills: skillsArray,
        techStack: skillsArray,
        experience: pData.user_experience || user.experience || '',
        education: pData.user_education || user.education || ''
      });

      setIsPrepopulated(true);
    }
  }, [user, isReprocessingFlow, isPrepopulated]);

  const nextStep = async () => {
    if (currentStep === 2 && inputMethod === 'upload') {
      if (!cvFile) {
        error("Silakan unggah CV terlebih dahulu");
        return;
      }
      setIsAnalyzing(true);
      try {
        const response = await cvAnalyzerService.uploadAndAnalyze(cvFile, () => {});
        const data = response.data || response.results || response || {};
        const profileData = data.profile || data.profile_data || data || {};
        
        // Debug: log AI response structure to help troubleshoot future issues
        if (process.env.NODE_ENV === 'development') {
          console.log('[CV Analysis] Raw response:', response);
          console.log('[CV Analysis] Extracted profileData:', profileData);
        }

        // Robust field extraction with multiple fallback field names
        const rawExperience = profileData.user_experience || profileData.experience || profileData.experience_level || data.user_experience || '';
        const rawEducation = profileData.user_education || profileData.education || profileData.education_level || data.user_education || '';

        setCvData({
          fullName: profileData.user_name || profileData.full_name || profileData.name || data.full_name || data.user_name || '',
          targetDomain: profileData.target_domain || profileData.domain || profileData.suggested_domain || data.target_domain || '',
          targetRole: profileData.target_role || profileData.role || profileData.suggested_role || data.target_role || '',
          skills: profileData.owned_skills || profileData.skills || data.owned_skills || [],
          techStack: profileData.owned_skills || profileData.skills || data.owned_skills || [],
          experience: normalizeExperience(rawExperience),
          education: normalizeEducation(rawEducation),
        });
        setCurrentStep(prev => prev + 1);
      } catch (err) {
        error(err.response?.data?.message || err.message || "Gagal memproses CV");
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      if (currentStep < 3) setCurrentStep(prev => prev + 1);
    }
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
    try {
      // Combine manual data tech stack, cv skills and additional skills
      const combinedSkills = Array.from(new Set([
        ...manualData.techStack, 
        ...(inputMethod === 'upload' ? (cvData.techStack || cvData.skills) : []),
        ...additionalSkills
      ])).filter(Boolean);
      
      const domain = inputMethod === 'upload' ? cvData.targetDomain : manualData.domain;
      const targetRole = inputMethod === 'upload' ? cvData.targetRole : (manualData.role || (careerGoal === 'first-job' ? 'Junior Engineer' : 'Engineer'));
      const experience = inputMethod === 'upload' ? (cvData.experience || 'Belum ada') : (manualData.experience || 'Belum ada');
      const education = inputMethod === 'upload' ? (cvData.education || 'S1') : (manualData.education || 'S1');
      const fullName = inputMethod === 'upload'
        ? (cvData.fullName || user?.name || user?.user_metadata?.full_name || '')
        : (user?.name || user?.user_metadata?.full_name || '');
      
      // current_role: for new users, use target_role as starting point
      const currentRole = targetRole;

      // Profile data to save
      const profileData = {
        full_name: fullName || undefined,
        current_role: currentRole,
        target_role: targetRole,
        target_domain: domain,
        education_level: education,
        skills_summary: combinedSkills.join(', '),
        profile_data: {
          career_goal: careerGoal,
          input_method: inputMethod,
          owned_skills: combinedSkills,
          user_experience: experience,
          user_education: education,
          target_domain: domain,
          target_role: targetRole,
          status: 'Open to Work',
          has_completed_once: true,
          is_onboarding_completed: true
        }
      };
      
      if (isReprocessingFlow) {
        // Update backend with the full profile
        await profileService.updateProfile(profileData);
        
        // Update frontend state
        completeOnboarding({
          name: fullName || 'User',
          role: currentRole,
          current_role: currentRole,
          target_role: targetRole,
          target_domain: domain,
          experience,
          education,
          skills_summary: combinedSkills.join(', '),
          profile_data: profileData.profile_data
        });
        
        // Sync auth user context with DB profile
        await refreshUserProfile();
        
        try {
          // Trigger AI analysis with the new profile data before redirecting
          const { default: api } = await import('../../../config/api');
          await Promise.all([
            api.post('/recommendation/generate').catch(e => console.warn('Recommendation gen failed', e)),
            api.post('/skillgap/analyze', {}).catch(e => console.warn('Skillgap analyze failed', e))
          ]);
        } catch (e) {
          console.warn("AI pre-calculation failed, continuing to next page anyway.", e);
        }
        
        success("Profil berhasil disimpan!");
        navigate('/dashboard', { replace: true, state: { fromOnboarding: true } });
      } else {
        success("Profil berhasil disimpan!");
        navigate('/ai-career-profiling', { 
          replace: true, 
          state: { 
            reprocess: true, 
            pendingProfileData: profileData 
          } 
        });
      }
    } catch (err) {
      error(err.response?.data?.message || err.message || "Gagal menyimpan profil");
    } finally {
      setIsSubmitting(false);
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
