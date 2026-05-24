import { useState, useEffect, useCallback } from 'react';

// Helper to generate a default initial session object
const createDefaultSessionObj = (id, name) => {
  return {
    id,
    title: 'Obrolan Baru',
    messages: [
      {
        id: `greet-${Date.now()}`,
        sender: 'bot',
        text: `Hi ${name}! 👋 Saya AI Career Assistant kamu. Saya dapat membantu kamu dengan panduan karir, saran pengembangan skill, tips pencarian lowongan kerja, serta optimasi CV. Bagaimana saya bisa membantumu hari ini?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ],
    createdAt: Date.now()
  };
};

export const useChatSessions = (user) => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);

  // Initialize sessions from localStorage on mount
  useEffect(() => {
    const name = user?.name?.split(' ')[0] || 'Franz';
    const savedSessions = localStorage.getItem('neokarir_chat_sessions');
    const savedActiveId = localStorage.getItem('neokarir_active_session_id');

    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        if (parsed && parsed.length > 0) {
          setSessions(parsed);
          const activeExists = parsed.some(s => s.id === savedActiveId);
          setActiveSessionId(activeExists ? savedActiveId : parsed[0].id);
        } else {
          setupInitialDefaultSession(name);
        }
      } catch (e) {
        console.error("Error parsing chat sessions:", e);
        setupInitialDefaultSession(name);
      }
    } else {
      setupInitialDefaultSession(name);
    }
  }, [user]);

  const setupInitialDefaultSession = (name) => {
    const defaultId = `session-${Date.now()}`;
    const initialSession = createDefaultSessionObj(defaultId, name);
    setSessions([initialSession]);
    setActiveSessionId(defaultId);
    localStorage.setItem('neokarir_chat_sessions', JSON.stringify([initialSession]));
    localStorage.setItem('neokarir_active_session_id', defaultId);
  };

  // Helper to save all sessions
  const saveAllSessions = (updatedSessions) => {
    setSessions(updatedSessions);
    localStorage.setItem('neokarir_chat_sessions', JSON.stringify(updatedSessions));
  };

  // Create a new empty chat session
  const createNewSession = useCallback(() => {
    const name = user?.name?.split(' ')[0] || 'Franz';
    const newId = `session-${Date.now()}`;
    const newSession = createDefaultSessionObj(newId, name);
    
    const updated = [newSession, ...sessions];
    saveAllSessions(updated);
    setActiveSessionId(newId);
    localStorage.setItem('neokarir_active_session_id', newId);
  }, [sessions, user]);

  // Switch active session
  const selectSession = useCallback((id) => {
    setActiveSessionId(id);
    localStorage.setItem('neokarir_active_session_id', id);
  }, []);

  // Delete a chat session
  const deleteSession = useCallback((id, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    const updated = sessions.filter(s => s.id !== id);
    
    if (updated.length === 0) {
      const name = user?.name?.split(' ')[0] || 'Franz';
      const defaultId = `session-${Date.now()}`;
      const initialSession = createDefaultSessionObj(defaultId, name);
      saveAllSessions([initialSession]);
      setActiveSessionId(defaultId);
      localStorage.setItem('neokarir_active_session_id', defaultId);
    } else {
      saveAllSessions(updated);
      if (activeSessionId === id) {
        const nextActiveId = updated[0].id;
        setActiveSessionId(nextActiveId);
        localStorage.setItem('neokarir_active_session_id', nextActiveId);
      }
    }
  }, [sessions, activeSessionId, user]);

  // Update session messages (also handles auto-rename on first user query)
  const updateSessionMessages = useCallback((sessionId, newMessages, textForAutoRename) => {
    const updated = sessions.map(session => {
      if (session.id === sessionId) {
        let newTitle = session.title;
        if (textForAutoRename && session.title === 'Obrolan Baru') {
          newTitle = textForAutoRename.length > 28 ? textForAutoRename.substring(0, 25) + '...' : textForAutoRename;
          newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
        }
        return {
          ...session,
          title: newTitle,
          messages: newMessages
        };
      }
      return session;
    });
    saveAllSessions(updated);
  }, [sessions]);

  // Clear current active session (resets it)
  const clearSessionMessages = useCallback((sessionId) => {
    const name = user?.name?.split(' ')[0] || 'Franz';
    const resetSession = createDefaultSessionObj(sessionId, name);
    const updated = sessions.map(s => s.id === sessionId ? resetSession : s);
    saveAllSessions(updated);
  }, [sessions, user]);

  // Rename a chat session
  const renameSession = useCallback((id, newTitle) => {
    if (!newTitle.trim()) return;
    const updated = sessions.map(session => {
      if (session.id === id) {
        return {
          ...session,
          title: newTitle
        };
      }
      return session;
    });
    saveAllSessions(updated);
  }, [sessions]);

  const activeSession = sessions.find(s => s.id === activeSessionId) || null;
  const messages = activeSession ? activeSession.messages : [];

  return {
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
  };
};
export default useChatSessions;
