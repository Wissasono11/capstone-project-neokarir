import { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const usePreferences = (user) => {
  const { language: activeLanguage } = useLanguage();

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    jobAlerts: true,
    language: activeLanguage || 'id',
    theme: 'light',
  });

  useEffect(() => {
    if (user?.profile_data?.preferences) {
      setPreferences(prev => ({
        ...prev,
        ...user.profile_data.preferences
      }));
    } else if (activeLanguage) {
      setPreferences(prev => ({
        ...prev,
        language: activeLanguage
      }));
    }
  }, [user, activeLanguage]);

  const updatePreferences = useCallback((field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    preferences,
    updatePreferences
  };
};
