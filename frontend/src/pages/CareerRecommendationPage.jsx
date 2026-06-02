import { useNavigate } from 'react-router-dom';
import { Award, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Layout & UI
import DashboardLayout from '../layouts/DashboardLayout';
import Breadcrumb from '../components/ui/Breadcrumb';
import CareerRecommendationSkeleton from '../features/career-recommendation/components/CareerRecommendationSkeleton';

// Custom Hooks & Data
import { useCareerRecommendations } from '../features/career-recommendation/hooks/useCareerRecommendations';

// Subcomponents
import RecommendationFilter from '../features/career-recommendation/components/RecommendationFilter';
import CareerCard from '../features/career-recommendation/components/CareerCard';
import RecommendationHeader from '../features/career-recommendation/components/RecommendationHeader';
import AIAdvisorInsight from '../features/career-recommendation/components/AIAdvisorInsight';

const CareerRecommendationPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    isLoading,
    recommendations,
    searchQuery,
    setSearchQuery,
    selectedDomain,
    setSelectedDomain,
    selectedMatchFilter,
    setSelectedMatchFilter,
    domains,
    overallReadiness,
    user
  } = useCareerRecommendations();

  const breadcrumbItems = [
    { label: t.sidebar.recommendation, path: '/dashboard/recommendations', icon: Award }
  ];

  const handleCardClick = (jobId) => {
    navigate(`/dashboard/recommendations/${jobId}`);
  };

  return (
    <DashboardLayout>
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {isLoading ? (
        <CareerRecommendationSkeleton />
      ) : (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header and Stats */}
          <RecommendationHeader overallReadiness={overallReadiness} />

          {/* AI Advisor insight banner */}
          <AIAdvisorInsight user={user} />

          {/* Filters Bar */}
          <RecommendationFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            selectedMatchFilter={selectedMatchFilter}
            setSelectedMatchFilter={setSelectedMatchFilter}
            domains={domains}
          />

          {/* Main Content Layout Grid */}
          {recommendations.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-body-sm font-bold text-slate-800">{t.career.noRecommendations}</h3>
              <p className="text-caption text-slate-500 max-w-sm mx-auto">
                {t.career.noRecommendationsDesc}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1 mb-1">
                <span className="text-caption font-bold text-slate-400 uppercase tracking-wider">
                  {t.career.showingRecommendations(recommendations.length)}
                </span>
              </div>
              
              {/* Grid Layout of Career Cards (Responsive: 1 col on mobile, 2 cols on md, 3 cols on xl) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendations.map(job => (
                  <CareerCard
                    key={job.job_id}
                    job={job}
                    isActive={false}
                    onClick={() => handleCardClick(job.job_id)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </DashboardLayout>
  );
};

export default CareerRecommendationPage;
