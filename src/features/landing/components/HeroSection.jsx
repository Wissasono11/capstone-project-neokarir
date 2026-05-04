import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button';
import { heroTextContainerVariants as textContainerVariants, heroTextItemVariants as textItemVariants, heroImageVariants as imageVariants } from '../../../utils/animations';

const HeroSection = () => {
  return (
    <section id="home" className="pt-32 pb-20 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          className="lg:col-span-6 z-10"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={textItemVariants}
            className="text-5xl md:text-6xl font-extrabold text-primary-text leading-tight mb-6 tracking-tight"
          >
            Your Future Career, <br />
            <span className="text-primary">Woven by AI</span>
          </motion.h1>
          <motion.p
            variants={textItemVariants}
            className="text-lg md:text-xl text-secondary-text mb-10 max-w-lg leading-relaxed"
          >
            Close your skill gap and reach your career targets faster. NeoKarir analyzes your profile, maps market trends, and creates instant data-driven personalized roadmaps.
          </motion.p>

          <motion.div variants={textItemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <Link to="/register" className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-4 shadow-sm hover:shadow-md transition-shadow font-semibold rounded-xl transition-all duration-300 spring-transition btn-tactile">
              Get Started
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={textItemVariants} className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="User" loading="lazy" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=2" alt="User" loading="lazy" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="User" loading="lazy" />
            </div>
            <p className="text-sm font-medium text-secondary-text">
              <strong className="text-primary-text font-bold">1,100+</strong> have joined
            </p>
          </motion.div>
        </motion.div>

        {/* Visual Content (Right, 45%) */}
        <motion.div
          className="lg:col-span-6 relative mt-10 lg:mt-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Image */}
          <div
            className="relative rounded-4xl overflow-hidden aspect-4/3 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop"
              alt="Professional team collaborating"
              className="w-full h-full object-cover"
              fetchpriority="high"
            />
          </div>

          {/* Floating Card 1: Role Match Score */}
          <div
            className="absolute -top-8 -right-2 md:-top-8 md:-right-8 bg-white rounded-xl md:rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] p-3 md:p-4 flex items-center gap-3 md:gap-4 border border-gray-100 animate-float spring-transition z-10"
          >
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary font-extrabold text-base md:text-lg">
              92%
            </div>
            <div className="pr-1 md:pr-2">
              <div className="text-xs md:text-sm font-bold text-primary-text">Data Scientist</div>
              <div className="text-[10px] md:text-xs font-medium text-secondary-text mt-0.5">Role Match Score</div>
            </div>
          </div>

          {/* Floating Card 2: Skill Gap Analysis */}
          <div
            className="absolute -bottom-10 -left-2 md:-bottom-8 md:-left-8 bg-white rounded-xl md:rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] p-4 md:p-6 w-[200px] md:w-[260px] border border-gray-100 spring-transition z-20"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-bg-secondary flex items-center justify-center text-primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-sm md:text-base font-bold text-primary-text tracking-tight">Skill Verified</div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="flex justify-between text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2">
                  <span className="text-secondary-text">Python</span>
                  <span className="text-primary-text">Expert</span>
                </div>
                <div className="h-1.5 w-full bg-bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[90%] relative"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2">
                  <span className="text-secondary-text">Machine Learning</span>
                  <span className="text-primary-text">Advanced</span>
                </div>
                <div className="h-1.5 w-full bg-bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[75%] relative"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
