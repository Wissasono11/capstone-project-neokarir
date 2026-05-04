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
      <h3 className="text-xl font-bold text-primary-text mb-6">Recommended Learning Path</h3>
      
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
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-primary-text">{path.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    path.tag === 'High Priority' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {path.tag}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-secondary-text font-medium">
                  <span className="flex items-center gap-1.5"><BookOpen size={14} /> {path.platform}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {path.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
              Start Learning <ChevronRight size={18} className="ml-1" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LearningPathSection;
