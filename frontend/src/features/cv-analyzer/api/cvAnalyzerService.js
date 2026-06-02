import api, { USE_MOCK } from '../../../config/api';
import { mockResults } from '../data/cvAnalyzerConstants';

/**
 * CV Analyzer Service
 * Manages uploading CV documents and calling analysis endpoints.
 */
export const cvAnalyzerService = {
  uploadAndAnalyze: async (file, onProgressUpdate) => {
    if (USE_MOCK) {
      // Simulate multi-stage processing delays
      const steps = [
        { progress: 20, status: 'Uploading...' },
        { progress: 40, status: 'Extracting text...' },
        { progress: 60, status: 'Analyzing content...' },
        { progress: 80, status: 'Matching competencies...' },
        { progress: 100, status: 'Compiling results...' },
      ];

      for (const step of steps) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (onProgressUpdate) {
          onProgressUpdate(step.progress, step.status);
        }
      }

      return {
        success: true,
        results: mockResults,
      };
    }

    // Real API implementation
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/cv/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // Axios-native upload progress tracking
        onUploadProgress: (progressEvent) => {
          if (onProgressUpdate) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgressUpdate(percentCompleted / 2, 'Uploading and analyzing file...'); // first 50% is upload
          }
        }
      });
      return response.data || response;
    } catch (error) {
      console.error('Error analyzing CV:', error);
      throw error;
    }
  },

  uploadAndSmartAnalyze: async (file, onProgressUpdate) => {
    if (USE_MOCK) {
      // Simulate multi-stage processing delays
      const steps = [
        { progress: 20, status: 'Uploading...' },
        { progress: 40, status: 'Extracting text...' },
        { progress: 60, status: 'Analyzing content...' },
        { progress: 80, status: 'Matching competencies...' },
        { progress: 100, status: 'Compiling results...' },
      ];

      for (const step of steps) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (onProgressUpdate) {
          onProgressUpdate(step.progress, step.status);
        }
      }

      return {
        success: true,
        results: mockResults,
      };
    }

    // Real API implementation
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/cv/smart-analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgressUpdate) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgressUpdate(percentCompleted / 2, 'Uploading and analyzing file...');
          }
        }
      });
      return response.data || response;
    } catch (error) {
      console.error('Error in smart analysis:', error);
      throw error;
    }
  },

  getLatestAnalysis: async () => {
    if (USE_MOCK) {
      return {
        success: true,
        results: mockResults,
      };
    }

    try {
      const response = await api.get('/cv/me');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching latest CV analysis:', error);
      throw error;
    }
  },
};
