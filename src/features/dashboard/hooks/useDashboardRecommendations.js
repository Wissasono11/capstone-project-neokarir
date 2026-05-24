import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';

export const useDashboardRecommendations = () => {
  const { recommendations } = useCareerRecommendations();

  return recommendations.slice(0, 3).map(rec => ({
    id: rec.job_id,
    title: rec.job_title,
    company: rec.company,
    matchScore: rec.matchScore,
    icon: rec.logo,
    requiredSkills: rec.required_skills
  }));
};
