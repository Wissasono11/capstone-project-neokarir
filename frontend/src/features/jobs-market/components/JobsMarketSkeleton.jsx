import React from 'react';
import { Skeleton } from '../../../components/ui/Skeleton';

const JobsMarketSkeleton = () => {
  return (
    <div className="space-y-8 pb-12 animate-skeleton-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton variant="text" width="260px" height="28px" />
          <div className="mt-2">
            <Skeleton variant="text" width="380px" height="14px" delay={60} />
          </div>
        </div>
        <Skeleton variant="rectangular" width="120px" height="40px" style={{ borderRadius: '12px' }} delay={100} />
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <Skeleton variant="rectangular" width="48px" height="48px" style={{ borderRadius: '12px' }} delay={140 + i * 50} />
              <Skeleton variant="rectangular" width="100px" height="24px" style={{ borderRadius: '999px' }} delay={160 + i * 50} />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton variant="text" width="130px" height="12px" delay={180 + i * 50} />
              <Skeleton variant="text" width="160px" height="22px" delay={200 + i * 50} />
              <Skeleton variant="text" width="240px" height="12px" delay={220 + i * 50} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters Toolbar */}
      <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-4 flex flex-wrap items-center gap-3">
        <Skeleton variant="rectangular" width="140px" height="36px" style={{ borderRadius: '10px' }} delay={340} />
        <Skeleton variant="rectangular" width="140px" height="36px" style={{ borderRadius: '10px' }} delay={370} />
        <Skeleton variant="rectangular" width="100px" height="36px" style={{ borderRadius: '10px' }} delay={400} />
        <div className="flex-1" />
        <Skeleton variant="rectangular" width="80px" height="36px" style={{ borderRadius: '10px' }} delay={430} />
      </div>

      {/* Main Chart */}
      <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton variant="text" width="200px" height="20px" delay={460} />
          <Skeleton variant="text" width="120px" height="14px" delay={480} />
        </div>
        {/* Chart area */}
        <div className="h-[300px] md:h-[400px] flex items-end gap-2 px-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={`${30 + Math.random() * 60}%`}
                style={{ borderRadius: '8px 8px 0 0' }}
                delay={500 + i * 25}
              />
              <Skeleton variant="text" width="80%" height="10px" delay={520 + i * 25} />
            </div>
          ))}
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 md:p-8">
        <Skeleton variant="text" width="180px" height="20px" delay={820} />
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <div key={i} className="p-4 rounded-2xl border border-border flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" width="36px" height="36px" delay={860 + i * 40} />
                <Skeleton variant="text" width="140px" height="16px" delay={880 + i * 40} />
              </div>
              <Skeleton variant="text" width="100%" height="12px" delay={900 + i * 40} />
              <Skeleton variant="text" width="90%" height="12px" delay={920 + i * 40} />
              <Skeleton variant="text" width="70%" height="12px" delay={940 + i * 40} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsMarketSkeleton;
