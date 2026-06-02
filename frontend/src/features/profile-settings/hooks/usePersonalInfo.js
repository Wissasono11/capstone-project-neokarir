import { useState, useCallback, useEffect } from 'react';

export const usePersonalInfo = (initialUser) => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: initialUser?.name || '',
    email: initialUser?.email || '',
    phone: initialUser?.phone || '',
    bio: initialUser?.bio || '',
    dateOfBirth: initialUser?.profile_data?.date_of_birth || '',
    gender: initialUser?.gender || 'male',
  });

  useEffect(() => {
    if (initialUser) {
      setPersonalInfo({
        fullName: initialUser.name || '',
        email: initialUser.email || '',
        phone: initialUser.phone || '',
        bio: initialUser.bio || '',
        dateOfBirth: initialUser.profile_data?.date_of_birth || '',
        gender: initialUser.gender || 'male',
      });
    }
  }, [initialUser]);

  const updatePersonalInfo = useCallback((field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    personalInfo,
    updatePersonalInfo
  };
};
