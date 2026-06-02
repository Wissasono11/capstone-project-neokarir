import api, { AI_BASE_URL, USE_MOCK } from '../../../config/api';
import { MOCK_DOMAINS, generateMockPredictions } from '../utils/mockDataGenerator';

/**
 * Job Market Forecast Service
 * Integrates with the AI Engine backend for Job Market Trends.
 */
export const jobsMarketService = {
  getDomains: async () => {
    if (USE_MOCK) {
      return {
        status: 'success',
        domains: MOCK_DOMAINS,
      };
    }

    try {
      const response = await api.get('/market/trend/domains');
      return response.data || response;
    } catch (error) {
      console.warn('Failed to fetch real domains, falling back to mock.', error);
      return {
        status: 'success',
        domains: MOCK_DOMAINS,
        isFallback: true,
      };
    }
  },

  getForecast: async (domain, nMonths) => {
    const domainParam = domain === 'all' ? null : domain;

    if (USE_MOCK) {
      // Simulate small delay
      await new Promise((resolve) => setTimeout(resolve, 400));
      const predictions = generateMockPredictions(nMonths, domainParam);
      return {
        status: 'success',
        predictions,
        top_domain: domainParam || 'Data Science & AI',
        generated_at: new Date().toISOString(),
        isSimulated: true,
      };
    }

    try {
      const response = await api.post('/market/trend/forecast', {
        n_months: nMonths,
        domain: domainParam,
      });

      const parsedData = response.data || response;
      return {
        ...parsedData,
        isSimulated: false,
      };
    } catch (error) {
      console.warn('Failed to fetch real forecast, falling back to mock.', error);
      const predictions = generateMockPredictions(nMonths, domainParam);
      return {
        status: 'success',
        predictions,
        top_domain: domainParam || 'Data Science & AI',
        generated_at: new Date().toISOString(),
        isSimulated: true,
      };
    }
  },
};
