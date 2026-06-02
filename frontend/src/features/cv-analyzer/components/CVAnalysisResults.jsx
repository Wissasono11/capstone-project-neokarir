import React from 'react';
import { RefreshCcw, Download } from 'lucide-react';
import CVScoreOverview from './CVScoreOverview';
import CVStrengthsWeaknesses from './CVStrengthsWeaknesses';
import CVImprovementTips from './CVImprovementTips';
import CVExtractedEntities from './CVExtractedEntities';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../contexts/LanguageContext';

const CVAnalysisResults = ({ results, onReset }) => {
  const { t } = useLanguage();

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
            {t.cvAnalyzer.resultsTitle}
          </h2>
          <p className="text-xs md:text-sm font-medium text-secondary-text">
            {t.cvAnalyzer.resultsSubtitle}
          </p>
        </div>
      </div>

      {/* Score Overview */}
      <CVScoreOverview 
        score={results.atsScore} 
        rating={results.overallRating} 
        summary={results.summary} 
      />

      {/* Strengths & Weaknesses comparison side-by-side */}
      <CVStrengthsWeaknesses 
        strengths={results.strengths} 
        weaknesses={results.weaknesses} 
      />

      {/* Actionable improvement suggestions */}
      <CVImprovementTips tips={results.improvementTips} />

      {/* Extracted NER Entities */}
      <CVExtractedEntities entities={results.entities} />

      {/* Footer controls */}
      <div className="flex items-center justify-center gap-4 pt-6 pb-12 border-t border-border/60">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="px-6 py-3 rounded-2xl flex items-center gap-2.5 text-sm font-bold border-border hover:border-primary/40"
        >
          <RefreshCcw className="w-4 h-4 text-secondary-text" />
          {t.cvAnalyzer.uploadNew}
        </Button>
        
        <Button 
          variant="primary" 
          onClick={handleDownload}
          className="px-6 py-3 rounded-2xl flex items-center gap-2.5 text-sm font-bold bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white"
        >
          <Download className="w-4 h-4" />
          {t.cvAnalyzer.printReport}
        </Button>
      </div>
    </div>
  );
};

export default CVAnalysisResults;
