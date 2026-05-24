import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, RefreshCw } from 'lucide-react';

import DashboardLayout from '../layouts/DashboardLayout';
import Breadcrumb from '../components/ui/Breadcrumb';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useSkillGap } from '../features/skill-gap-analysis/hooks/useSkillGap';

// Components
import SkillGapHero from '../features/skill-gap-analysis/components/SkillGapHero';
import SkillBreakdownList from '../features/skill-gap-analysis/components/SkillBreakdownList';
import RecommendedActions from '../features/skill-gap-analysis/components/RecommendedActions';
import MissingSkillsGrid from '../features/skill-gap-analysis/components/MissingSkillsGrid';
import LearningPathTimeline from '../features/skill-gap-analysis/components/LearningPathTimeline';
import RadarChartComp from '../features/dashboard/components/RadarChartComp';

const SkillGapPage = () => {
  const navigate = useNavigate();
  const { 
    isLoading, 
    heroData, 
    radarData, 
    skillBreakdown, 
    recommendedActions, 
    missingSkillCards, 
    learningPath,
    completedCourses,
    toggleCourse
  } = useSkillGap();

  const breadcrumbItems = [
    { label: 'Skill Gap Analysis', path: '/dashboard/skill-gap', icon: Target }
  ];

  return (
    <DashboardLayout>
      {/* Navigation Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" label="Menganalisis kesenjangan skill..." />
        </div>
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
                onClick={() => navigate('/onboarding')}
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
            {/* 2A: Radar Chart (Reuse from Dashboard) */}
            <div className="lg:col-span-5 h-[320px] md:h-[440px]">
              <RadarChartComp 
                data={radarData} 
                overallScore={heroData?.overallReadiness || 0} 
                showViewDetails={false}
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
          />

        </div>
      )}
    </DashboardLayout>
  );
};

export default SkillGapPage;
