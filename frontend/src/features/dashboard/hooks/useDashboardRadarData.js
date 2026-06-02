import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';

export const useDashboardRadarData = (matchedJob) => {
  if (!matchedJob) return [];

  const requiredSkills = matchedJob.required_skills || [];
  const matchedSkills = matchedJob.matched_skills || matchedJob.matchedSkills || [];

  return requiredSkills.map(skill => {
    const isMatched = matchedSkills.includes(skill);
    return {
      subject: skill,
      A: isMatched ? 90 : 50,
      fullMark: 100
    };
  });
};
