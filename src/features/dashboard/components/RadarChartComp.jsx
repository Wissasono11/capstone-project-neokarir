import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';

const RadarChartComp = ({ data, overallScore, showViewDetails = true }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-border p-4 md:p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-body md:text-subtitle font-bold text-primary-text">Skill Gap Analysis</h3>
        {showViewDetails && (
          <button 
            onClick={() => navigate('/dashboard/skill-gap')}
            className="text-caption md:text-body-sm font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            View Details
          </button>
        )}
      </div>

      <div className="flex-1 w-full min-h-[180px] relative mt-2 md:mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748B', fontSize: 8, fontWeight: 500 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar 
              name="Skill" 
              dataKey="A" 
              stroke="#4F46E5" 
              strokeWidth={2}
              fill="#4F46E5" 
              fillOpacity={0.15} 
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 text-center pb-1">
        <div className="text-body-lg md:text-title font-bold text-primary-text">{overallScore}%</div>
        <p className="text-caption font-medium text-secondary-text mt-0.5">Overall Match Score</p>
      </div>
    </div>
  );
};

export default RadarChartComp;
