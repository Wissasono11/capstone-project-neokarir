import { useState, useEffect } from 'react';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';
import { useSkillGapMetrics } from './useSkillGapMetrics';
import { useSkillGapRecommendations } from './useSkillGapRecommendations';

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

  // 3. Transform & Override radar chart data (Support dual series: A (current) and B (required))
  const finalRawRadarData = rawRadarData || defaultRadarData;
  const radarData = Array.isArray(finalRawRadarData) 
    ? finalRawRadarData.map(item => ({
        subject: item.category || item.subject,
        A: item.current !== undefined ? item.current : (item.A !== undefined ? item.A : 50),
        B: item.required !== undefined ? item.required : (item.B !== undefined ? item.B : 85),
        fullMark: 100
      }))
    : defaultRadarData;

  // 4. Normalize recommended actions to array
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
    
  const heroData = skillGapData?.analysis_result ? {
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

  const skillBreakdown = skillGapData?.analysis_result?.skill_breakdown || defaultSkillBreakdown;

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

  // 5. Use learning path from AI-2 (via backend) with fallback to default recommendation learning path
  const learningPath = skillGapData?.learning_roadmap || defaultLearningPath;

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
