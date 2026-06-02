import api, { USE_MOCK } from '../../../config/api';

/**
 * Skill Gap Service
 * Integrates with backend for skill gap analysis and recommendations.
 */
export const skillGapService = {
  getMySkillGap: async () => {
    if (USE_MOCK) {
      return null;
    }
    const response = await api.get('/skillgap/me');
    return response.data || null;
  },

  analyzeSkillGap: async (payload) => {
    if (USE_MOCK) {
      return null;
    }
    const response = await api.post('/skillgap/analyze', payload);
    return response.data || null;
  }
};
