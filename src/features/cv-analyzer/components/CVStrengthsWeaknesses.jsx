import React from 'react';
import { CheckCircle2, AlertOctagon } from 'lucide-react';

const CVStrengthsWeaknesses = ({ strengths = [], weaknesses = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-8">
      {/* Strengths Card */}
      <div className="bg-white rounded-[32px] border border-border p-6 md:p-8 shadow-sm flex flex-col">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-primary-text leading-none mb-1">Kekuatan Utama CV</h4>
            <p className="text-xs font-semibold text-secondary-text">Poin positif yang paling disukai rekruter</p>
          </div>
        </div>

        <ul className="space-y-4 flex-1">
          {strengths.map((str, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold text-secondary-text leading-relaxed">
                {str}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses Card */}
      <div className="bg-white rounded-[32px] border border-border p-6 md:p-8 shadow-sm flex flex-col">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-primary-text leading-none mb-1">Celah Kekurangan</h4>
            <p className="text-xs font-semibold text-secondary-text">Area krusial yang dapat menghambat verifikasi</p>
          </div>
        </div>

        <ul className="space-y-4 flex-1">
          {weaknesses.map((weak, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5 border border-rose-100">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              </span>
              <span className="text-sm font-semibold text-secondary-text leading-relaxed">
                {weak}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CVStrengthsWeaknesses;
