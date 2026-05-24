import { useCareerRecommendations } from "../../career-recommendation/hooks/useCareerRecommendations";

export const useSkillGapMetrics = (targetJob, user) => {
  const { completedCourses } = useCareerRecommendations();
  if (!targetJob) {
    return {
      heroData: null,
      radarData: [],
      skillBreakdown: []
    };
  }

  const matchedSkillsCount = targetJob.matchedSkills.length;
  const totalRequiredSkills = targetJob.required_skills.length;
  const missingSkillsCount = targetJob.missingSkills.length;
  const overallScore = targetJob.matchScore;

  // 1. Calculate Hero Data
  const heroData = {
    overallReadiness: overallScore,
    targetRole: targetJob.job_title,
    targetDomain: targetJob.job_domain,
    matchedSkillsCount,
    totalRequiredSkills,
    missingSkillsCount,
    experienceGap: {
      current: user?.experience || 'Fresh Graduate',
      required: targetJob.min_experience,
      hasGap: targetJob.matchBreakdown.experience < 100
    },
    educationMatch: {
      current: user?.education || 'S1/D4',
      required: targetJob.min_education,
      hasGap: targetJob.matchBreakdown.education < 100
    },
    readinessLevel: overallScore >= 90 ? "Siap Kerja" : overallScore >= 70 ? "Hampir Siap" : "Perlu Belajar"
  };

  // 2. Calculate Radar Data
  const radarData = targetJob.required_skills.map(skill => {
    const isMatched = targetJob.matchedSkills.includes(skill);
    return {
      subject: skill,
      A: isMatched ? 90 : 50,
      fullMark: 100
    };
  });

  // 3. Calculate Skill Breakdown List
  const skillBreakdown = targetJob.required_skills.map(skill => {
    const isMatched = targetJob.matchedSkills.includes(skill);
    return {
      skill,
      current: isMatched ? 90 : 50,
      required: 85,
      gap: isMatched ? 5 : -35,
      trend: isMatched ? "up" : "down"
    };
  });

  return {
    heroData,
    radarData,
    skillBreakdown
  };
};
