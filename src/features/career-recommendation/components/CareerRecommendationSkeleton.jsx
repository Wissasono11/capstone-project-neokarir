import React from 'react';
import { Skeleton } from '../../../components/ui/Skeleton';

const CareerRecommendationSkeleton = () => {
  return (
    <div className="space-y-6 animate-skeleton-in">
      {/* Header and Stats */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 w-full">
          <Skeleton variant="text" width="280px" height="28px" />
          <div className="mt-3">
            <Skeleton variant="text" width="90%" height="14px" delay={40} />
            <Skeleton variant="text" width="70%" height="14px" delay={60} />
          </div>
        </div>
        <div className="shrink-0 flex items-center justify-center">
          <Skeleton variant="circular" width="100px" height="100px" delay={100} />
        </div>
      </div>

      {/* AI Advisor Insight Banner */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-start gap-4">
        <Skeleton variant="circular" width="40px" height="40px" delay={140} />
        <div className="flex-1">
          <Skeleton variant="text" width="160px" height="18px" delay={160} />
          <div className="mt-2 space-y-2">
            <Skeleton variant="text" width="100%" height="12px" delay={180} />
            <Skeleton variant="text" width="90%" height="12px" delay={200} />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Skeleton variant="rectangular" width="100%" height="42px" style={{ borderRadius: '12px', flex: '1 1 auto' }} delay={240} />
        <div className="flex gap-2 w-full md:w-auto">
          <Skeleton variant="rectangular" width="140px" height="42px" style={{ borderRadius: '12px' }} delay={260} />
          <Skeleton variant="rectangular" width="140px" height="42px" style={{ borderRadius: '12px' }} delay={280} />
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1 mb-1">
          <Skeleton variant="text" width="240px" height="14px" delay={300} />
        </div>

        {/* Grid of Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden"
            >
              {/* Company & Title */}
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex gap-3 w-full">
                  <Skeleton variant="rectangular" width="40px" height="40px" style={{ borderRadius: '12px', flexShrink: 0 }} delay={320 + i * 50} />
                  <div className="flex-1">
                    <Skeleton variant="text" width="100px" height="12px" delay={340 + i * 50} />
                    <Skeleton variant="text" width="140px" height="16px" delay={360 + i * 50} style={{ marginTop: '4px' }} />
                    <Skeleton variant="text" width="120px" height="12px" delay={380 + i * 50} style={{ marginTop: '4px' }} />
                  </div>
                </div>
                <div className="shrink-0">
                  <Skeleton variant="rectangular" width="80px" height="24px" style={{ borderRadius: '8px' }} delay={400 + i * 50} />
                </div>
              </div>

              {/* Requirement Specs */}
              <div className="flex items-center gap-4 mb-4">
                <Skeleton variant="text" width="80px" height="14px" delay={420 + i * 50} />
                <Skeleton variant="text" width="100px" height="14px" delay={440 + i * 50} />
              </div>

              {/* Skills Match Progress Bar */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center mb-1.5">
                  <Skeleton variant="text" width="100px" height="12px" delay={460 + i * 50} />
                  <Skeleton variant="text" width="80px" height="12px" delay={480 + i * 50} />
                </div>
                <Skeleton variant="rectangular" width="100%" height="6px" style={{ borderRadius: '999px', marginBottom: '12px' }} delay={500 + i * 50} />
                
                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5">
                  {[0, 1, 2, 3].map((tagIndex) => (
                    <Skeleton 
                      key={tagIndex} 
                      variant="rectangular" 
                      width={`${60 + Math.random() * 40}px`} 
                      height="22px" 
                      style={{ borderRadius: '4px' }} 
                      delay={520 + (i * 50) + (tagIndex * 10)} 
                    />
                  ))}
                </div>
              </div>

              {/* Bottom info link */}
              <div className="flex justify-end items-center mt-3 pt-3 border-t border-dashed border-slate-100">
                <Skeleton variant="text" width="120px" height="14px" delay={560 + i * 50} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerRecommendationSkeleton;
