import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';
import { profilingResultVariants } from '../../../utils/animations';

const ProfilingHero = ({ score }) => {
  return (
    <motion.div 
      variants={profilingResultVariants}
      className="w-full bg-dashboard-background from-primary to-accent-purple rounded-[32px] p-8 md:p-12 text-white shadow-xl relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6">
            <Feather size={16} className="text-ye" />
            <span>Analysis Complete</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Your Career Profile is Ready! 
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">
            We've mapped your skills and experience against industry standards. Here's a personalized blueprint to accelerate your career.
          </p>
        </div>
        
        <div className="shrink-0 flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 md:w-40 md:h-40 flex items-center justify-center">
            {/* SVG Circle Progress */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track Circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="6"
                fill="none"
              />
              {/* Foreground Score Circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-white"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(score / 100) * 263.89} 263.89`}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10 px-2">
              <span className="text-heading-lg md:text-heading-xl font-bold leading-none">{score}%</span>
              <span className="block text-white/70 text-caption md:text-body-sm font-medium mt-1">Match Score</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilingHero;
