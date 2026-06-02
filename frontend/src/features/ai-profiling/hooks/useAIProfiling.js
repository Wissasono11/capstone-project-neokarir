import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';
import { useSkillGap } from '../../skill-gap-analysis/hooks/useSkillGap';

export const useAIProfiling = () => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('Membaca data profile...');

  const { recommendations, overallReadiness: defaultOverallReadiness } = useCareerRecommendations();
  const { radarData, learningPath, heroData } = useSkillGap();
  const [profileScore, setProfileScore] = useState(null);

  useEffect(() => {
    const fetchProfileScore = async () => {
      try {
        const { default: api } = await import('../../../config/api');
        const response = await api.get('/profile/me/score');
        if (response.data && response.data.score !== undefined) {
           setProfileScore(response.data.score);
        }
      } catch (err) {
        console.warn("Failed to fetch profile score", err);
      }
    };
    
    if (user) {
      fetchProfileScore();
    }
  }, [user]);

  useEffect(() => {
    // Mock processing sequence
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress === 30) setProcessingStatus('Analisis skill dan pengalaman Anda...');
      if (currentProgress === 60) setProcessingStatus('Pemetaan ke standar industri...');
      if (currentProgress === 85) setProcessingStatus('Pembuatan rekomendasi yang dipersonalisasi...');
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsProcessing(false), 500);
      }
    }, 60); // Total ~3 seconds

    return () => clearInterval(interval);
  }, []);

  // Map recommendations to the topCareers format (limit to max 2 items)
  const topCareers = recommendations.slice(0, 2).map(rec => ({
    id: rec.job_id,
    title: rec.job_title,
    company: rec.company,
    matchScore: rec.matchScore,
    icon: rec.logo,
    requiredSkills: rec.required_skills
  }));

  // Map learningPath to the correct format for LearningPathSection (limit to max 2 items)
  const mappedLearningPath = learningPath.slice(0, 2).map(course => ({
    title: course.judul,
    platform: course.platform,
    duration: course.durasi,
    tag: course.prioritas === 'Tinggi' ? 'High Priority' : 'Medium Priority'
  }));

  const results = {
    overallScore: profileScore !== null ? profileScore : (heroData?.overallReadiness || defaultOverallReadiness || 81),
    topCareers,
    skillGap: radarData,
    learningPath: mappedLearningPath
  };

  return {
    isProcessing,
    progress,
    processingStatus,
    results,
    user
  };
};
