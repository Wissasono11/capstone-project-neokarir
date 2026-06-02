import { useState, useCallback } from 'react';

export const useAccountSecurity = () => {
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    sessions: [
      { id: 1, device: 'Chrome - Windows', location: 'Yogyakarta, ID', lastActive: 'Aktif sekarang', isCurrent: true },
      { id: 2, device: 'Safari - iPhone', location: 'Jakarta, ID', lastActive: '2 jam lalu', isCurrent: false },
    ],
  });

  const updateSecurity = useCallback((field, value) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  }, []);

  const removeSession = useCallback((sessionId) => {
    setSecurity(prev => ({
      ...prev,
      sessions: prev.sessions.filter(s => s.id !== sessionId),
    }));
  }, []);

  return {
    security,
    updateSecurity,
    removeSession
  };
};
