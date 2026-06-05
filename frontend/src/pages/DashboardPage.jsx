import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../features/dashboard/components/StatCard';
import CurrentFocusCard from '../features/dashboard/components/CurrentFocusCard';
import DetailedProgressCard from '../features/dashboard/components/DetailedProgressCard';
import RadarChartComp from '../features/dashboard/components/RadarChartComp';
import CareerRecommendationList from '../features/dashboard/components/CareerRecommendationList';
import QuickTipsCard from '../features/dashboard/components/QuickTipsCard';
import QuickLinks from '../features/dashboard/components/QuickLinks';
import DashboardSkeleton from '../features/dashboard/components/DashboardSkeleton';
import FeatureErrorBoundary from '../components/ui/FeatureErrorBoundary';
import { useDashboardData } from '../features/dashboard/hooks/useDashboardData';
import avatar from '../assets/images/avatar.png';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardPage = () => {
  const { t } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.dashboard.morning;
    if (hour < 15) return t.dashboard.afternoon;
    if (hour < 18) return t.dashboard.evening;
    return t.dashboard.night;
  };

  const {
    user,
    results,
    overallReadiness,
    topRecommendations,
    compatibilityScore,
    dynamicTips,
    radarData,
    isLoading
  } = useDashboardData();

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t.title?.dashboard ? `${t.title.dashboard} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="animate-fade-in">
          <div className="mb-6 md:mb-8">
            <h2 className="text-title md:text-heading font-bold text-primary-text mb-1">
              {getGreeting()} {user?.name?.split(' ')[0] || 'Franz'}!
            </h2>
            <p className="text-body-sm md:text-body font-medium text-secondary-text">
              {t.dashboard.subGreeting}
            </p>
          </div>

          {/* Stat Cards */}
          <FeatureErrorBoundary featureName="Statistik Profil">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {/* Personal Card */}
              <StatCard icon={user?.avatar_url || avatar} title={t.dashboard.personal} iconBgColor="bg-yellow-100" iconColor="text-yellow-600">
                <div>
                  <h4 className="text-body md:text-subtitle font-bold text-primary-text mb-1 truncate">{user?.name || 'Franz Hermann'}</h4>
                  <p className="text-caption md:text-body-sm font-medium text-secondary-text mb-4 truncate">{user?.role || 'Full Stack Developer'}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-bg-secondary text-primary text-caption font-semibold">
                    {user?.experience || 'Fresh Graduate'}
                  </span>
                </div>
              </StatCard>

              {/* Current Focus Card */}
              <CurrentFocusCard targetRole={user?.role || 'Full Stack Developer'} compatibilityScore={compatibilityScore} />

              {/* Detailed Progress Card */}
              <DetailedProgressCard progressData={{
                overallReadiness: overallReadiness || results.overallScore || 81,
                categories: [
                  { label: t.dashboard.categoryProfile, value: 90, color: 'bg-emerald-500' },
                  { label: t.dashboard.categorySkill, value: compatibilityScore, color: 'bg-indigo-600' },
                  { label: t.dashboard.categoryRoadmap, value: overallReadiness, color: 'bg-amber-500' },
                ]
              }} />
            </div>
          </FeatureErrorBoundary>

          <h3 className="text-body-lg md:text-title font-bold text-primary-text mb-6">{t.dashboard.summary}</h3>

          {/* Middle Grid */}
          <FeatureErrorBoundary featureName="Analisis Skill & Rekomendasi Karir">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
              <div className="lg:col-span-5 h-[300px] md:h-[440px]">
                <RadarChartComp data={radarData} overallScore={compatibilityScore} />
              </div>
              <div className="lg:col-span-7">
                <CareerRecommendationList recommendations={topRecommendations} />
              </div>
            </div>
          </FeatureErrorBoundary>

          {/* Bottom Grid */}
          <FeatureErrorBoundary featureName="Tips & Navigasi Cepat">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 pb-10">
              <div className="lg:col-span-6">
                <QuickTipsCard tips={dynamicTips} />
              </div>
              <div className="lg:col-span-6">
                <QuickLinks />
              </div>
            </div>
          </FeatureErrorBoundary>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;

