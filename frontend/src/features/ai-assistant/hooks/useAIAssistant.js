import { useState, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useCareerRecommendations } from '../../career-recommendation/hooks/useCareerRecommendations';
import { useChatSessions } from './useChatSessions';
import { aiAssistantService } from '../api/aiAssistantService';
import { useToast } from '../../../contexts/ToastContext';

export const useAIAssistant = () => {
  const { user } = useAuth();
  const { recommendations } = useCareerRecommendations();
  const { error: toastError } = useToast();
  
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
    clearSessionMessages,
    convertLocalSessionToBackendSession
  } = useChatSessions(user);

  const [isTyping, setIsTyping] = useState(false);

  // Send a message in the active session
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || !activeSessionId) return;

    setIsTyping(true);

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    let targetSessionId = activeSessionId;
    
    // If the active session is a local offline fallback, convert it first
    if (!uuidRegex.test(targetSessionId)) {
      targetSessionId = await convertLocalSessionToBackendSession(activeSessionId, text);
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp
    };

    // 1. Add user message and request auto-rename title if applicable
    const updatedMessages = [...messages, userMsg];
    updateSessionMessages(targetSessionId, updatedMessages, text);
    
    // 2. Fetch AI response via service
    try {
      const response = await aiAssistantService.sendMessage(targetSessionId, text);
      const botMsg = {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: response.text || response.message || 'Maaf, saya tidak dapat memahami permintaan Anda.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // 3. Append bot response
      const finalMessages = [...updatedMessages, botMsg];
      updateSessionMessages(targetSessionId, finalMessages);
    } catch (err) {
      toastError('Gagal mendapatkan respon dari AI Assistant.');
      const botMsg = {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: 'Maaf, koneksi dengan asisten AI terputus. Silakan coba kembali nanti.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const finalMessages = [...updatedMessages, botMsg];
      updateSessionMessages(targetSessionId, finalMessages);
    } finally {
      setIsTyping(false);
    }
  }, [activeSessionId, messages, updateSessionMessages, toastError, convertLocalSessionToBackendSession]);

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
