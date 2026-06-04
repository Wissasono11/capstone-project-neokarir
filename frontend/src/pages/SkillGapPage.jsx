import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, RefreshCw, Loader2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import DashboardLayout from '../layouts/DashboardLayout';
import Breadcrumb from '../components/ui/Breadcrumb';
import SkillGapSkeleton from '../features/skill-gap-analysis/components/SkillGapSkeleton';
import { useSkillGap } from '../features/skill-gap-analysis/hooks/useSkillGap';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { profileService } from '../features/profile-settings/api/profileService';

// Components
import SkillGapHero from '../features/skill-gap-analysis/components/SkillGapHero';
import SkillBreakdownList from '../features/skill-gap-analysis/components/SkillBreakdownList';
import RecommendedActions from '../features/skill-gap-analysis/components/RecommendedActions';
import MissingSkillsGrid from '../features/skill-gap-analysis/components/MissingSkillsGrid';
import LearningPathTimeline from '../features/skill-gap-analysis/components/LearningPathTimeline';
import SkillGapRadarChart from '../features/skill-gap-analysis/components/SkillGapRadarChart';

const SkillGapPage = () => {
  const navigate = useNavigate();
  const { resetOnboarding } = useAuth();
  const { t } = useLanguage();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { 
    isLoading, 
    heroData, 
    radarData, 
    skillBreakdown, 
    recommendedActions, 
    missingSkillCards, 
    learningPath,
    completedCourses,
    toggleCourse,
    ownedSkills
  } = useSkillGap();

  const handleStartReprocess = async () => {
    setIsUpdatingStatus(true);
    try {
      await profileService.updateProfile({
        profile_data: {
          is_onboarding_completed: false
        }
      });
    } catch (err) {
      console.error("Failed to update reprocessing status in DB:", err);
    }
    setIsUpdatingStatus(false);
    resetOnboarding();
    navigate('/onboarding', { state: { reprocess: true } });
  };

  const breadcrumbItems = [
    { label: t.sidebar.skillGap, path: '/dashboard/skill-gap', icon: Target }
  ];

  if (!isLoading && !heroData) {
    return (
      <DashboardLayout>
        <Helmet>
          <title>{t.title?.skillGap ? `${t.title.skillGap} - NeoKarir` : 'NeoKarir'}</title>
        </Helmet>
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl border border-slate-100 p-8 text-center shadow-sm">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 animate-bounce">
            <Target className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-subtitle font-bold text-slate-800 mb-2">{t.skillGap.noAnalysisTitle}</h2>
          <p className="text-slate-500 max-w-md mb-6 text-body-sm font-medium leading-relaxed">
            {t.skillGap.noAnalysisDesc}
          </p>
          <button 
            onClick={handleStartReprocess}
            disabled={isUpdatingStatus}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-body-sm transition-all duration-300 hover:shadow-lg shadow-indigo-100 flex items-center gap-2"
          >
            {isUpdatingStatus ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
            )}
            {t.skillGap.startOnboarding}
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t.title?.skillGap ? `${t.title.skillGap} - NeoKarir` : 'NeoKarir'}</title>
      </Helmet>
      {/* Navigation Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {isLoading ? (
        <SkillGapSkeleton />
      ) : (
        <div className="space-y-6">
          
          {/* Main Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-title md:text-heading font-bold text-primary-text mb-1 tracking-tight">
                {t.sidebar.skillGap}
              </h1>
              <p className="text-body-sm font-medium text-secondary-text">
                {t.skillGap.subtitle}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsModalOpen(true)}
                disabled={isUpdatingStatus}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium text-body-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                {isUpdatingStatus ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {t.skillGap.updateSkill}
              </button>
            </div>
          </div>

          {/* Section 1: Hero Profil */}
          <SkillGapHero data={heroData} />
          
          {/* Section 2: Grid Utama (Radar + Rincian) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 2A: Radar Chart */}
            <div className="lg:col-span-5 h-[320px] md:h-[440px]">
              <SkillGapRadarChart 
                data={radarData} 
                overallScore={heroData?.overallReadiness || 0} 
              />
            </div>
            
            {/* 2B: Skill Breakdown List */}
            <div className="lg:col-span-7 h-[320px] md:h-[440px]">
              <SkillBreakdownList breakdownData={skillBreakdown} />
            </div>
          </div>

          {/* Section 3: Recommended Actions */}
          <RecommendedActions actionsData={recommendedActions} />

          {/* Section 4: Missing Skills Details */}
          <MissingSkillsGrid skillsData={missingSkillCards} />

          {/* Section 5: Learning Path */}
          <LearningPathTimeline 
            pathData={learningPath} 
            completedCourses={completedCourses}
            onToggleCourse={toggleCourse}
            ownedSkills={ownedSkills}
          />

        </div>
      )}

      {/* Reprocess Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[24px] shadow-xl overflow-hidden p-6 z-10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {t.profile.reprocessModalTitle}
                </h3>
                <p className="text-body-sm text-slate-500 mb-6 leading-relaxed">
                  {t.profile.reprocessModalDesc}
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-body-sm"
                    disabled={isUpdatingStatus}
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    onClick={handleStartReprocess}
                    disabled={isUpdatingStatus}
                    className="flex-1 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center text-body-sm"
                  >
                    {isUpdatingStatus ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        {t.profile.reprocessing}
                      </>
                    ) : (
                      t.profile.reprocessModalConfirm
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default SkillGapPage;
