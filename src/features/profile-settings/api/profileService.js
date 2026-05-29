import api, { USE_MOCK } from '../../../config/api';

/**
 * Profile and Settings API service.
 * Connects profile tabs with mock fallbacks and updates global AuthContext when profiles change.
 */
export const profileService = {
  updatePersonalInfo: async (personalData) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        user: {
          name: personalData.fullName,
          email: personalData.email,
        },
      };
    }

    return api.put('/profile/personal', personalData);
  },

  updateCareerInfo: async (careerData) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        user: {
          role: careerData.currentRole,
          experience: careerData.experienceLevel,
        },
      };
    }

    return api.put('/profile/career', careerData);
  },

  updateSecurity: async (securityData) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: 'Security settings updated successfully',
      };
    }

    return api.put('/profile/security', securityData);
  },

  updatePreferences: async (preferencesData) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        preferences: preferencesData,
      };
    }

    return api.put('/profile/preferences', preferencesData);
  },
};
