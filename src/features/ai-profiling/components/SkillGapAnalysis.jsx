import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { profilingResultVariants } from '../../../utils/animations';

const SkillGapAnalysis = ({ data, overallScore }) => {
  return (
    <motion.div 
      variants={profilingResultVariants}
      className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-primary-text">Skill Gap Analysis</h3>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View Details
        </button>
      </div>

      <div className="flex-1 w-full min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar 
              name="User Skill" 
              dataKey="A" 
              stroke="#7C3AED" 
              strokeWidth={2}
              fill="#7C3AED" 
              fillOpacity={0.2} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-center">
        <div className="text-3xl font-bold text-primary-text">{overallScore}%</div>
        <p className="text-sm font-medium text-secondary-text mt-1">Overall Match Score</p>
      </div>
    </motion.div>
  );
};

export default SkillGapAnalysis;
