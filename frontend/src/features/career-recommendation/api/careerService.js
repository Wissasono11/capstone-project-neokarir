import api, { USE_MOCK } from '../../../config/api';
import { MASTER_JOBS } from '../data/recommendationData';

/**
 * Career Recommendation Service
 * Retrieves career tracks, match scores, and recommended study paths.
 */
export const careerService = {
  getRecommendations: async () => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MASTER_JOBS;
    }

    try {
      // Fetch existing recommendations
      const response = await api.get('/recommendation/me');
      let recs = response?.data?.recommendations || response?.recommendations || [];
      
      // If none exist, auto-generate them
      if (!recs || recs.length === 0) {
        const genResponse = await api.post('/recommendation/generate');
        recs = genResponse?.data?.recommendations || genResponse?.recommendations || [];
      }
      
      return recs.map(rec => {
        // Map backend format to frontend format
        const metadata = rec.metadata || {};
        const reqSkills = metadata.required_skills || rec.required_skills || [];
        const matchedSkills = rec.matched_skills || [];
        const missingSkills = rec.missing_skills || [];
        
        return {
          ...metadata,
          job_id: rec.job_id,
          job_title: rec.title || metadata.job_title || 'Recommended Job',
          job_domain: metadata.job_domain || 'Teknologi Informasi',
          company: metadata.company || 'Perusahaan Terkait',
          matchScore: Number(rec.score || metadata.match_score || 0),
          logo: metadata.logo || '',
          min_experience: metadata.min_experience || 'Tidak Ditentukan',
          min_education: metadata.min_education || 'Tidak Ditentukan',
          matchedSkills: matchedSkills,
          matched_skills: matchedSkills,
          missing_skills: missingSkills,
          required_skills: reqSkills,
          courses: metadata.courses || [],
          matchBreakdown: metadata.match_breakdown || {
            skills: reqSkills.length > 0 ? Math.round((matchedSkills.length / reqSkills.length) * 100) : 50,
            experience: 100,
            education: 100
          },
          learning_roadmap: metadata.learning_roadmap || []
        };
      });
    } catch (error) {
      console.error('Failed to get career recommendations:', error);
      return [];
    }
  },

  getCompletedCourses: async (email) => {
    // Save locally since this is a frontend-only interactive checklist feature
    const stored = localStorage.getItem(`completed_courses_${email}`);
    return stored ? JSON.parse(stored) : [];
  },

  toggleCourse: async (email, courseId) => {
    const key = `completed_courses_${email}`;
    const stored = localStorage.getItem(key);
    let list = stored ? JSON.parse(stored) : [];
    if (list.includes(courseId)) {
      list = list.filter((id) => id !== courseId);
    } else {
      list.push(courseId);
    }
    localStorage.setItem(key, JSON.stringify(list));
    return list;
  },
};
