import api, { USE_MOCK } from '../../../config/api';
import { getSimulatedResponse } from '../data/knowledgeBase';

/**
 * AI Assistant Chat Service
 * Handles sending messages to the AI assistant backend, with RAG simulation support.
 */
export const aiAssistantService = {
  sendMessage: async (text, user, recommendations) => {
    if (USE_MOCK) {
      // Simulate network / AI generation latency
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));
      
      const responseText = getSimulatedResponse(text, user, recommendations);
      return {
        success: true,
        text: responseText,
      };
    }

    // Call actual backend chatbot endpoint
    // Assuming backend returns { text: "..." }
    const response = await api.post('/ai/chat', {
      message: text,
      user_context: {
        role: user?.role,
        skills: user?.skills,
        experience: user?.experience,
      },
      recommendations,
    });
    
    return response;
  },
};
