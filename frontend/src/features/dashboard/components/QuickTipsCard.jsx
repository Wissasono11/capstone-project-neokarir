import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, ChevronRight } from 'lucide-react';

const QuickTipsCard = ({ tips }) => {
  const navigate = useNavigate();
  const activeTips = tips || defaultTips;

  return (
    <div className="bg-dashboard-background rounded-[32px] p-6 shadow-lg h-full flex flex-col justify-between relative overflow-hidden">
      {/* Decorative blur elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div>
        <div className="flex items-center gap-2.5 mb-6 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Lightbulb size={18} className="text-white" />
          </div>
          <h3 className="text-body md:text-subtitle font-bold text-white">Tips Cepat & Aksi Selanjutnya</h3>
        </div>
        
        <div className="flex flex-col gap-3 relative z-10">
          {activeTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div 
                key={tip.id} 
                onClick={() => navigate('/dashboard/skill-gap')}
                className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-start gap-3 hover:bg-white/20 transition-all cursor-pointer group ${
                  tip.completed ? 'opacity-60' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  tip.completed ? 'bg-emerald-400/20' : 'bg-white/15'
                }`}>
                  <Icon size={16} className={tip.completed ? 'text-emerald-300' : 'text-white'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-body-sm font-medium leading-snug ${
                    tip.completed ? 'text-white/60 line-through' : 'text-white'
                  }`}>
                    {tip.text}
                  </p>
                  {!tip.completed && (
                    <span className="inline-flex items-center gap-1 text-caption font-semibold text-white/75 mt-2 group-hover:text-white transition-colors">
                      {tip.action}
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button 
        onClick={() => navigate('/dashboard/skill-gap')}
        className="w-full mt-6 bg-white hover:bg-white/95 text-indigo-600 font-bold py-3.5 rounded-2xl transition-colors relative z-10 shadow-sm text-body-sm"
      >
        Lihat Learning Roadmap
      </button>
    </div>
  );
};

export default QuickTipsCard;
