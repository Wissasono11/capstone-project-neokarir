import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const OnboardingRoute = () => {
  const { isAuthenticated, isNewUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullPage={true} label="Memeriksa status pengguna..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isNewUser) {
    if (location.state?.reprocess) {
      return <Outlet />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default OnboardingRoute;
