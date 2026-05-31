import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, RefreshCw } from 'lucide-react';

import DashboardLayout from '../layouts/DashboardLayout';
import Breadcrumb from '../components/ui/Breadcrumb';
import SkillGapSkeleton from '../features/skill-gap-analysis/components/SkillGapSkeleton';
import { useSkillGap } from '../features/skill-gap-analysis/hooks/useSkillGap';
import { useAuth } from '../contexts/AuthContext';

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

  const breadcrumbItems = [
    { label: 'Skill Gap Analysis', path: '/dashboard/skill-gap', icon: Target }
  ];

  if (!isLoading && !heroData) {
    return (
      <DashboardLayout>
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl border border-slate-100 p-8 text-center shadow-sm">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 animate-bounce">
            <Target className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-subtitle font-bold text-slate-800 mb-2">Belum Ada Analisis Skill Gap</h2>
          <p className="text-slate-500 max-w-md mb-6 text-body-sm font-medium leading-relaxed">
            Lengkapi data profil dan target karir kamu melalui halaman onboarding agar AI kami dapat menganalisis kesenjangan skill dan menyusun roadmap belajarmu.
          </p>
          <button 
            onClick={() => {
              resetOnboarding();
              navigate('/onboarding');
            }}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-body-sm transition-all duration-300 hover:shadow-lg shadow-indigo-100 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            Mulai Onboarding
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
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
                Skill Gap Analysis
              </h1>
              <p className="text-body-sm font-medium text-secondary-text">
                Bandingkan skill kamu dengan kebutuhan industri
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  resetOnboarding();
                  navigate('/onboarding');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium text-body-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Update Skill
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
    </DashboardLayout>
  );
};

export default SkillGapPage;
