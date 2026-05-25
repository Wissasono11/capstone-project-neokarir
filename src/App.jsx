import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/routing/ProtectedRoute';
import OnboardingRoute from './components/routing/OnboardingRoute';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Static import for LandingPage to ensure initial load remains instantaneous (LCP/FCP)
import LandingPage from './pages/LandingPage';

// Lazy loaded page components
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const AICareerProfilingPage = lazy(() => import('./pages/AICareerProfilingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CVAnalyzerPage = lazy(() => import('./pages/CVAnalyzerPage'));
const SkillGapPage = lazy(() => import('./pages/SkillGapPage'));
const CareerRecommendationPage = lazy(() => import('./pages/CareerRecommendationPage'));
const CareerRecommendationDetailPage = lazy(() => import('./pages/CareerRecommendationDetailPage'));
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage'));
const ProfileSettingsPage = lazy(() => import('./pages/ProfileSettingsPage'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner fullPage={true} />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />

            {/* Debugging Routes */}
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/ai-career-profiling" element={<AICareerProfilingPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/cv-analyzer" element={<CVAnalyzerPage />} />
              <Route path="/dashboard/skill-gap" element={<SkillGapPage />} />
              <Route path="/dashboard/recommendations" element={<CareerRecommendationPage />} />
              <Route path="/dashboard/recommendations/:id" element={<CareerRecommendationDetailPage />} />
              <Route path="/dashboard/ai-assistant" element={<AIAssistantPage />} />
              <Route path="/dashboard/settings" element={<ProfileSettingsPage />} />
            </Route>
          </Routes> 
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;