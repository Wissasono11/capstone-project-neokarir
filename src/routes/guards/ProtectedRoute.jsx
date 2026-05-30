import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ProtectedRoute = () => {
  const { isAuthenticated, isNewUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullPage={true} label="Menyiapkan dashboard Anda..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isNewUser && !location.state?.fromOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
