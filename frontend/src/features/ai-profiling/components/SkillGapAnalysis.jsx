import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import { profilingResultVariants } from '../../../utils/animations';

const SkillGapAnalysis = ({ data, overallScore }) => {
  return (
    <motion.div 
      variants={profilingResultVariants}
      className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-primary-text">Skill Gap Analysis</h3>
      </div>

      <div className="flex-1 w-full min-h-[250px] relative mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748B', fontSize: 10, fontWeight: 500 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value, name) => [value + '%', name === 'A' ? 'Skill Anda' : 'Kebutuhan Target']}
            />
            <Radar 
              name="Skill Anda" 
              dataKey="A" 
              stroke="#6366F1" 
              strokeWidth={2}
              fill="#6366F1" 
              fillOpacity={0.15} 
              isAnimationActive={true}
            />
            <Radar 
              name="Kebutuhan Target" 
              dataKey="B" 
              stroke="#F59E0B" 
              strokeWidth={2}
              fill="#F59E0B" 
              fillOpacity={0.05} 
              strokeDasharray="4 4"
              isAnimationActive={true}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '10px' }} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-center border-t border-slate-100 pt-4 flex justify-around items-center">
        <div>
          <div className="text-2xl font-black text-indigo-600">{overallScore}%</div>
          <p className="text-caption font-bold text-slate-400 uppercase tracking-wide mt-0.5">Match Score</p>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div>
          <div className="text-body-sm font-semibold text-slate-600">
            {overallScore >= 90 ? "Sangat Siap" : overallScore >= 70 ? "Hampir Siap" : "Perlu Belajar"}
          </div>
          <p className="text-caption font-bold text-slate-400 uppercase tracking-wide mt-0.5">Status Kesiapan</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillGapAnalysis;
