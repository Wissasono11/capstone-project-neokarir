import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { profilingResultVariants } from '../../../utils/animations';

const LearningPathSection = ({ paths }) => {
  return (
    <motion.div 
      variants={profilingResultVariants}
      className="bg-white rounded-2xl border border-border p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-primary-text mb-6">Rekomendasi Learning Path</h3>
      
      <div className="space-y-4">
        {paths.map((path, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-bg-secondary/50 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-purple-light text-accent-purple flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <PlayCircle size={24} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h4 className="font-bold text-primary-text text-body-sm md:text-body leading-snug">{path.title}</h4>
                  <span className={`text-caption font-bold px-2.5 py-0.5 rounded-full shrink-0 self-start ${
                    path.tag === 'High Priority' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {path.tag}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption md:text-body-sm text-secondary-text font-medium">
                  <span className="flex items-center gap-1.5"><BookOpen size={13} /> {path.platform}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {path.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LearningPathSection;
