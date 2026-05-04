import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';

const RadarChartComp = ({ data, overallScore }) => {
  return (
    <div className="bg-white rounded-3xl border border-border p-6 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[17px] font-bold text-primary-text">Skill Gap Analysis</h3>
        <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
          View Details
        </button>
      </div>

      <div className="flex-1 w-full min-h-[200px] relative mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748B', fontSize: 10, fontWeight: 500 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar 
              name="Skill" 
              dataKey="A" 
              stroke="#4F46E5" 
              strokeWidth={2}
              fill="#4F46E5" 
              fillOpacity={0.15} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-center pb-2">
        <div className="text-2xl font-bold text-primary-text">{overallScore}%</div>
        <p className="text-xs font-medium text-secondary-text mt-0.5">Overall Match Score</p>
      </div>
    </div>
  );
};

export default RadarChartComp;
