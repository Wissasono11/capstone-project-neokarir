import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './guards/ProtectedRoute';
import OnboardingRoute from './guards/OnboardingRoute';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import { publicRoutes } from './publicRoutes';
import { onboardingRoutes } from './onboardingRoutes';
import { protectedRoutes } from './protectedRoutes';

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullPage={true} />}>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Onboarding Route (Hanya untuk User baru yang terautentikasi) */}
        <Route element={<OnboardingRoute />}>
          {onboardingRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Protected Routes (Untuk User terautentikasi yang sudah selesai onboarding) */}
        <Route element={<ProtectedRoute />}>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
