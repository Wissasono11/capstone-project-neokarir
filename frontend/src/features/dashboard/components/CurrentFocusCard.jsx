import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Compass, ArrowRight } from 'lucide-react';

const CurrentFocusCard = ({ targetRole = "Full Stack Developer", compatibilityScore = 67 }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-caption font-extrabold text-indigo-600 uppercase tracking-wider">
            Target Karir
          </span>
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <Compass size={16} />
          </div>
        </div>

        {/* Role Target & Compatibility */}
        <div className="mb-4">
          <h4 className="text-body-lg md:text-subtitle font-bold text-primary-text mb-1 truncate">
            {targetRole}
          </h4>
          <p className="text-caption md:text-body-sm font-semibold text-secondary-text">
            Kompabilitas Industri: <strong className="text-indigo-600">{compatibilityScore}%</strong>
          </p>
        </div>

        {/* Mini progress bar */}
        <div className="w-full bg-border rounded-full h-1.5 mb-4">
          <div 
            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500" 
            style={{ width: `${compatibilityScore}%` }}
          />
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => navigate('/dashboard/skill-gap')}
        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-caption md:text-body-sm rounded-xl transition-all group"
      >
        <span>Kejar Skill Gap</span>
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

export default CurrentFocusCard;
