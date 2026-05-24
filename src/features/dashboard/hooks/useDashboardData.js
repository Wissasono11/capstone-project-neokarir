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

  return {
    user,
    results,
    overallReadiness,
    topRecommendations,
    compatibilityScore,
    dynamicTips,
    radarData
  };
};
