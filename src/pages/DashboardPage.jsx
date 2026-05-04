import React from 'react';
import { MapPinned, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../features/dashboard/components/StatCard';
import RadarChartComp from '../features/dashboard/components/RadarChartComp';
import CareerRecommendationList from '../features/dashboard/components/CareerRecommendationList';
import LatestJobsMatches from '../features/dashboard/components/LatestJobsMatches';
import QuickLinks from '../features/dashboard/components/QuickLinks';
import { useAIProfiling } from '../features/ai-profiling/hooks/useAIProfiling';
import avatar from '../assets/images/avatar.png';

const DashboardPage = () => {
  const { user } = useAuth();
  const { results } = useAIProfiling(); // Reusing mock data for now

  const trackedSkillsCount = results.skillGap.length + (user?.skills?.length || 4);

  // Dashboard mock data based on the design
  const latestJobs = [
    { id: 1, title: 'Junior Frontend Developer', company: 'Gojek', type: 'Fulltime', matchScore: 92 },
    { id: 2, title: 'Junior Backend Developer', company: 'Shopee', type: 'Remote', matchScore: 92 }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-primary-text mb-1">
          Good Morning {user?.name?.split(' ')[0] || 'Franz'}!
        </h2>
        <p className="text-[15px] font-medium text-secondary-text">
          We found 5 new opportunity for you today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Personal Card */}
        <StatCard icon={avatar} title="Personal" iconBgColor="bg-yellow-100" iconColor="text-yellow-600">
          <div>
            <h4 className="text-xl font-bold text-primary-text mb-1">{user?.name || 'Franz Hermann'}</h4>
            <p className="text-sm font-medium text-secondary-text mb-4">{user?.role || 'Full Stack Developer'}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-bg-secondary text-primary text-xs font-semibold">
              {user?.experience || 'Fresh Graduate'}
            </span>
          </div>
        </StatCard>

        {/* Location & Status Card */}
        <StatCard icon={MapPinned} title="Location & Status" iconBgColor="bg-emerald-100" iconColor="text-emerald-600">
          <div>
            <p className="text-sm font-medium text-secondary-text mb-4">{user?.location || 'Yogyakarta, Indonesia'}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-lg  bg-emerald-100 text-emerald-700 text-xs font-semibold">
              {user?.status || 'Open to Work'}
            </span>
          </div>
        </StatCard>

        {/* Progress Card */}
        <StatCard icon={Target} title="Progress" iconBgColor="bg-red-100" iconColor="text-red-500">
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-secondary-text">Profile Score</span>
              <span className="text-sm font-bold text-primary-text">81%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2 mb-4">
              <div className="bg-primary h-2 rounded-full" style={{ width: '81%' }}></div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-secondary-text">
              <span className="text-red-500">★</span> {trackedSkillsCount} Skills Tracked
            </div>
          </div>
        </StatCard>
      </div>

      <h3 className="text-2xl font-bold text-primary-text mb-6">Summary For You</h3>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-5 h-[440px]">
          <RadarChartComp data={results.skillGap} overallScore={results.overallScore} />
        </div>
        <div className="lg:col-span-7">
          <CareerRecommendationList recommendations={results.topCareers} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
        <div className="lg:col-span-6">
          <LatestJobsMatches matches={latestJobs} />
        </div>
        <div className="lg:col-span-6">
          <QuickLinks />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
