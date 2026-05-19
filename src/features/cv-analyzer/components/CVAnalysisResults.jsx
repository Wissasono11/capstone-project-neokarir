import React from 'react';
import { RefreshCcw, Download } from 'lucide-react';
import CVScoreOverview from './CVScoreOverview';
import CVExtractedEntities from './CVExtractedEntities';
import CVStrengthsWeaknesses from './CVStrengthsWeaknesses';
import CVImprovementTips from './CVImprovementTips';
import Button from '../../../components/ui/Button';

const CVAnalysisResults = ({ results, onReset }) => {
  if (!results) return null;

  const handleDownload = () => {
    // Print window to simulate report download
    window.print();
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-text mb-1">
            Hasil Analisis CV
          </h2>
          <p className="text-xs md:text-sm font-semibold text-secondary-text">
            Berikut adalah detail lengkap hasil analisis berkas CV Anda.
          </p>
        </div>
      </div>

      {/* Score Overview */}
      <CVScoreOverview 
        score={results.atsScore} 
        rating={results.overallRating} 
        summary={results.summary} 
      />

      {/* Extracted Entities (NER focus matching questionnaire criteria) */}
      <CVExtractedEntities entities={results.entities} />

      {/* Strengths & Weaknesses comparison side-by-side */}
      <CVStrengthsWeaknesses 
        strengths={results.strengths} 
        weaknesses={results.weaknesses} 
      />

      {/* Actionable improvement suggestions */}
      <CVImprovementTips tips={results.improvementTips} />

      {/* Footer controls */}
      <div className="flex items-center justify-center gap-4 pt-6 pb-12 border-t border-border/60">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="px-6 py-3 rounded-2xl flex items-center gap-2.5 text-sm font-bold border-border hover:border-primary/40"
        >
          <RefreshCcw className="w-4 h-4 text-secondary-text" />
          Unggah CV Baru
        </Button>
        
        <Button 
          variant="primary" 
          onClick={handleDownload}
          className="px-6 py-3 rounded-2xl flex items-center gap-2.5 text-sm font-bold bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white"
        >
          <Download className="w-4 h-4" />
          Cetak Hasil Laporan
        </Button>
      </div>
    </div>
  );
};

export default CVAnalysisResults;
