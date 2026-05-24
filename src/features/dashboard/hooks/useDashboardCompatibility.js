import { useAuth } from '../../../contexts/AuthContext';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';

export const useDashboardCompatibility = () => {
  const { user } = useAuth();
  const { recommendations } = useCareerRecommendations();

  const userTargetRole = user?.role || 'Frontend Engineer';
  const matchedJob = recommendations.find(
    rec => rec.job_title.toLowerCase() === userTargetRole.toLowerCase()
  ) || recommendations.find(
    rec => rec.job_title.toLowerCase().includes(userTargetRole.toLowerCase())
  ) || recommendations[0];
  
  const compatibilityScore = matchedJob ? matchedJob.matchScore : 75;

  return {
    compatibilityScore,
    userTargetRole,
    matchedJob
  };
};
