import { getSkillCategory } from '../data/skillTaxonomy';

export const useSkillGapMetrics = (targetJob, user, ownedSkills, radarChartData) => {
  if (!targetJob) {
    return {
      heroData: null,
      radarData: [],
      skillBreakdown: []
    };
  }

  const matchedSkillsCount = targetJob?.matched_skills?.length || 0;
  const totalRequiredSkills = targetJob?.required_skills?.length || 0;
  const missingSkillsCount = targetJob?.missing_skills?.length || 0;
  const overallScore = targetJob?.matchScore || 0;

  // 1. Calculate Hero Data
  const heroData = {
    overallReadiness: overallScore,
    targetRole: targetJob?.job_title || 'Unknown Role',
    targetDomain: targetJob?.job_domain || 'General',
    matchedSkillsCount,
    totalRequiredSkills,
    missingSkillsCount,
    experienceGap: {
      current: user?.experience || 'Fresh Graduate',
      required: targetJob?.min_experience || targetJob?.metadata?.min_experience || 'Tidak Ditentukan',
      hasGap: (targetJob?.match_breakdown?.experience || 0) < 100
    },
    educationMatch: {
      current: user?.profile_data?.last_education || user?.education || 'S1/D4',
      required: targetJob?.min_education || targetJob?.metadata?.min_education || 'Tidak Ditentukan',
      hasGap: (targetJob?.match_breakdown?.education || 0) < 100
    },
    readinessLevel: overallScore >= 90 ? "Siap Kerja" : overallScore >= 70 ? "Hampir Siap" : "Perlu Belajar"
  };

  // 2. Calculate Radar Data
  const radarData = (targetJob?.required_skills || []).map(skill => {
    const isMatched = (targetJob?.matched_skills || []).includes(skill);
    return {
      subject: skill,
      A: isMatched ? 90 : 50,
      B: 85,
      fullMark: 100
    };
  });

  // 3. Calculate Skill Breakdown List using real radarChartData if available
  const skillBreakdown = (targetJob?.required_skills || []).map(skill => {
    const isMatched = (targetJob?.matched_skills || []).includes(skill);
    let currentVal = isMatched ? 90 : 50;
    let requiredVal = 85;

    if (Array.isArray(radarChartData)) {
      const categoryName = getSkillCategory(targetJob.job_domain || targetJob.job_title, skill);
      
      const matchedCategory = radarChartData.find(item => {
        const catName = (item.category || item.subject || '').toLowerCase().trim();
        return catName === categoryName.toLowerCase().trim();
      });

      if (matchedCategory) {
        currentVal = matchedCategory.current !== undefined ? matchedCategory.current : (matchedCategory.A !== undefined ? matchedCategory.A : currentVal);
        requiredVal = matchedCategory.required !== undefined ? matchedCategory.required : (matchedCategory.B !== undefined ? matchedCategory.B : requiredVal);
      }
    }

    const gap = currentVal - requiredVal;

    return {
      skill,
      current: currentVal,
      required: requiredVal,
      gap,
      trend: gap >= 0 ? "up" : "down"
    };
  });

  return {
    heroData,
    radarData,
    skillBreakdown
  };
};
