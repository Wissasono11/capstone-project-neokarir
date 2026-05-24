import React from 'react';
import { motion } from 'framer-motion';
import { profilingResultVariants } from '../../../utils/animations';

const CareerMatchCard = ({ career }) => {
  return (
    <motion.div 
      variants={profilingResultVariants}
      className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-bg-secondary p-2 flex items-center justify-center shrink-0 border border-border">
            <img src={career.icon} alt={career.company} className="w-full h-full object-contain mix-blend-multiply" onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<span class="font-bold text-primary">${career.company.charAt(0)}</span>`;
            }} />
          </div>
          <div>
            <h3 className="font-bold text-primary-text group-hover:text-primary transition-colors text-lg">
              {career.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-secondary-text mt-1">
              <span className="font-medium text-primary-text">{career.company}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent-purple-light text-accent-purple font-bold border-4 border-white shadow-sm ring-1 ring-border/50">
            {career.matchScore}%
          </div>
          <span className="text-caption font-semibold text-secondary-text uppercase tracking-wider mt-1">Match</span>
        </div>
      </div>
      
      {/* Required Skills list */}
      {career.requiredSkills && career.requiredSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/40">
          {career.requiredSkills.map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-bg-secondary text-primary font-bold text-caption">
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CareerMatchCard;
