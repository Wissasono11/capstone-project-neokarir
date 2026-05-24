import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';

export const useDashboardRadarData = (matchedJob) => {
  if (!matchedJob) return [];

  return matchedJob.required_skills.map(skill => {
    const isMatched = matchedJob.matchedSkills.includes(skill);
    return {
      subject: skill,
      A: isMatched ? 95 : 45,
      fullMark: 100
    };
  });
};
