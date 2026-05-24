import { useState, useCallback } from 'react';

export const usePreferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    jobAlerts: true,
    language: 'id',
    theme: 'light',
  });

  const updatePreferences = useCallback((field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    preferences,
    updatePreferences
  };
};
