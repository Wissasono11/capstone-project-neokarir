import React from 'react';
import { BookOpen, Clock, AlertCircle, Sparkles, Check } from 'lucide-react';

const MissingSkillCard = ({ skillData }) => {
  if (!skillData) return null;

  const {
    skill,
    gap,
    category,
    priority,
    description,
    alasan,
    relatedSkills,
    waktuBelajar,
    isCompleted
  } = skillData;

  const isHighPriority = priority === "Tinggi";

  return (
    <div className={`rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group ${
      isCompleted 
        ? 'bg-emerald-50/10 border-emerald-100' 
        : 'bg-white border-slate-100'
    }`}>
      <div>
        
        {/* Header Area */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg group-hover:scale-105 transition-transform ${
              isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
            }`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className={`text-body font-bold transition-colors ${
                isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'
              }`}>{skill}</h4>
              {category && (
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                  Kategori: {category}
                </span>
              )}
            </div>
          </div>
          
          {isCompleted ? (
            <span className="px-2 py-0.5 rounded text-caption font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 stroke-[3px]" /> Terpenuhi
            </span>
          ) : (
            <span className={`px-2 py-0.5 rounded text-caption font-bold ${
              isHighPriority 
                ? 'bg-rose-50 text-rose-700 border border-rose-100' 
                : 'bg-amber-50 text-amber-700 border border-amber-100'
            }`}>
              {priority}
            </span>
          )}
        </div>

        {/* Gap & Est Time */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-caption font-semibold text-slate-500">
            <span>Gap Kekurangan</span>
            <span className={`font-extrabold transition-colors duration-300 ${isCompleted ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isCompleted ? '0%' : `${gap}%`}
            </span>
          </div>
          <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`absolute left-0 top-0 h-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-rose-500'}`} 
              style={{ width: isCompleted ? '0%' : `${gap}%` }} 
            />
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-3.5 mb-6">
          <p className={`text-caption leading-relaxed ${isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>
            {description}
          </p>

          <div className={`flex items-start gap-2 text-caption p-2.5 rounded-xl border ${
            isCompleted 
              ? 'bg-emerald-50/5 border-emerald-50/30' 
              : 'bg-slate-50/50 border-slate-100/50'
          }`}>
            <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isCompleted ? 'text-emerald-500' : 'text-amber-500'}`} />
            <div>
              <span className={`font-extrabold block mb-0.5 ${isCompleted ? 'text-slate-500' : 'text-slate-700'}`}>Mengapa Penting?</span>
              <span className={isCompleted ? 'text-slate-400' : 'text-slate-500'}>{alasan}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Area */}
      <div className="border-t border-slate-50 pt-4 mt-auto">
        <div className="flex items-center justify-between text-caption text-slate-400 font-semibold mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Est. Belajar: <strong>{waktuBelajar}</strong></span>
          </div>
        </div>
        
        {relatedSkills && relatedSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-caption text-slate-400 font-bold mr-1">Terkait:</span>
            {relatedSkills.map((rel, idx) => (
              <span key={idx} className={`px-2 py-0.5 rounded-md text-caption font-semibold ${
                isCompleted 
                  ? 'bg-slate-50 text-slate-400' 
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {rel}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default MissingSkillCard;
