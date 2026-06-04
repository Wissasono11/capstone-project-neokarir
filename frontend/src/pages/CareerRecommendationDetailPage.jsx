import { useParams, useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

// Layout & UI
import DashboardLayout from '../layouts/DashboardLayout';
import Breadcrumb from '../components/ui/Breadcrumb';
import CareerRecommendationDetailSkeleton from '../features/career-recommendation/components/CareerRecommendationDetailSkeleton';

// Custom Hooks & Data
import { useCareerRecommendations } from '../features/career-recommendation/hooks/useCareerRecommendations';

// Subcomponents
import JobMatchScoreChart from '../features/career-recommendation/components/JobMatchScoreChart';
import RoadmapDrawer from '../features/career-recommendation/components/RoadmapDrawer';
import CareerDetailHero from '../features/career-recommendation/components/CareerDetailHero';
import ProfileInsightsCard from '../features/career-recommendation/components/ProfileInsightsCard';

const CareerRecommendationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const {
    isLoading,
    recommendations,
    completedCourses,
    toggleCourse
  } = useCareerRecommendations();

  // Find current job from loaded recommendations
  const job = recommendations.find(rec => rec.job_id === id);

  const breadcrumbItems = [
    { label: t.sidebar.recommendation, path: '/dashboard/recommendations', icon: Award },
    { label: job ? job.job_title : 'Detail', path: `/dashboard/recommendations/${id}`}
  ];

  const handleBackClick = () => {
    navigate('/dashboard/recommendations');
  };

  const pageTitle = job 
    ? `${job.job_title} | ${t.title?.recommendationDetail || 'Detail'}` 
    : (t.title?.recommendationDetail || 'Detail');

  return (
    <DashboardLayout>
      <Helmet>
        <title>{pageTitle} - NeoKarir</title>
      </Helmet>
      {/* Header Navigation */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <CareerRecommendationDetailSkeleton />
      ) : !job ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-body font-bold text-slate-800">{t.career.jobNotFound}</h3>
          <p className="text-caption text-slate-500">
            {t.career.jobNotFoundDesc}
          </p>
          <button
            onClick={handleBackClick}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-body-sm font-extrabold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            {t.career.backToRecommendations}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Hero Job Banner */}
          <CareerDetailHero job={job} />

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Match Score Breakdown */}
            <div className="lg:col-span-5 space-y-6">
              <JobMatchScoreChart job={job} />
              
              {/* Profile Context Insights */}
              <ProfileInsightsCard job={job} />
            </div>

            {/* Right Column: Interactive Course Roadmap */}
            <div className="lg:col-span-7">
              <RoadmapDrawer
                job={job}
                completedCourses={completedCourses}
                toggleCourse={toggleCourse}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CareerRecommendationDetailPage;
