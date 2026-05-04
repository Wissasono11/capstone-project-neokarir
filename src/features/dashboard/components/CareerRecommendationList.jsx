import React from 'react';
import { MapPin } from 'lucide-react';

const CareerRecommendationList = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-3xl border border-border p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[17px] font-bold text-primary-text">Top Career Recommendation</h3>
        <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
          See All
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-bg-secondary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-border/50 bg-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                <img src={rec.icon} alt={rec.company} className="w-8 h-8 object-contain" onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="font-bold text-primary">${rec.company.charAt(0)}</span>`;
                }} />
              </div>
              
              <div>
                <h4 className="font-bold text-primary-text group-hover:text-primary transition-colors mb-0.5">
                  {rec.title}
                </h4>
                <div className="text-xs font-medium text-secondary-text mb-1">
                  {rec.company}
                </div>
                <div className="flex items-center gap-3 text-[11px] font-medium text-secondary-text">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {rec.location}</span>
                  <span className="text-emerald-600 font-semibold">{rec.salary}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 pl-2">
              <div className="bg-accent-purple-light text-primary font-bold text-xs px-3 py-1 rounded-full mb-1">
                {rec.matchScore}%
              </div>
              <span className="text-[9px] text-secondary-text uppercase font-semibold">Match Score</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRecommendationList;
