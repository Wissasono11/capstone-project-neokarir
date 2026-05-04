import React from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket, UploadCloud, CheckCircle2 } from 'lucide-react';
import { staggerContainerVariants as containerVariants, fadeInUpItemVariants as itemVariants } from '../../../utils/animations';

const HowItWorksSection = () => {
  return (
    <section id="works" className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-secondary-text font-medium tracking-wide mb-4 uppercase text-sm">
            How it works?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-6 tracking-tight">
            Just these <span className="text-primary">easy steps</span> to build your career with us
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Step 1 */}
          <motion.div variants={itemVariants} className="bg-[#F5F7FF] rounded-4xl p-8 pb-0 md:p-12 md:pb-0 flex flex-col relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="mb-8 relative z-10">
              <div className="text-xl font-bold text-primary-text mb-2">01.</div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-text mb-4">Discover Your Starting Point</h3>
              <p className="text-secondary-text leading-relaxed max-w-md">
                Upload your CV or fill in your profile manually. Our Smart AI will instantly extract your skills, experience, and interests in seconds.
              </p>
            </div>
            
            <div className="mt-auto relative z-10 w-full flex justify-center">
              {/* Mockup for Step 1: Phone / App Interface */}
              <div className="w-[280px] h-[340px] bg-white rounded-t-4xl shadow-xl border-x-8 border-t-8 border-gray-900 p-4 relative translate-y-8 group-hover:translate-y-4 transition-transform duration-500">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-xl"></div>
                <div className="pt-6">
                  <h4 className="font-semibold text-lg text-primary-text mb-1">Upload Profile</h4>
                  <p className="text-xs text-secondary-text mb-4">Let AI analyze your background.</p>
                  
                  <div className="w-full h-32 border-2 border-dashed border-indigo-200 rounded-xl bg-indigo-50/50 flex flex-col items-center justify-center mb-4">
                    <UploadCloud className="w-8 h-8 text-primary mb-2" />
                    <span className="text-xs font-medium text-primary">Upload your CV</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-10 bg-gray-50 rounded-lg flex items-center px-3 border border-gray-100">
                      <span className="text-xs text-gray-400">Manual Entry...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl"></div>
          </motion.div>

          {/* Right Column (Stacked) */}
          <div className="flex flex-col gap-6 lg:gap-8">
            
            {/* Step 2 */}
            <motion.div variants={itemVariants} className="bg-[#F0FDF4] rounded-4xl p-8 md:p-10 flex flex-col md:flex-row relative overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex-1">
              <div className="relative z-10 md:w-3/5 pr-4 mb-6 md:mb-0">
                <div className="text-xl font-bold text-primary-text mb-2">02.</div>
                <h3 className="text-2xl font-bold text-primary-text mb-3">Map Your Skill Gaps</h3>
                <p className="text-secondary-text text-sm md:text-base leading-relaxed">
                  AI compares your profile with real-time job market trends. See your Job Match Score and know what skills you need to improve through an interactive Radar Chart.
                </p>
              </div>
              
              <div className="relative z-10 md:w-2/5 flex items-center justify-center">
                {/* Mockup for Step 2 */}
                <div className="w-full max-w-[220px] bg-white rounded-2xl shadow-sm border border-emerald-100 p-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Target className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Match Score</div>
                      <div className="text-xs text-emerald-600 font-medium">High Potential</div>
                    </div>
                  </div>
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent border-l-transparent rotate-45"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-emerald-700">85%</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-200/30 rounded-full blur-2xl"></div>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={itemVariants} className="bg-[#FAF5FF] rounded-4xl p-8 md:p-10 flex flex-col md:flex-row relative overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex-1">
              <div className="relative z-10 md:w-3/5 pr-4 mb-6 md:mb-0">
                <div className="text-xl font-bold text-primary-text mb-2">03.</div>
                <h3 className="text-2xl font-bold text-primary-text mb-3">Start Your Career Journey</h3>
                <p className="text-secondary-text text-sm md:text-base leading-relaxed">
                  Get a personalized step-by-step learning roadmap. Learn the right skills, optimize your CV, and become the most sought-after candidate in the industry!
                </p>
              </div>
              
              <div className="relative z-10 md:w-2/5 flex items-center justify-center">
                {/* Mockup for Step 3 */}
                <div className="w-full max-w-[220px] bg-white rounded-2xl shadow-sm border border-purple-100 p-4 transform group-hover:translate-x-2 transition-transform duration-500">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-fuchsia-500 flex items-center justify-center shrink-0">
                      <Rocket className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 leading-tight">UX Researcher</div>
                      <div className="text-xs text-gray-500">Learning Path</div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <div className="h-2 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <div className="h-2 w-20 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2 opacity-50">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                      <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-200/30 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
