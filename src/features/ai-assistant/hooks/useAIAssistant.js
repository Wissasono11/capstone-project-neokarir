import { useState, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useCareerRecommendations } from '../../carrer-recommendation/hooks/useCareerRecommendations';
import { getSimulatedResponse } from '../data/knowledgeBase';
import { useChatSessions } from './useChatSessions';

export const useAIAssistant = () => {
  const { user } = useAuth();
  const { recommendations } = useCareerRecommendations();
  
  // Delegate all session state management to useChatSessions
  const {
    sessions,
    activeSessionId,
    activeSession,
    messages,
    createNewSession,
    selectSession,
    deleteSession,
    renameSession,
    updateSessionMessages,
    clearSessionMessages
  } = useChatSessions(user);

  const [isTyping, setIsTyping] = useState(false);

  // Send a message in the active session
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || !activeSessionId) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp
    };

    // 1. Add user message and request auto-rename title if applicable
    const updatedMessages = [...messages, userMsg];
    updateSessionMessages(activeSessionId, updatedMessages, text);
    
    // Simulate bot typing indicator
    setIsTyping(true);

    // Dynamic typing delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

    // 2. Fetch RAG simulated response
    const botResponseText = getSimulatedResponse(text, user, recommendations);
    const botMsg = {
      id: `msg-${Date.now()}-bot`,
      sender: 'bot',
      text: botResponseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 3. Append bot response
    const finalMessages = [...updatedMessages, botMsg];
    updateSessionMessages(activeSessionId, finalMessages);
    setIsTyping(false);
  }, [activeSessionId, messages, user, recommendations, updateSessionMessages]);

  // Enhance a simple user input prompt into a rich structured prompt
  const enhancePrompt = useCallback((text) => {
    const trimmed = text.trim().toLowerCase();
    if (!trimmed) return "";

    const targetRole = user?.role || "Frontend Engineer";

    if (trimmed.match(/^(node|node js|nodejs)$/)) {
      return "Bagaimana roadmap belajar Node.js yang terstruktur untuk pemula hingga siap kerja di industri?";
    }
    if (trimmed.match(/^(react|react js|reactjs)$/)) {
      return "Apa saja materi ReactJS tingkat menengah hingga mahir yang wajib dikuasai untuk membuat aplikasi web yang performan?";
    }
    if (trimmed.match(/^(python|datascience|data science|data)$/)) {
      return "Berikan rekomendasi kurikulum belajar Data Science dengan Python dari tingkat dasar manipulasi data hingga pembuatan model Machine Learning.";
    }
    if (trimmed.match(/^(cv|resume|ats)$/)) {
      return `Tolong berikan audit checklist untuk membuat CV saya agar lolos sistem ATS (Applicant Tracking System) untuk posisi ${targetRole}.`;
    }
    if (trimmed.match(/^(interview|wawancara)$/)) {
      return `Apa saja daftar pertanyaan interview perilaku (behavioral questions) tersulit untuk posisi ${targetRole} beserta cara menjawabnya?`;
    }
    if (trimmed.match(/^(gaji|nego|negosiasi)$/)) {
      return "Bagaimana cara menegosiasikan gaji saat ditawarkan kontrak kerja pertama sebagai software engineer tanpa pengalaman kerja profesional?";
    }
    if (trimmed.match(/^(loker|lowongan|kerja)$/)) {
      return `Tampilkan lowongan kerja ${targetRole} terbaik di database NeoKarir yang paling sesuai dengan kualifikasi profil saya saat ini.`;
    }
    if (trimmed.match(/^(skill|gap)$/)) {
      return `Analisis skill gap profil saya terhadap posisi target ${targetRole} dan urutkan skill apa saja yang paling mendesak untuk saya pelajari.`;
    }

    return `Tolong jelaskan secara mendalam tentang konsep "${text}" dalam industri teknologi dan bagaimana langkah-langkah praktis untuk menguasainya untuk menunjang karir saya.`;
  }, [user]);

  // Resets the active session's history
  const clearActiveSession = useCallback(() => {
    if (activeSessionId) {
      clearSessionMessages(activeSessionId);
    }
  }, [activeSessionId, clearSessionMessages]);

  return {
    sessions,
    activeSessionId,
    messages,
    isTyping,
    sendMessage,
    enhancePrompt,
    clearChat: clearActiveSession,
    createNewSession,
    selectSession,
    deleteSession,
    renameSession
  };
};
