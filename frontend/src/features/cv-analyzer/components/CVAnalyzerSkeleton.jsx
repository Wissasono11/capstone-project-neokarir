import React from 'react';
import { Skeleton } from '../../../components/ui/Skeleton';

const CVAnalyzerSkeleton = () => {
  return (
    <div className="animate-skeleton-in">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-8">
        <div>
          <Skeleton variant="text" width="200px" height="28px" />
          <div className="mt-2">
            <Skeleton variant="text" width="400px" height="14px" delay={60} />
          </div>
        </div>
      </div>

      {/* Upload Zone Skeleton */}
      <div className="space-y-10">
        <div className="border-2 border-dashed border-border rounded-3xl p-10 flex flex-col items-center justify-center gap-4" style={{ minHeight: '260px' }}>
          <Skeleton variant="circular" width="64px" height="64px" delay={100} />
          <Skeleton variant="text" width="240px" height="18px" delay={140} />
          <Skeleton variant="text" width="300px" height="14px" delay={180} />
          <Skeleton variant="rectangular" width="180px" height="42px" style={{ borderRadius: '12px' }} delay={220} />
          <Skeleton variant="text" width="200px" height="12px" delay={260} />
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/60"></span>
          </div>
          <Skeleton variant="rectangular" width="180px" height="16px" style={{ borderRadius: '4px', position: 'relative', zIndex: 1 }} delay={280} />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col gap-4">
              <Skeleton variant="rectangular" width="48px" height="48px" style={{ borderRadius: '14px' }} delay={320 + i * 60} />
              <Skeleton variant="text" width="160px" height="18px" delay={360 + i * 60} />
              <div className="flex flex-col gap-1.5">
                <Skeleton variant="text" width="100%" height="12px" delay={390 + i * 60} />
                <Skeleton variant="text" width="85%" height="12px" delay={410 + i * 60} />
                <Skeleton variant="text" width="65%" height="12px" delay={430 + i * 60} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CVAnalyzerSkeleton;
