import React from 'react';
import { Award, Star } from 'lucide-react';
import { getColorScheme } from '../data/cvAnalyzerConstants';

const CVScoreOverview = ({ score, summary }) => {
  const scheme = getColorScheme(score);

  // SVG parameters
  const radius = 60;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mb-8">
      {/* Circle Score Gauge Card */}
      <div className="md:col-span-4 bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col items-center justify-center text-center">
        <h4 className="text-sm font-bold text-secondary-text mb-4 uppercase tracking-wider">ATS SCORE</h4>
        
        <div className="relative flex items-center justify-center mb-4">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-95"
          >
            {/* Background Circle */}
            <circle
              stroke="#E2E8F0"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Foreground Score Circle */}
            <circle
              stroke={scheme.stroke}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Central Score Text */}
          <div className="absolute flex items-baseline justify-center">
            <span className="text-4xl font-extrabold text-primary-text leading-none">{score}</span>
            <span className="text-xl font-bold text-secondary-text ml-0.5">%</span>
          </div>
        </div>

        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${scheme.bg} ${scheme.text} border ${scheme.border}`}>
          {scheme.label}
        </span>
      </div>

      {/* Ratings & Overview Description */}
      <div className="md:col-span-8 bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col justify-between">
        <div>
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h4 className="text-base font-bold text-primary-text flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Hasil Analisis Kecocokan CV
            </h4>

            {/* Stars Review */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-4.5 h-4.5 ${star <= (score / 20) ? 'text-amber-400 fill-amber-400' : 'text-border fill-border'}`} 
                />
              ))}
            </div>
          </div>

          <p className="text-[15px] font-medium text-secondary-text leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Dynamic highlights footer */}
        <div className="border-t border-border/60 pt-4 mt-4 flex flex-wrap gap-4 text-xs font-semibold text-secondary-text">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span>NER Extraction OK</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0"></span>
            <span>ATS Friendly Format</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
            <span>Optimasi Keyword Dianjurkan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVScoreOverview;
