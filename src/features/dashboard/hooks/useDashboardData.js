import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useAIProfiling } from '../../ai-profiling/hooks/useAIProfiling';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';
import { useDashboardRecommendations } from './useDashboardRecommendations';
import { useDashboardCompatibility } from './useDashboardCompatibility';
import { useDashboardTips } from './useDashboardTips';
import { useDashboardRadarData } from './useDashboardRadarData';

export const useDashboardData = () => {
  const { user } = useAuth();
  const { results } = useAIProfiling(); 
  const { overallReadiness } = useCareerRecommendations();

  const topRecommendations = useDashboardRecommendations();
  const { compatibilityScore, matchedJob } = useDashboardCompatibility();
  const dynamicTips = useDashboardTips(matchedJob);
  const radarData = useDashboardRadarData(matchedJob);

  // Simulated loading state — will be replaced with real API loading when backend is ready
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return {
    user,
    results,
    overallReadiness,
    topRecommendations,
    compatibilityScore,
    dynamicTips,
    radarData,
    isLoading
  };
};

