import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/routing/ProtectedRoute';
import OnboardingRoute from './components/routing/OnboardingRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import OnboardingPage from './pages/OnboardingPage';
import AICareerProfilingPage from './pages/AICareerProfilingPage';
import DashboardPage from './pages/DashboardPage';
import CVAnalyzerPage from './pages/CVAnalyzerPage';
import SkillGapPage from './pages/SkillGapPage';
import CareerRecommendationPage from './pages/CareerRecommendationPage';
import CareerRecommendationDetailPage from './pages/CareerRecommendationDetailPage';
import AIAssistantPage from './pages/AIAssistantPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;