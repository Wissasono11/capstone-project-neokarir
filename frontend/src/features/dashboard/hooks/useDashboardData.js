import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useAIProfiling } from '../../ai-profiling/hooks/useAIProfiling';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';
import { useDashboardRecommendations } from './useDashboardRecommendations';
import { useDashboardCompatibility } from './useDashboardCompatibility';
import { useDashboardTips } from './useDashboardTips';
import { useSkillGap } from '../../skill-gap-analysis/hooks/useSkillGap';

export const useDashboardData = () => {
  const { user } = useAuth();
  const { results } = useAIProfiling(); 
  const { overallReadiness, isLoading: careerLoading } = useCareerRecommendations();

  const topRecommendations = useDashboardRecommendations();
  const { compatibilityScore: defaultCompatibility, matchedJob } = useDashboardCompatibility();
  
  const { radarData, heroData, isLoading: skillGapLoading, learningPath } = useSkillGap();
  const dynamicTips = useDashboardTips(matchedJob, learningPath);
  
  const compatibilityScore = heroData?.overallReadiness || defaultCompatibility;

  const isLoading = careerLoading || skillGapLoading;

  return {
    user,
    results,
    overallReadiness: heroData?.overallReadiness || overallReadiness,
    topRecommendations,
    compatibilityScore,
    dynamicTips,
    radarData,
    isLoading
  };
};

