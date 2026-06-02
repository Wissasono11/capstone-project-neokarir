import React from 'react';
import { Skeleton, SkeletonText } from '../../../components/ui/Skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="animate-skeleton-in">
      {/* Greeting Header */}
      <div className="mb-6 md:mb-8">
        <Skeleton variant="text" width="280px" height="28px" style={{ borderRadius: '10px' }} />
        <div className="mt-2">
          <Skeleton variant="text" width="380px" height="16px" delay={60} />
        </div>
      </div>

      {/* Stat Cards Grid — 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Personal Card Skeleton */}
        <StatCardSkeleton delay={80} />
        {/* Current Focus Card Skeleton */}
        <FocusCardSkeleton delay={160} />
        {/* Progress Card Skeleton */}
        <ProgressCardSkeleton delay={240} />
      </div>

      {/* Section Title */}
      <div className="mb-6">
        <Skeleton variant="text" width="220px" height="22px" delay={300} />
      </div>

      {/* Middle Grid — Radar + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
        <div className="lg:col-span-5 h-[300px] md:h-[440px]">
          <RadarChartSkeleton delay={340} />
        </div>
        <div className="lg:col-span-7">
          <RecommendationListSkeleton delay={400} />
        </div>
      </div>

      {/* Bottom Grid — Tips + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 pb-10">
        <div className="lg:col-span-6">
          <TipsCardSkeleton delay={460} />
        </div>
        <div className="lg:col-span-6">
          <QuickLinksSkeleton delay={520} />
        </div>
      </div>
    </div>
  );
};

/* ===== Sub-components ===== */

const StatCardSkeleton = ({ delay = 0 }) => (
  <div
    className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col h-full"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Icon + Title Row */}
    <div className="flex items-center gap-3 mb-4">
      <Skeleton variant="circular" width="48px" height="48px" delay={delay} />
      <Skeleton variant="text" width="100px" height="18px" delay={delay + 40} />
    </div>
    {/* Content */}
    <div className="flex-1 flex flex-col justify-start gap-2">
      <Skeleton variant="text" width="160px" height="20px" delay={delay + 80} />
      <Skeleton variant="text" width="130px" height="14px" delay={delay + 120} />
      <div className="mt-2">
        <Skeleton variant="rectangular" width="110px" height="28px" style={{ borderRadius: '8px' }} delay={delay + 160} />
      </div>
    </div>
  </div>
);

const FocusCardSkeleton = ({ delay = 0 }) => (
  <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col h-full justify-between">
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="text" width="90px" height="12px" delay={delay} />
        <Skeleton variant="rectangular" width="28px" height="28px" style={{ borderRadius: '8px' }} delay={delay + 30} />
      </div>
      {/* Role */}
      <div className="mb-4">
        <Skeleton variant="text" width="180px" height="20px" delay={delay + 60} />
        <div className="mt-1">
          <Skeleton variant="text" width="150px" height="14px" delay={delay + 90} />
        </div>
      </div>
      {/* Progress bar */}
      <Skeleton variant="rectangular" width="100%" height="6px" style={{ borderRadius: '999px' }} delay={delay + 120} />
    </div>
    {/* Button */}
    <div className="mt-4">
      <Skeleton variant="rectangular" width="100%" height="36px" style={{ borderRadius: '12px' }} delay={delay + 150} />
    </div>
  </div>
);

const ProgressCardSkeleton = ({ delay = 0 }) => (
  <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col h-full justify-between">
    <div>
      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-5">
        <Skeleton variant="circular" width="48px" height="48px" delay={delay} />
        <Skeleton variant="text" width="140px" height="20px" delay={delay + 40} />
      </div>
      {/* Big number */}
      <div className="flex items-end gap-2 mb-5">
        <Skeleton variant="text" width="80px" height="36px" delay={delay + 80} style={{ borderRadius: '10px' }} />
        <Skeleton variant="text" width="120px" height="14px" delay={delay + 100} />
      </div>
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <Skeleton variant="text" width="90px" height="12px" delay={delay + 120} />
          <Skeleton variant="text" width="30px" height="12px" delay={delay + 130} />
        </div>
        <Skeleton variant="rectangular" width="100%" height="12px" style={{ borderRadius: '999px' }} delay={delay + 140} />
      </div>
    </div>
    {/* Button */}
    <div className="mt-4">
      <Skeleton variant="rectangular" width="100%" height="40px" style={{ borderRadius: '12px' }} delay={delay + 160} />
    </div>
  </div>
);

const RadarChartSkeleton = ({ delay = 0 }) => (
  <div className="bg-white rounded-3xl border border-border p-4 md:p-8 shadow-sm h-full flex flex-col">
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <Skeleton variant="text" width="140px" height="18px" delay={delay} />
      <Skeleton variant="text" width="80px" height="14px" delay={delay + 30} />
    </div>
    {/* Chart placeholder — hexagon-ish */}
    <div className="flex-1 flex items-center justify-center">
      <Skeleton variant="circular" width="180px" height="180px" delay={delay + 80} />
    </div>
    {/* Score */}
    <div className="mt-2 flex flex-col items-center gap-1">
      <Skeleton variant="text" width="60px" height="24px" delay={delay + 120} />
      <Skeleton variant="text" width="140px" height="12px" delay={delay + 150} />
    </div>
  </div>
);

const RecommendationListSkeleton = ({ delay = 0 }) => (
  <div className="bg-white rounded-3xl border border-border p-4 md:p-8 shadow-sm h-full flex flex-col">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <Skeleton variant="text" width="200px" height="18px" delay={delay} />
      <Skeleton variant="text" width="80px" height="14px" delay={delay + 30} />
    </div>
    {/* List items */}
    <div className="flex-1 flex flex-col gap-3 md:gap-4">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 md:p-4 rounded-2xl border border-border"
        >
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <Skeleton variant="rectangular" width="48px" height="48px" style={{ borderRadius: '12px' }} delay={delay + 60 + i * 50} />
            <div className="flex flex-col gap-1.5">
              <Skeleton variant="text" width="160px" height="14px" delay={delay + 80 + i * 50} />
              <Skeleton variant="text" width="100px" height="12px" delay={delay + 100 + i * 50} />
              <div className="flex gap-1 mt-0.5">
                <Skeleton variant="rectangular" width="50px" height="18px" style={{ borderRadius: '4px' }} delay={delay + 120 + i * 50} />
                <Skeleton variant="rectangular" width="40px" height="18px" style={{ borderRadius: '4px' }} delay={delay + 130 + i * 50} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 pl-2">
            <Skeleton variant="rectangular" width="45px" height="24px" style={{ borderRadius: '999px' }} delay={delay + 140 + i * 50} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TipsCardSkeleton = ({ delay = 0 }) => (
  <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-[32px] p-6 shadow-lg h-full flex flex-col justify-between relative overflow-hidden">
    {/* Decorative blur */}
    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
    <div>
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <Skeleton
          variant="rectangular" width="36px" height="36px"
          style={{ borderRadius: '12px', background: 'linear-gradient(90deg, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.25) 37%, rgba(255,255,255,0.15) 63%)', backgroundSize: '200% 100%' }}
          delay={delay}
        />
        <Skeleton
          variant="text" width="200px" height="18px"
          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.25) 37%, rgba(255,255,255,0.15) 63%)', backgroundSize: '200% 100%' }}
          delay={delay + 40}
        />
      </div>
      {/* Tips list */}
      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl p-4 flex items-start gap-3" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Skeleton
              variant="rectangular" width="32px" height="32px"
              style={{ borderRadius: '8px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 37%, rgba(255,255,255,0.1) 63%)', backgroundSize: '200% 100%', flexShrink: 0 }}
              delay={delay + 80 + i * 60}
            />
            <div className="flex-1 flex flex-col gap-1.5">
              <Skeleton
                variant="text" width="90%" height="14px"
                style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12) 25%, rgba(255,255,255,0.22) 37%, rgba(255,255,255,0.12) 63%)', backgroundSize: '200% 100%' }}
                delay={delay + 100 + i * 60}
              />
              <Skeleton
                variant="text" width="60%" height="12px"
                style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.16) 37%, rgba(255,255,255,0.08) 63%)', backgroundSize: '200% 100%' }}
                delay={delay + 120 + i * 60}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* CTA Button */}
    <div className="mt-6">
      <Skeleton
        variant="rectangular" width="100%" height="48px"
        style={{ borderRadius: '16px', background: 'linear-gradient(90deg, rgba(255,255,255,0.85) 25%, rgba(255,255,255,0.95) 37%, rgba(255,255,255,0.85) 63%)', backgroundSize: '200% 100%' }}
        delay={delay + 300}
      />
    </div>
  </div>
);

const QuickLinksSkeleton = ({ delay = 0 }) => (
  <div className="bg-white rounded-[32px] border border-border p-4 md:p-8 shadow-sm h-full flex flex-col">
    {/* Title */}
    <div className="mb-5 md:mb-6">
      <Skeleton variant="text" width="120px" height="20px" delay={delay} />
    </div>
    {/* Links grid */}
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-2.5 md:gap-3 p-3 rounded-2xl border border-border">
          <Skeleton variant="rectangular" width="40px" height="40px" style={{ borderRadius: '12px' }} delay={delay + 40 + i * 40} />
          <Skeleton variant="text" width="120px" height="14px" delay={delay + 60 + i * 40} />
        </div>
      ))}
    </div>
  </div>
);

export default DashboardSkeleton;
