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
    formData.append('cv', file);

    return api.post('/cv/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Axios-native upload progress tracking
      onUploadProgress: (progressEvent) => {
        if (onProgressUpdate) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgressUpdate(percentCompleted / 2, 'Uploading file...'); // first 50% is upload
        }
      }
    });
  },
};
