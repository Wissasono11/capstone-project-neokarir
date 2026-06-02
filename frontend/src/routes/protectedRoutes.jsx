import React, { lazy } from 'react';

// Lazy loaded page components
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const CVAnalyzerPage = lazy(() => import('../pages/CVAnalyzerPage'));
const SkillGapPage = lazy(() => import('../pages/SkillGapPage'));
const CareerRecommendationPage = lazy(() => import('../pages/CareerRecommendationPage'));
const CareerRecommendationDetailPage = lazy(() => import('../pages/CareerRecommendationDetailPage'));
const AIAssistantPage = lazy(() => import('../pages/AIAssistantPage'));
const JobsMarketPage = lazy(() => import('../pages/JobsMarketPage'));
const SupportPage = lazy(() => import('../pages/SupportPage'));
const ProfileSettingsPage = lazy(() => import('../pages/ProfileSettingsPage'));

export const protectedRoutes = [
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/dashboard/cv-analyzer', element: <CVAnalyzerPage /> },
  { path: '/dashboard/skill-gap', element: <SkillGapPage /> },
  { path: '/dashboard/recommendations', element: <CareerRecommendationPage /> },
  { path: '/dashboard/recommendations/:id', element: <CareerRecommendationDetailPage /> },
  { path: '/dashboard/ai-assistant', element: <AIAssistantPage /> },
  { path: '/dashboard/jobs-market', element: <JobsMarketPage /> },
  { path: '/dashboard/support', element: <SupportPage /> },
  { path: '/dashboard/settings', element: <ProfileSettingsPage /> },
];
