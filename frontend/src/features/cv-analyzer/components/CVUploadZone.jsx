import React from 'react';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';
import { useCVUpload } from '../hooks/useCVUpload';
import { useLanguage } from '../../../contexts/LanguageContext';

const CVUploadZone = ({ onFileSelected, error }) => {
  const { t } = useLanguage();
  const {
    isDragActive,
    fileInputRef,
    handleDrag,
    handleDrop,
    handleChange,
    onButtonClick,
  } = useCVUpload(onFileSelected);

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`w-full min-h-[320px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300 relative overflow-hidden
          ${isDragActive 
            ? 'border-primary bg-primary-light/40 scale-[0.99] shadow-inner' 
            : 'border-border hover:border-primary/60 hover:bg-canvas-white bg-white shadow-sm'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
        />

        {/* Outer Ring Circle */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300
          ${isDragActive ? 'bg-primary text-white' : 'bg-primary-light text-primary'}
        `}>
          <UploadCloud className="w-8 h-8" />
        </div>

        {/* Prompt */}
        <h3 className="text-lg md:text-xl font-bold text-primary-text mb-2">
          {t.cvAnalyzer.uploadTitle}
        </h3>
        <p className="text-sm md:text-body font-medium text-secondary-text mb-6">
          {t.cvAnalyzer.uploadSubtitlePrefix}<span className="text-primary hover:underline font-bold">{t.cvAnalyzer.uploadSubtitleLink}</span>
        </p>

        {/* Allowed Specs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-secondary-text bg-bg-secondary/40 px-4 py-2 rounded-full border border-border/40">
          <FileText className="w-3.5 h-3.5" />
          <span>{t.cvAnalyzer.uploadFormats}</span>
        </div>
      </div>

      {/* Error alert if any */}
      {error && (
        <div className="mt-4 flex items-start gap-3 p-4 rounded-2xl bg-error-light border border-error/20 text-error animate-fadeIn">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-semibold leading-relaxed">{error}</p>
        </div>
      )}
    </div>
  );
};

export default CVUploadZone;
