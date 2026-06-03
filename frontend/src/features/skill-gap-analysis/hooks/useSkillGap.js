import { useState, useEffect } from 'react';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';
import { useSkillGapMetrics } from './useSkillGapMetrics';
import { useSkillGapRecommendations } from './useSkillGapRecommendations';
import { getSkillCategory } from '../data/skillTaxonomy';

export const useSkillGap = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Consume our new unified career recommendations hook
  const { 
    recommendations, 
    completedCourses, 
    toggleCourse, 
    user,
    isLoading: isRecommendationsLoading
  } = useCareerRecommendations();

  const [skillGapData, setSkillGapData] = useState(null);

  useEffect(() => {
    const fetchSkillGap = async () => {
      setIsLoading(true);
      try {
        const { skillGapService } = await import('../api/skillGapService');
        let data = await skillGapService.getMySkillGap();
        if (!data) {
           data = await skillGapService.analyzeSkillGap({});
        }
        setSkillGapData(data);
      } catch (error) {
        console.error("Failed to fetch skill gap analysis", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user && !isRecommendationsLoading) {
      fetchSkillGap();
    } else if (!user && !isRecommendationsLoading) {
      setIsLoading(false);
    }
  }, [user, isRecommendationsLoading]);

  // Find targeted job based on user target role or recommendations
  const userTargetRole = skillGapData?.target_role || user?.role || 'Frontend Engineer';
  const targetJob = recommendations.find(
    rec => rec.job_title.toLowerCase() === userTargetRole.toLowerCase()
  ) || recommendations.find(
    rec => rec.job_title.toLowerCase().includes(userTargetRole.toLowerCase())
  ) || recommendations[0];

  const ownedSkills = skillGapData?.owned_skills || user?.profile_data?.owned_skills || [];

  // Construct target job from skillGapData if recommendations are missing/loading
  // We prioritize skillGapData to ensure match score and skills match the target career analysis precisely.
  const resolvedTargetJob = (skillGapData ? {
    job_title: skillGapData.target_role,
    job_domain: skillGapData.target_domain,
    matched_skills: skillGapData.matched_skills || [],
    missing_skills: skillGapData.missing_skills || [],
    required_skills: skillGapData.analysis_result?.required_skills || [
      ...(skillGapData.matched_skills || []),
      ...(skillGapData.missing_skills || [])
    ],
    matchScore: skillGapData.match_score,
    min_education: skillGapData.analysis_result?.min_education || 'Tidak Ditentukan',
    min_experience: skillGapData.analysis_result?.min_experience || 'Tidak Ditentukan',
    learning_roadmap: skillGapData.learning_roadmap || []
  } : null) || targetJob;

  const rawRadarData = skillGapData?.analysis_result?.radar_chart_data;

  // 1. Calculate metrics (hero, radar, breakdown)
  const { heroData: defaultHeroData, radarData: defaultRadarData, skillBreakdown: defaultSkillBreakdown } = useSkillGapMetrics(resolvedTargetJob, user, ownedSkills, rawRadarData);

  // 2. Calculate recommendations (actions, cards, path)
  const { recommendedActions: defaultActions, missingSkillCards: defaultMissingSkillCards, learningPath: defaultLearningPath } = useSkillGapRecommendations(resolvedTargetJob, ownedSkills, rawRadarData);

  // 3. Normalize learning path and ensure IDs are set
  const rawLearningPath = skillGapData?.learning_roadmap || defaultLearningPath || [];
  const learningPath = rawLearningPath.map(course => {
    const stableId = course.id || ((course.skill || '') + '_' + (course.judul || '')).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    return {
      ...course,
      id: stableId
    };
  });

  // Helper to match courses for a radar subject
  const getCoursesForRadarSubject = (subject, path, domainName) => {
    const normSubject = subject.toLowerCase().trim();
    return path.filter(course => {
      const courseSkill = (course.skill || '').toLowerCase().trim();
      if (courseSkill === normSubject) return true;
      
      const courseCategory = getSkillCategory(domainName, course.skill).toLowerCase().trim();
      if (courseCategory === normSubject) return true;
      
      return false;
    });
  };

  // 4. Transform & Override radar chart data (Support dual series: A (current) and B (required))
  const finalRawRadarData = rawRadarData || defaultRadarData;
  const domainName = resolvedTargetJob?.job_domain || resolvedTargetJob?.job_title || 'General';
  const radarData = (Array.isArray(finalRawRadarData) ? finalRawRadarData : defaultRadarData).map(item => {
    const subject = item.category || item.subject || '';
    const baseA = item.current !== undefined ? item.current : (item.A !== undefined ? item.A : 50);
    const B = item.required !== undefined ? item.required : (item.B !== undefined ? item.B : 85);
    
    // Scale A based on completed courses matching this subject/category
    const matchingCourses = getCoursesForRadarSubject(subject, learningPath, domainName);
    let A = baseA;
    if (matchingCourses.length > 0) {
      const completed = matchingCourses.filter(c => completedCourses.includes(c.id)).length;
      const remaining = 100 - baseA;
      A = Math.min(100, Math.round(baseA + (remaining * (completed / matchingCourses.length))));
    }
    
    return {
      subject,
      A,
      B,
      fullMark: 100
    };
  });

  // 5. Normalize recommended actions to array
  const rawActions = skillGapData?.analysis_result?.recommended_actions || defaultActions;
  const normalizeActions = (actionsInput) => {
    if (!actionsInput) return [];
    if (Array.isArray(actionsInput)) {
      return actionsInput;
    }
    const actions = [];
    if (actionsInput.critical_gap || actionsInput.critical) {
      actions.push({
        type: 'critical',
        title: 'Gap Kritis',
        description: actionsInput.critical_gap || actionsInput.critical
      });
    }
    if (actionsInput.needs_improvement || actionsInput.improvement || actionsInput.improvements) {
      actions.push({
        type: 'improvement',
        title: 'Butuh Peningkatan',
        description: actionsInput.needs_improvement || actionsInput.improvements || actionsInput.improvement
      });
    }
    if (actionsInput.strengths || actionsInput.strength) {
      actions.push({
        type: 'strength',
        title: 'Keunggulan',
        description: actionsInput.strengths || actionsInput.strength
      });
    }
    return actions;
  };
  const recommendedActions = normalizeActions(rawActions);
    
  // 6. Calculate Dynamic Hero Data
  const baseHeroData = skillGapData?.analysis_result ? {
    overallReadiness: skillGapData.analysis_result.readiness_score || skillGapData.match_score || 0,
    targetRole: skillGapData.analysis_result.target_role || skillGapData.target_role,
    targetDomain: skillGapData.analysis_result.target_domain || skillGapData.target_domain,
    matchedSkillsCount: skillGapData.analysis_result.skill_match?.matched_count || 0,
    totalRequiredSkills: skillGapData.analysis_result.skill_match?.total_count || 0,
    missingSkillsCount: skillGapData.analysis_result.skill_match?.missing_count || 0,
    experienceGap: {
      current: skillGapData.analysis_result.experience_match?.current || 'Belum ada pengalaman',
      required: skillGapData.analysis_result.experience_match?.required || 'Tidak Ditentukan',
      hasGap: skillGapData.analysis_result.experience_match?.has_gap || false
    },
    educationMatch: {
      current: skillGapData.analysis_result.education_match?.current || 'Tidak Ditentukan',
      required: skillGapData.analysis_result.education_match?.required || 'Tidak Ditentukan',
      hasGap: skillGapData.analysis_result.education_match?.has_gap || false
    },
    readinessLevel: skillGapData.analysis_result.readiness_level || 'Perlu Persiapan'
  } : defaultHeroData;

  const baseScore = baseHeroData?.overallReadiness || 0;
  const remainingGap = 100 - baseScore;
  const completedCoursesCount = learningPath.filter(c => completedCourses.includes(c.id)).length;
  const dynamicReadinessScore = learningPath.length > 0 
    ? Math.min(100, Math.round(baseScore + (remainingGap * (completedCoursesCount / learningPath.length))))
    : baseScore;

  const heroData = baseHeroData ? {
    ...baseHeroData,
    overallReadiness: dynamicReadinessScore,
    readinessLevel: dynamicReadinessScore >= 90 ? "Siap Kerja" : dynamicReadinessScore >= 70 ? "Hampir Siap" : "Perlu Persiapan"
  } : null;

  // 7. Calculate Dynamic Skill Breakdown
  const rawSkillBreakdown = skillGapData?.analysis_result?.skill_breakdown || defaultSkillBreakdown || [];
  const skillBreakdown = rawSkillBreakdown.map(item => {
    const skillName = item.skill || item.name || '';
    const baseCurrent = item.current !== undefined ? item.current : 50;
    const required = item.required !== undefined ? item.required : 85;
    
    const matchingCourses = learningPath.filter(course => (course.skill || '').toLowerCase().trim() === skillName.toLowerCase().trim());
    let current = baseCurrent;
    if (matchingCourses.length > 0) {
      const completed = matchingCourses.filter(c => completedCourses.includes(c.id)).length;
      const remaining = 100 - baseCurrent;
      current = Math.min(100, Math.round(baseCurrent + (remaining * (completed / matchingCourses.length))));
    }
    
    const gap = current - required;
    return {
      skill: skillName,
      current,
      required,
      gap,
      trend: gap >= 0 ? "up" : "down"
    };
  });

  const missingSkillCards = skillGapData?.analysis_result?.detailed_skills_to_learn
    ? skillGapData.analysis_result.detailed_skills_to_learn.map(item => ({
        skill: item.skill,
        gap: item.gap,
        category: item.category || 'Umum',
        priority: item.priority || 'Medium',
        description: item.description,
        alasan: item.alasan,
        relatedSkills: item.relatedSkills || [],
        waktuBelajar: item.waktuBelajar || '4 - 6 Minggu'
      }))
    : defaultMissingSkillCards;

  const isOverallLoading = isLoading || isRecommendationsLoading;

  return {
    isLoading: isOverallLoading,
    heroData,
    radarData,
    skillBreakdown,
    recommendedActions,
    missingSkillCards,
    learningPath,
    completedCourses,
    toggleCourse,
    ownedSkills
  };
};
