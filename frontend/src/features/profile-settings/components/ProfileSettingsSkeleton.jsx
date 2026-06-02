import React from 'react';
import { Skeleton } from '../../../components/ui/Skeleton';

const ProfileSettingsSkeleton = () => {
  return (
    <div className="space-y-6 animate-skeleton-in">
      {/* Page Header Skeleton */}
      <div className="mb-6 md:mb-8">
        <Skeleton variant="text" width="240px" height="28px" />
        <div className="mt-2">
          <Skeleton variant="text" width="420px" height="16px" delay={40} />
        </div>
      </div>

      {/* Profile Overview Card Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar Skeleton */}
          <Skeleton variant="circular" width="96px" height="96px" delay={80} />

          {/* User Info Skeleton */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0 space-y-3">
                <Skeleton variant="text" width="180px" height="24px" delay={100} />
                <div className="flex flex-wrap items-center gap-4">
                  <Skeleton variant="text" width="120px" height="14px" delay={120} />
                  <Skeleton variant="text" width="160px" height="14px" delay={140} />
                </div>
                {/* Status Badge */}
                <div className="pt-1">
                  <Skeleton variant="rectangular" width="110px" height="26px" style={{ borderRadius: '999px' }} delay={160} />
                </div>
              </div>

              {/* Edit button skeleton */}
              <Skeleton variant="rectangular" width="100px" height="38px" style={{ borderRadius: '12px' }} delay={180} className="shrink-0 self-start" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation Skeleton */}
      <div className="flex gap-2 border-b border-border pb-px overflow-x-auto">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="120px"
            height="40px"
            style={{ borderRadius: '12px 12px 0 0' }}
            delay={200 + i * 40}
          />
        ))}
      </div>

      {/* Tab Content Skeleton (Form Card) */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm pb-10">
        <div className="mb-6 space-y-2">
          <Skeleton variant="text" width="160px" height="20px" delay={360} />
          <Skeleton variant="text" width="300px" height="14px" delay={380} />
        </div>

        {/* Two-column Form Fields Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton variant="text" width="100px" height="14px" delay={400 + i * 50} />
              <Skeleton variant="rectangular" width="100%" height="46px" style={{ borderRadius: '12px' }} delay={420 + i * 50} />
            </div>
          ))}
        </div>

        {/* Save Button Skeleton */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
          <Skeleton variant="rectangular" width="160px" height="42px" style={{ borderRadius: '12px' }} delay={650} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsSkeleton;
