import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for auth state on mount
    const checkAuth = () => {
      const token = localStorage.getItem('neokarir_auth_token');
      const profile = localStorage.getItem('neokarir_user_profile');
      const onboardingCompleted = localStorage.getItem('neokarir_onboarding_completed') === 'true';

      if (token) {
        setIsAuthenticated(true);
        if (profile) {
          setUser(JSON.parse(profile));
        } else {
          // Default mock user
          setUser({
            name: 'Franz Hermann',
            email: 'hello@example.com',
            role: 'Fullstack Engineer',
            location: 'Yogyakarta, Indonesia',
            status: 'Open to Work',
            experience: 'Belum ada (Fresh Graduate / Sedang belajar)',
            education: 'S1'
          });
        }
        
        // If they have a token but haven't completed onboarding, they are a new user
        setIsNewUser(!onboardingCompleted);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData, isNew = false) => {
    setIsAuthenticated(true);
    setIsNewUser(isNew);
    setUser(userData || { 
      name: 'Franz Hermann', 
      email: 'test@test.com',
      role: 'Fullstack Engineer',
      experience: 'Belum ada (Fresh Graduate / Sedang belajar)',
      education: 'S1'
    });
    
    localStorage.setItem('neokarir_auth_token', 'mock_token_123');
    if (userData) {
      localStorage.setItem('neokarir_user_profile', JSON.stringify(userData));
    }
    
    if (!isNew) {
      localStorage.setItem('neokarir_onboarding_completed', 'true');
    }
  };

  const register = (userData) => {
    // Registration always treats user as new
    login(userData, true);
  };

  const completeOnboarding = (profileData) => {
    setIsNewUser(false);
    localStorage.setItem('neokarir_onboarding_completed', 'true');
    
    if (profileData) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('neokarir_user_profile', JSON.stringify(updatedUser));
    }
  };

  const updateProfile = (profileData) => {
    if (profileData) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('neokarir_user_profile', JSON.stringify(updatedUser));
    }
  };

  const resetOnboarding = () => {
    setIsNewUser(true);
    localStorage.removeItem('neokarir_onboarding_completed');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsNewUser(false);
    setUser(null);
    localStorage.removeItem('neokarir_auth_token');
    localStorage.removeItem('neokarir_user_profile');
    localStorage.removeItem('neokarir_onboarding_completed');
  };

  const value = {
    isAuthenticated,
    isNewUser,
    user,
    loading,
    login,
    register,
    logout,
    completeOnboarding,
    resetOnboarding,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
