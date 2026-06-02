import React from 'react';
import { Skeleton } from '../../../components/ui/Skeleton';

const CareerRecommendationDetailSkeleton = () => {
  return (
    <div className="space-y-6 animate-skeleton-in">
      {/* Hero Job Banner Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex gap-4 items-center w-full md:w-auto">
          {/* Logo Skeleton */}
          <Skeleton variant="rectangular" width="64px" height="64px" style={{ borderRadius: '16px' }} />
          
          <div className="space-y-2 flex-1 min-w-0">
            {/* Domain Badge */}
            <Skeleton variant="rectangular" width="100px" height="22px" style={{ borderRadius: '4px' }} delay={40} />
            {/* Job Title */}
            <Skeleton variant="text" width="220px" height="24px" delay={80} />
            {/* Company Name */}
            <Skeleton variant="text" width="140px" height="14px" delay={120} />
          </div>
        </div>

        {/* Quick Specs Requirement Badges */}
        <div className="flex items-center gap-3 self-stretch md:self-auto w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
          <Skeleton variant="rectangular" width="120px" height="48px" style={{ borderRadius: '12px', flex: '1 1 0%' }} delay={160} />
          <Skeleton variant="rectangular" width="120px" height="48px" style={{ borderRadius: '12px', flex: '1 1 0%' }} delay={200} />
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Match Score Breakdown Skeleton */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* JobMatchScoreChart Skeleton */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-5 border-b border-slate-50 pb-3">
              <Skeleton variant="text" width="150px" height="18px" delay={240} />
              <Skeleton variant="rectangular" width="120px" height="24px" style={{ borderRadius: '4px' }} delay={280} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Left Gauge Circle */}
              <div className="shrink-0 flex justify-center py-2">
                <Skeleton variant="circular" width="100px" height="100px" delay={320} />
              </div>

              {/* Right Breakdown bars */}
              <div className="flex-1 w-full space-y-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between">
                      <Skeleton variant="text" width="110px" height="12px" delay={360 + i * 40} />
                      <Skeleton variant="text" width="30px" height="12px" delay={380 + i * 40} />
                    </div>
                    <Skeleton variant="rectangular" width="100%" height="8px" style={{ borderRadius: '999px' }} delay={400 + i * 40} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* ProfileInsightsCard Skeleton */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
            <Skeleton variant="text" width="140px" height="16px" delay={500} />
            <div className="space-y-1.5">
              <Skeleton variant="text" width="95%" height="12px" delay={520} />
              <Skeleton variant="text" width="90%" height="12px" delay={540} />
            </div>
            
            {/* Tag pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={`${50 + Math.random() * 30}px`}
                  height="22px"
                  style={{ borderRadius: '4px' }}
                  delay={560 + i * 40}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Course Roadmap Skeleton */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
              <div className="space-y-1.5">
                <Skeleton variant="text" width="220px" height="18px" delay={600} />
                <Skeleton variant="text" width="180px" height="12px" delay={640} />
              </div>
            </div>

            {/* Progress Indicator Box */}
            <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between">
                <Skeleton variant="text" width="120px" height="14px" delay={680} />
                <Skeleton variant="text" width="140px" height="14px" delay={720} />
              </div>
              <Skeleton variant="rectangular" width="100%" height="6px" style={{ borderRadius: '999px' }} delay={760} />
              <Skeleton variant="text" width="80%" height="10px" delay={800} />
            </div>

            {/* Timeline Steps */}
            <div className="relative border-l-2 border-indigo-100 ml-4 pl-6 space-y-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative">
                  {/* Circle number marker */}
                  <div className="absolute -left-[35px] top-0.5">
                    <Skeleton variant="circular" width="26px" height="26px" delay={840 + i * 60} />
                  </div>

                  {/* Course card placeholder */}
                  <div className="rounded-xl border border-slate-100 p-4 space-y-3 bg-white">
                    <div className="flex items-center gap-2">
                      <Skeleton variant="rectangular" width="60px" height="20px" style={{ borderRadius: '4px' }} delay={860 + i * 60} />
                      <Skeleton variant="text" width="80px" height="12px" delay={880 + i * 60} />
                    </div>
                    <Skeleton variant="text" width="70%" height="16px" delay={900 + i * 60} />
                    <Skeleton variant="text" width="95%" height="12px" delay={920 + i * 60} />
                    
                    {/* Bottom link & duration */}
                    <div className="flex items-center justify-between border-t border-slate-50 pt-2.5">
                      <Skeleton variant="text" width="70px" height="12px" delay={940 + i * 60} />
                      <Skeleton variant="rectangular" width="100px" height="28px" style={{ borderRadius: '8px' }} delay={960 + i * 60} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRecommendationDetailSkeleton;
