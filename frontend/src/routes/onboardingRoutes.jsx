import React, { lazy } from 'react';

// Lazy loaded pages
const OnboardingPage = lazy(() => import('../pages/OnboardingPage'));
const AICareerProfilingPage = lazy(() => import('../pages/AICareerProfilingPage'));

export const onboardingRoutes = [
  { path: '/onboarding', element: <OnboardingPage /> },
  { path: '/ai-career-profiling', element: <AICareerProfilingPage /> },
];
