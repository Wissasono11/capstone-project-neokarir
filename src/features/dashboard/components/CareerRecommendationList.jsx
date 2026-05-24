import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CareerRecommendationList = ({ recommendations }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl border border-border p-4 md:p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-body md:text-subtitle font-bold text-primary-text">Top Career Recommendation</h3>
        <button onClick={() => navigate('/dashboard/recommendations')} className="text-caption md:text-body-sm font-bold text-primary hover:text-primary/80 transition-colors shrink-0 cursor-pointer">
          See All
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3 md:gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-center justify-between p-3 md:p-4 rounded-2xl border border-border hover:border-primary/40 hover:bg-bg-secondary/20 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-border/50 bg-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                <img src={rec.icon} alt={rec.company} className="w-6 h-6 md:w-8 md:h-8 object-contain" onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="font-bold text-primary text-body-sm">${rec.company.charAt(0)}</span>`;
                }} />
              </div>

              <div className="min-w-0">
                <h4 className="font-bold text-body-sm md:text-body text-primary-text group-hover:text-primary transition-colors mb-0.5 truncate">
                  {rec.title}
                </h4>
                <div className="text-caption font-medium text-secondary-text truncate">
                  {rec.company}
                </div>
                {rec.requiredSkills && rec.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {rec.requiredSkills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-bg-secondary text-primary font-semibold text-caption">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 shrink-0 pl-2">
              <div className="flex flex-col items-end">
                <div className="bg-accent-purple-light text-primary font-bold text-caption px-2.5 py-1 rounded-full mb-0.5">
                  {rec.matchScore}%
                </div>
                <span className="text-caption text-secondary-text font-medium">Match</span>
              </div>
              <ChevronRight size={16} className="text-secondary-text/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRecommendationList;
