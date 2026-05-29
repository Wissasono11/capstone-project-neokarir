import React from 'react';
import { Skeleton } from '../../../components/ui/Skeleton';

/**
 * AI Assistant page skeleton loader.
 * Mirrors the layout: Hero Header → Chat Window (Sidebar + Chat Area)
 */
const AIAssistantSkeleton = () => {
  return (
    <div className="space-y-6 animate-skeleton-in">
      {/* AIAssistantHero Skeleton */}
      <div className="mb-6">
        <Skeleton variant="text" width="140px" height="14px" delay={0} />
        <div className="flex items-center gap-4 mt-4">
          <div>
            <Skeleton variant="text" width="220px" height="28px" delay={40} />
            <div className="mt-2">
              <Skeleton variant="text" width="340px" height="14px" delay={80} />
            </div>
          </div>
        </div>
      </div>

      {/* ChatWindow Skeleton */}
      <div className="w-full relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex h-[600px] md:h-[680px] shadow-sm">
        
        {/* Conversations Sidebar Skeleton (Hidden on mobile) */}
        <div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200/80">
          <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
            <Skeleton variant="text" width="120px" height="16px" delay={120} />
            <Skeleton variant="rectangular" width="32px" height="32px" style={{ borderRadius: '8px' }} delay={140} />
          </div>
          <div className="p-3">
            <Skeleton variant="rectangular" width="100%" height="36px" style={{ borderRadius: '8px' }} delay={160} />
          </div>
          <div className="flex-1 p-3 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rectangular" width="100%" height="48px" style={{ borderRadius: '8px' }} delay={180 + i * 40} />
            ))}
          </div>
        </div>

        {/* Main Chat Feed Area Skeleton */}
        <div className="flex-1 flex flex-col bg-[#F8FAFC]">
          
          {/* Chat Feed Header */}
          <div className="h-[72px] bg-white border-b border-slate-200/80 px-4 md:px-6 flex justify-between items-center shrink-0 shadow-sm relative z-10">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" width="40px" height="40px" delay={340} />
              <div className="flex flex-col gap-1.5">
                <Skeleton variant="text" width="140px" height="14px" delay={360} />
                <Skeleton variant="text" width="80px" height="10px" delay={380} />
              </div>
            </div>
            <Skeleton variant="rectangular" width="80px" height="32px" style={{ borderRadius: '8px' }} delay={400} />
          </div>

          {/* Chat Messages Scrolling Area */}
          <div className="flex-1 p-4 md:p-6 space-y-6">
            {/* Bot Message */}
            <div className="flex items-start gap-3 w-full justify-start">
              <Skeleton variant="circular" width="36px" height="36px" delay={420} />
              <div className="max-w-[70%]">
                <Skeleton variant="rectangular" width="280px" height="80px" style={{ borderRadius: '0px 16px 16px 16px' }} delay={440} />
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-end gap-3 w-full justify-end mt-6">
              <div className="max-w-[70%] flex flex-col items-end">
                <Skeleton variant="rectangular" width="220px" height="50px" style={{ borderRadius: '16px 16px 0px 16px' }} delay={480} />
                <Skeleton variant="text" width="60px" height="10px" delay={500} style={{ marginTop: '8px' }} />
              </div>
            </div>
            
            {/* Bot Message */}
            <div className="flex items-start gap-3 w-full justify-start mt-6">
              <Skeleton variant="circular" width="36px" height="36px" delay={520} />
              <div className="max-w-[70%]">
                <Skeleton variant="rectangular" width="320px" height="100px" style={{ borderRadius: '0px 16px 16px 16px' }} delay={540} />
              </div>
            </div>
          </div>

          {/* Bottom Bar: Input Form */}
          <div className="p-4 md:p-6 bg-white border-t border-slate-200/80">
            <div className="flex gap-2 mb-3">
              <Skeleton variant="rectangular" width="120px" height="28px" style={{ borderRadius: '999px' }} delay={580} />
              <Skeleton variant="rectangular" width="160px" height="28px" style={{ borderRadius: '999px' }} delay={600} />
            </div>
            <div className="flex items-end gap-3 relative">
              <Skeleton variant="rectangular" width="100%" height="56px" style={{ borderRadius: '16px' }} delay={620} />
              <Skeleton variant="rectangular" width="56px" height="56px" style={{ borderRadius: '16px' }} delay={640} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AIAssistantSkeleton;
