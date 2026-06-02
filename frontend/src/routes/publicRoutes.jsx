import React, { lazy } from 'react';
import LandingPage from '../pages/LandingPage';

// Lazy loaded pages
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'));
const TermsOfServicePage = lazy(() => import('../pages/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));

export const publicRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/terms', element: <TermsOfServicePage /> },
  { path: '/privacy', element: <PrivacyPolicyPage /> },
];
