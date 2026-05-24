import { useState, useCallback } from 'react';

export const usePersonalInfo = (initialUser) => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: initialUser?.name || 'Franz Hermann',
    email: initialUser?.email || 'hello@example.com',
    phone: '+62 812-3456-7890',
    bio: 'Passionate developer focused on building impactful web applications with modern technologies.',
    dateOfBirth: '1999-06-15',
    gender: 'male',
  });

  const updatePersonalInfo = useCallback((field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    personalInfo,
    updatePersonalInfo
  };
};
