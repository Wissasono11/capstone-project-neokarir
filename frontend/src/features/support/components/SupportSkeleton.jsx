import React from 'react';
import { Skeleton } from '../../../components/ui/Skeleton';

const SupportSkeleton = () => {
  const shimmerStyle = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.12) 25%, rgba(255,255,255,0.22) 37%, rgba(255,255,255,0.12) 63%)',
    backgroundSize: '200% 100%',
  };

  return (
    <div className="space-y-6 animate-skeleton-in">
      {/* Hero Skeleton (mimics dark SupportHero) */}
      <div className="relative overflow-hidden bg-dashboard-background rounded-3xl p-6 md:p-10 shadow-lg mb-8 border border-white/10">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          {/* Badge */}
          <Skeleton
            variant="rectangular"
            width="160px"
            height="28px"
            style={{ borderRadius: '999px', ...shimmerStyle }}
            delay={0}
          />
          {/* Title */}
          <Skeleton
            variant="text"
            width="280px"
            height="32px"
            style={shimmerStyle}
            delay={40}
          />
          {/* Description */}
          <div className="space-y-2">
            <Skeleton
              variant="text"
              width="90%"
              height="14px"
              style={shimmerStyle}
              delay={80}
            />
            <Skeleton
              variant="text"
              width="70%"
              height="14px"
              style={shimmerStyle}
              delay={100}
            />
          </div>
          {/* Search bar input placeholder */}
          <div className="pt-2">
            <Skeleton
              variant="rectangular"
              width="100%"
              height="48px"
              style={{ borderRadius: '16px', maxW: '448px', ...shimmerStyle }}
              delay={140}
              className="max-w-lg"
            />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex border-b border-border mb-8 overflow-x-auto gap-2">
        {[0, 1, 2].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="140px"
            height="44px"
            style={{ borderRadius: '12px 12px 0 0' }}
            delay={180 + i * 40}
          />
        ))}
      </div>

      {/* FAQ Tab Content Skeleton */}
      <div className="space-y-6">
        {/* Section title & subtitle */}
        <div className="flex justify-between items-end border-b border-border/60 pb-4 mb-2">
          <div className="space-y-2">
            <Skeleton variant="text" width="220px" height="20px" delay={300} />
            <Skeleton variant="text" width="340px" height="14px" delay={320} />
          </div>
          <Skeleton variant="rectangular" width="120px" height="24px" style={{ borderRadius: '999px' }} delay={340} className="hidden sm:block" />
        </div>

        {/* Accordion list items skeleton */}
        <div className="space-y-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border border-border rounded-2xl bg-white p-5 flex items-center justify-between shadow-sm"
            >
              <Skeleton variant="text" width={`${60 + Math.random() * 30}%`} height="16px" delay={360 + i * 50} />
              <Skeleton variant="circular" width="18px" height="18px" delay={380 + i * 50} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportSkeleton;
