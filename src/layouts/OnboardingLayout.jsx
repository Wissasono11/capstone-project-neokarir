import React from 'react';
import { motion } from 'framer-motion';
import { navbarVariants } from '../animations/variants';
import logo from '../assets/images/logo.png';

const OnboardingLayout = ({ currentStep, totalSteps = 3, children }) => {
  return (
    <div className="min-h-screen bg-canvas-white flex flex-col relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-linear-to-b from-accent-purple-light/40 to-transparent pointer-events-none" />

      {/* Navbar */}
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-border/50 py-4"
      >
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary tracking-tight">
              NeoKarir
            </span>
          </div>
          <div className="text-sm font-medium text-secondary-text">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-32 pb-20 px-4 relative z-10">
        <div className="w-full max-w-[800px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
