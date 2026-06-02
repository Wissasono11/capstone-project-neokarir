import React from 'react';
import { Skeleton } from '../../../components/ui/Skeleton';

const SkillGapSkeleton = () => {
  return (
    <div className="space-y-6 animate-skeleton-in">
      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton variant="text" width="260px" height="28px" />
          <div className="mt-2">
            <Skeleton variant="text" width="320px" height="14px" delay={60} />
          </div>
        </div>
        <Skeleton variant="rectangular" width="140px" height="40px" style={{ borderRadius: '8px' }} delay={100} />
      </div>

      {/* Hero Card Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
        {/* Circular Progress */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <Skeleton variant="circular" width="120px" height="120px" delay={120} />
          <div className="mt-3">
            <Skeleton variant="rectangular" width="90px" height="24px" style={{ borderRadius: '999px' }} delay={160} />
          </div>
        </div>
        {/* Info side */}
        <div className="flex-1 w-full">
          <Skeleton variant="rectangular" width="110px" height="24px" style={{ borderRadius: '8px' }} delay={140} />
          <div className="mt-3">
            <Skeleton variant="text" width="300px" height="24px" delay={180} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 ${i === 2 ? 'sm:col-span-2' : ''}`}
              >
                <Skeleton variant="rectangular" width="36px" height="36px" style={{ borderRadius: '8px', flexShrink: 0 }} delay={200 + i * 40} />
                <div className="flex-1 flex flex-col gap-1.5">
                  <Skeleton variant="text" width="100px" height="10px" delay={220 + i * 40} />
                  <Skeleton variant="text" width="160px" height="14px" delay={240 + i * 40} />
                  <Skeleton variant="text" width="130px" height="10px" delay={260 + i * 40} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Radar + Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-5 h-[320px] md:h-[440px]">
          <div className="bg-white rounded-3xl border border-border p-4 md:p-8 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <Skeleton variant="text" width="140px" height="18px" delay={340} />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <Skeleton variant="circular" width="180px" height="180px" delay={380} />
            </div>
            <div className="mt-2 flex flex-col items-center gap-1">
              <Skeleton variant="text" width="60px" height="24px" delay={420} />
              <Skeleton variant="text" width="140px" height="12px" delay={450} />
            </div>
          </div>
        </div>

        {/* Skill Breakdown List */}
        <div className="lg:col-span-7 h-[320px] md:h-[440px]">
          <div className="bg-white rounded-3xl border border-border p-4 md:p-8 shadow-sm h-full flex flex-col">
            <Skeleton variant="text" width="160px" height="18px" delay={360} />
            <div className="mt-4 flex-1 flex flex-col gap-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton variant="text" width="90px" height="12px" delay={400 + i * 30} />
                  <div className="flex-1">
                    <Skeleton variant="rectangular" width="100%" height="8px" style={{ borderRadius: '999px' }} delay={420 + i * 30} />
                  </div>
                  <Skeleton variant="text" width="35px" height="12px" delay={440 + i * 30} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm">
        <Skeleton variant="text" width="200px" height="20px" delay={500} />
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="p-4 rounded-2xl border border-border flex flex-col gap-3">
              <Skeleton variant="rectangular" width="40px" height="40px" style={{ borderRadius: '10px' }} delay={540 + i * 40} />
              <Skeleton variant="text" width="140px" height="16px" delay={560 + i * 40} />
              <Skeleton variant="text" width="100%" height="12px" delay={580 + i * 40} />
              <Skeleton variant="text" width="80%" height="12px" delay={600 + i * 40} />
            </div>
          ))}
        </div>
      </div>

      {/* Missing Skills Grid */}
      <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm">
        <Skeleton variant="text" width="180px" height="20px" delay={660} />
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-2xl border border-border flex items-center gap-4">
              <Skeleton variant="circular" width="44px" height="44px" delay={700 + i * 30} />
              <div className="flex-1 flex flex-col gap-1.5">
                <Skeleton variant="text" width="120px" height="14px" delay={720 + i * 30} />
                <Skeleton variant="text" width="180px" height="12px" delay={740 + i * 30} />
              </div>
              <Skeleton variant="rectangular" width="50px" height="24px" style={{ borderRadius: '8px' }} delay={760 + i * 30} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillGapSkeleton;
