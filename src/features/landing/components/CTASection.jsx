import React from 'react';
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, ScanFace, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ctaContainerVariants, floatAnimation, floatAnimationDelayed } from '../../../utils/animations';

const CTASection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <motion.div
          variants={ctaContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-dashboard-background rounded-[2.5rem] px-6 md:px-12 py-12 md:py-16 relative overflow-hidden shadow-2xl group"
        >

          <motion.div
            variants={floatAnimation}
            animate="animate"
            className="absolute top-10 left-10 md:top-12 md:left-16"
          >
            <Sparkles className="text-white/30 w-8 h-8" />
          </motion.div>
          <motion.div
            variants={floatAnimationDelayed}
            animate="animate"
            className="absolute bottom-10 right-10 md:bottom-12 md:right-16"
          >
            <Sparkles className="text-white/20 w-10 h-10" />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 text-white/90 text-sm font-medium shadow-sm">
              <ScanFace className="w-4 h-4 text-purple-200" />
              <span>Smart AI Analysis Ready</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              Stop Guessing Your Career Path.
            </h2>

            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto font-light">
              Let AI map the fastest route to your dream job. Just enter your email to get started, and let our system do the rest.
            </p>

            <form
              className="w-full max-w-xl flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-md rounded-[1.25rem] border border-white/20 shadow-inner focus-within:bg-white/15 transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder:text-gray-300/80 text-lg focus:ring-0"
                required
              />
              <Link to="/register" className="bg-white text-[#5B21B6] hover:bg-gray-50 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 shrink-0">
                Analyze My Profile
                <ArrowRight className="w-5 h-5" />
              </Link>
            </form>

            <p className="text-purple-200/60 text-sm mt-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 100% Free. No credit card required.
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
