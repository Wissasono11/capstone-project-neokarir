import React from 'react';
import MissingSkillCard from './MissingSkillCard';
import { Lightbulb } from 'lucide-react';

const MissingSkillsGrid = ({ skillsData }) => {
  if (!skillsData || skillsData.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-subtitle font-bold text-slate-800">Detail Skill yang Perlu Dipelajari</h3>
          <p className="text-slate-500 text-caption mt-0.5">Analisis mendalam mengenai kemampuan yang paling dibutuhkan untuk target role kamu</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((skill, index) => (
          <MissingSkillCard key={index} skillData={skill} />
        ))}
      </div>
    </div>
  );
};

export default MissingSkillsGrid;
