import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { MASTER_JOBS } from '../data/recommendationData';
import { useCompletedCourses } from './useCompletedCourses';

export const useCareerRecommendations = () => {
  const { user } = useAuth();
  
  const [recommendations, setRecommendations] = useState([]);
  
  // 1. Manage checklist courses via custom hook
  const { completedCourses, toggleCourse } = useCompletedCourses(user?.email);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedMatchFilter, setSelectedMatchFilter] = useState('all'); // 'all' | 'high' (>=80%) | 'medium' (50-79%) | 'low' (<50%)
  const [activeJobId, setActiveJobId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recommendations from API
  useEffect(() => {
    const fetchRecs = async () => {
      setIsLoading(true);
      try {
        const { careerService } = await import('../api/careerService');
        const data = await careerService.getRecommendations();
        setRecommendations(data || []);
      } catch (error) {
        console.error("Failed to load recommendations", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchRecs();
    }
  }, [user]);

  // Dynamically calculate match score for each recommendation based on course completions
  const recommendationsWithDynamicScore = recommendations.map(rec => {
    const roadmap = rec.learning_roadmap || rec.courses || [];
    const total = roadmap.length;
    if (total === 0) return rec;

    const completed = roadmap.filter(c => {
      const cId = c.id || ((c.skill || '') + '_' + (c.judul || '')).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      return completedCourses.includes(cId);
    }).length;
    const baseScore = Number(rec.matchScore || rec.score || 0);
    const remainingGap = 100 - baseScore;
    const completionPct = completed / total;
    const dynamicScore = Math.min(100, Math.round(baseScore + (remainingGap * completionPct)));

    return {
      ...rec,
      matchScore: dynamicScore
    };
  });

  // 3. Filter recommendations based on search query, domain, and match filter
  const filteredRecommendations = recommendationsWithDynamicScore.filter(rec => {
    // Search query match (job title or company or skill)
    const matchesSearch = searchQuery === '' || 
      rec.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(rec.required_skills) && rec.required_skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())));

    // Domain filter
    const matchesDomain = selectedDomain === 'All' || rec.job_domain === selectedDomain;

    // Match Score filter
    let matchesMatchFilter = true;
    if (selectedMatchFilter === 'high') {
      matchesMatchFilter = rec.matchScore >= 80;
    } else if (selectedMatchFilter === 'medium') {
      matchesMatchFilter = rec.matchScore >= 50 && rec.matchScore < 80;
    } else if (selectedMatchFilter === 'low') {
      matchesMatchFilter = rec.matchScore < 50;
    }

    return matchesSearch && matchesDomain && matchesMatchFilter;
  });

  // Sort by match score descending
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => b.matchScore - a.matchScore);

  // Find active job detail
  const activeJob = recommendationsWithDynamicScore.find(rec => rec.job_id === activeJobId) || null;

  // Domain categories list for filters
  const domains = ['All', ...new Set(recommendationsWithDynamicScore.map(job => job.job_domain).filter(Boolean))];

  // Calculate overall readiness (average of top 3 recommended match scores)
  const topThreeScores = sortedRecommendations.slice(0, 3).map(r => r.matchScore);
  const overallReadiness = topThreeScores.length > 0 
    ? Math.round(topThreeScores.reduce((a, b) => a + b, 0) / topThreeScores.length)
    : 0;

  return {
    isLoading,
    recommendations: sortedRecommendations,
    activeJob,
    activeJobId,
    setActiveJobId,
    completedCourses,
    toggleCourse,
    searchQuery,
    setSearchQuery,
    selectedDomain,
    setSelectedDomain,
    selectedMatchFilter,
    setSelectedMatchFilter,
    domains,
    overallReadiness,
    user
  };
};
