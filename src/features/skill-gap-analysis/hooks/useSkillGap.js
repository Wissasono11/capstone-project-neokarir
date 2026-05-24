import { useState, useEffect } from 'react';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';
import { useSkillGapMetrics } from './useSkillGapMetrics';
import { useSkillGapRecommendations } from './useSkillGapRecommendations';

export const useSkillGap = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Consume our new unified career recommendations hook
  const { 
    recommendations, 
    completedCourses, 
    toggleCourse, 
    user 
  } = useCareerRecommendations();

  useEffect(() => {
    // Sync loading state with recommendations hook loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Find targeted job based on user target role
  const userTargetRole = user?.role || 'Frontend Engineer';
  const targetJob = recommendations.find(
    rec => rec.job_title.toLowerCase() === userTargetRole.toLowerCase()
  ) || recommendations.find(
    rec => rec.job_title.toLowerCase().includes(userTargetRole.toLowerCase())
  ) || recommendations[0];

  // 1. Calculate metrics (hero, radar, breakdown)
  const { heroData, radarData, skillBreakdown } = useSkillGapMetrics(targetJob, user);

  // 2. Calculate recommendations (actions, cards, path)
  const { recommendedActions, missingSkillCards, learningPath } = useSkillGapRecommendations(targetJob);

  return {
    isLoading,
    heroData,
    radarData,
    skillBreakdown,
    recommendedActions,
    missingSkillCards,
    learningPath,
    completedCourses,
    toggleCourse
  };
};
