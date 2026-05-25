import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../features/dashboard/components/StatCard';
import CurrentFocusCard from '../features/dashboard/components/CurrentFocusCard';
import DetailedProgressCard from '../features/dashboard/components/DetailedProgressCard';
import RadarChartComp from '../features/dashboard/components/RadarChartComp';
import CareerRecommendationList from '../features/dashboard/components/CareerRecommendationList';
import QuickTipsCard from '../features/dashboard/components/QuickTipsCard';
import QuickLinks from '../features/dashboard/components/QuickLinks';
import { useDashboardData } from '../features/dashboard/hooks/useDashboardData';
import avatar from '../assets/images/avatar.png';

const DashboardPage = () => {
  const {
    user,
    results,
    overallReadiness,
    topRecommendations,
    compatibilityScore,
    dynamicTips,
    radarData
  } = useDashboardData();

  return (
    <DashboardLayout>
      <div className="mb-6 md:mb-8">
        <h2 className="text-title md:text-heading font-bold text-primary-text mb-1">
          Good Morning {user?.name?.split(' ')[0] || 'Franz'}!
        </h2>
        <p className="text-body-sm md:text-body font-medium text-secondary-text">
          Berikut adalah progres karir dan kesiapan industri kamu hari ini.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Personal Card */}
        <StatCard icon={avatar} title="Personal" iconBgColor="bg-yellow-100" iconColor="text-yellow-600">
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
            { label: 'Profil Lengkap', value: 90, color: 'bg-emerald-500' },
            { label: 'Skill Match', value: compatibilityScore, color: 'bg-indigo-600' },
            { label: 'Roadmap Progress', value: overallReadiness, color: 'bg-amber-500' },
          ]
        }} />
      </div>

      <h3 className="text-body-lg md:text-title font-bold text-primary-text mb-6">Summary For You</h3>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
        <div className="lg:col-span-5 h-[300px] md:h-[440px]">
          <RadarChartComp data={radarData} overallScore={compatibilityScore} />
        </div>
        <div className="lg:col-span-7">
          <CareerRecommendationList recommendations={topRecommendations} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 pb-10">
        <div className="lg:col-span-6">
          <QuickTipsCard tips={dynamicTips} />
        </div>
        <div className="lg:col-span-6">
          <QuickLinks />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
