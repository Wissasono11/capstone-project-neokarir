import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DetailedProgressCard = ({ progressData }) => {
  const navigate = useNavigate();

  const defaultProgress = {
    overallReadiness: 68,
    categories: [
      { label: 'Profil Lengkap', value: 90, color: 'bg-emerald-500' },
      { label: 'Skill Match', value: 75, color: 'bg-primary' },
      { label: 'Roadmap Progress', value: 40, color: 'bg-amber-500' },
    ]
  };

  const data = progressData || defaultProgress;

  // Find the Roadmap Progress item specifically, or fall back to overall readiness
  const roadmap = data.categories?.find(cat => cat.label === 'Roadmap Progress') || {
    label: 'Roadmap Progress',
    value: data.overallReadiness || 0,
    color: 'bg-amber-500'
  };

  return (
    <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
            <BookOpen size={24} className="text-amber-500" />
          </div>
          <h3 className="font-bold text-primary-text text-subtitle">Roadmap Belajar</h3>
        </div>

        {/* Overall Score */}
        <div className="flex items-end gap-2 mb-5">
          <motion.span 
            className="text-heading-xl font-extrabold text-primary-text leading-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {roadmap.value}%
          </motion.span>
          <span className="text-caption font-semibold text-secondary-text pb-1">Progres Pembelajaran</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-caption font-semibold text-secondary-text">Detail Progres</span>
            <span className="text-caption font-bold text-primary-text">{roadmap.value}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-3 overflow-hidden">
            <motion.div 
              className={`h-3 rounded-full ${roadmap.color || 'bg-amber-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${roadmap.value}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => navigate('/dashboard/skill-gap')}
        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold text-caption md:text-body-sm rounded-xl transition-all group mt-4"
      >
        <span>Lihat Detail Roadmap</span>
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

export default DetailedProgressCard;
