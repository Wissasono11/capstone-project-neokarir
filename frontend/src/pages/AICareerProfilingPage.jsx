import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import { useAIProfiling } from '../features/ai-profiling/hooks/useAIProfiling';
import { profilingLoadingVariants, staggerContainerVariants, profilingResultVariants } from '../utils/animations';
import ProfilingHero from '../features/ai-profiling/components/ProfilingHero';
import CareerMatchCard from '../features/ai-profiling/components/CareerMatchCard';
import SkillGapAnalysis from '../features/ai-profiling/components/SkillGapAnalysis';
import LearningPathSection from '../features/ai-profiling/components/LearningPathSection';
import ProfilingCTA from '../features/ai-profiling/components/ProfilingCTA';

const AICareerProfilingPage = () => {
  const { isProcessing, progress, processingStatus, results } = useAIProfiling();

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-canvas-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple-light/30 rounded-full blur-3xl" />

        <motion.div
          variants={profilingLoadingVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center max-w-md w-full text-center"
        >
          <motion.div
            variants={profilingLoadingVariants}
            animate="pulse"
            className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center mb-8 relative border border-border"
          >
            {/* Circular Progress */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-bg-secondary"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-primary transition-all duration-300 ease-out"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(progress / 100) * 276.46} 276.46`}
                strokeLinecap="round"
              />
            </svg>
            <BrainCircuit size={48} className="text-accent-purple animate-pulse relative z-10" />
          </motion.div>

          <h2 className="text-2xl font-bold text-primary-text mb-3">{processingStatus}</h2>
          <p className="text-secondary-text font-medium">Mohon tunggu sebentar sementara model AI kami menganalisis profil karier Anda yang unik.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-white pb-24">
      {/* Top Navigation Bar - Simple */}
      <nav className="w-full bg-white border-b border-border py-4 sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center">
          <span className="text-2xl font-bold text-primary tracking-tight">NeoKarir</span>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-4 md:px-6 pt-10">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Section */}
          <ProfilingHero score={results.overallScore} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Matches */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                variants={profilingResultVariants}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-primary-text mb-6">Pilihan Karier Teratas</h3>
                <div className="space-y-4">
                  {results.topCareers.map(career => (
                    <CareerMatchCard key={career.id} career={career} />
                  ))}
                </div>
              </motion.div>

              <LearningPathSection paths={results.learningPath} />
            </div>

            {/* Right Column: Skill Gap */}
            <div className="lg:col-span-5 h-[500px] lg:h-auto">
              <SkillGapAnalysis data={results.skillGap} overallScore={results.overallScore} />
            </div>

          </div>

          {/* CTA Section */}
          <div className="pt-6">
            <ProfilingCTA />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AICareerProfilingPage;
