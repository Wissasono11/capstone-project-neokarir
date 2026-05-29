import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Breadcrumb from '../components/ui/Breadcrumb';
import CVAnalyzerSkeleton from '../features/cv-analyzer/components/CVAnalyzerSkeleton';
import CVUploadZone from '../features/cv-analyzer/components/CVUploadZone';
import CVFeatureCards from '../features/cv-analyzer/components/CVFeatureCards';
import CVProcessing from '../features/cv-analyzer/components/CVProcessing';
import CVAnalysisResults from '../features/cv-analyzer/components/CVAnalysisResults';
import { useCVAnalyzer } from '../features/cv-analyzer/hooks/useCVAnalyzer';

const CVAnalyzerPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const { 
    file, 
    status, 
    currentStep, 
    steps, 
    error, 
    results, 
    uploadCV, 
    resetAnalysis 
  } = useCVAnalyzer();

  const breadcrumbItems = [
    { label: 'CV Analyzer', path: '/dashboard/cv-analyzer', icon: FileText }
  ];

  if (status === 'done') {
    breadcrumbItems.push({ label: 'Hasil Analisis' });
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <CVAnalyzerSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main Header */}
      {status !== 'done' && (
        <div className="flex items-center gap-3.5 mb-8">  
          <div>
            <h1 className="text-2xl md:text-heading font-bold text-primary-text mb-1 tracking-tight">
              CV Analyzer
            </h1>
            <p className="text-body-sm font-medium text-secondary-text">
              Unggah berkas CV Anda untuk dianalisis oleh teknologi cerdas kecerdasan buatan
            </p>
          </div>
        </div>
      )}

      {/* State Renderer */}
      <div className="w-full">
        {status === 'idle' || status === 'error' ? (
          <div className="space-y-10 animate-fadeIn">
            {/* Upload Zone */}
            <CVUploadZone onFileSelected={uploadCV} error={error} />
            
            {/* Splitter Line */}
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/60"></span></div>
              <span className="relative bg-[#F8FAFC] px-4 text-xs font-bold text-secondary-text/80 uppercase tracking-widest">
                Fitur Analisis Utama
              </span>
            </div>

            {/* Showcase Feature cards */}
            <CVFeatureCards />
          </div>
        ) : status === 'uploading' || status === 'processing' ? (
          <div className="animate-fadeIn">
            <CVProcessing 
              currentStep={currentStep} 
              steps={steps} 
              fileName={file?.name || 'Dokumen CV'} 
            />
          </div>
        ) : status === 'done' ? (
          <CVAnalysisResults 
            results={results} 
            onReset={resetAnalysis} 
          />
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default CVAnalyzerPage;
