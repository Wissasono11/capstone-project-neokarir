import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants as containerVariants, fadeInUpItemVariants as itemVariants } from '../../../utils/animations';

const ProblemSection = () => {
  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary-text mb-4 tracking-tight">Why do you need NeoKarir?</h2>
          <p className="text-lg text-secondary-text max-w-3xl mx-auto leading-relaxed">
            The gap between talent and industry needs is widening. We are here to eliminate the guesswork and confusion in planning your career.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 min-h-[600px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 relative rounded-[24px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1613324996029-f6190a17838f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Information overload and confusing charts"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 bg-[#1F2937] rounded-[24px] p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-700/30 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug">
                The Rigid Recruitment System <span className="block text-gray-400 text-lg mt-1 font-medium">(The ATS Wall)</span>
              </h3>
              <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                Millions of great talents are rejected by automated systems (ATS) before their CVs are ever read by a human. Our Smart AI analyzes and uncovers hidden criteria so your profile is always relevant.
              </p>
            </div>
          </motion.div>

          {/* Card 3 (Right Tall - Image) */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2 relative rounded-[24px] overflow-hidden group">
            <img
              src="https://plus.unsplash.com/premium_photo-1669627111607-fd97efe8866c?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dauto=format&fit=crop"
              alt="Looking up at corporate buildings"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          </motion.div>

          {/* Card 4 (Bottom Left - Primary Color Text Card) */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 bg-[#7C3AED] rounded-[24px] p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
            <div className="relative z-10 flex flex-col h-full justify-center gap-4 max-w-lg">
              <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                Trapped in Learning Overload
              </h3>
              <p className="text-base lg:text-lg text-indigo-100 leading-relaxed">
                Too many bootcamps, courses, and tutorials often just waste time and money without clear direction. We cut through the noise with a 100% personalized visual roadmap focusing only on the skills you actually need.
              </p>
            </div>
          </motion.div>

          {/* Card 5 (Bottom Middle - Small Image) */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 relative rounded-[24px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=928&auto=format&fit=crop"
              alt="Messy desk with papers and coffee"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
