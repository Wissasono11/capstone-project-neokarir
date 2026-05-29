import api, { USE_MOCK } from '../../../config/api';
import { MASTER_JOBS } from '../data/recommendationData';

/**
 * Career Recommendation Service
 * Retrieves career tracks, match scores, and recommended study paths.
 */
export const careerService = {
  getRecommendations: async (userContext) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MASTER_JOBS;
    }

    return api.post('/career/recommendations', {
      skills: userContext?.skills,
      role: userContext?.role,
    });
  },

  getCompletedCourses: async (email) => {
    if (USE_MOCK) {
      const stored = localStorage.getItem(`completed_courses_${email}`);
      return stored ? JSON.parse(stored) : [];
    }

    return api.get(`/career/completed-courses?email=${email}`);
  },

  toggleCourse: async (email, courseId) => {
    if (USE_MOCK) {
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
    }

    return api.post('/career/toggle-course', { email, courseId });
  },
};
