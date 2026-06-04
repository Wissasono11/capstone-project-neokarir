import { useState, useEffect, useCallback } from 'react';
import { steps } from '../data/cvAnalyzerConstants';
import { cvAnalyzerService } from '../api/cvAnalyzerService';
import { useToast } from '../../../contexts/ToastContext';

export const useCVAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); 
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { success: toastSuccess, error: toastError } = useToast();

  useEffect(() => {
    const fetchLatestAnalysis = async () => {
      try {
        const response = await cvAnalyzerService.getLatestAnalysis();
        if (response?.cv?.cv_data) {
          const cvData = response.cv.cv_data;
          if (cvData.atsScore !== undefined || cvData.summary || cvData.strengths?.length > 0) {
            setResults(cvData);
            setStatus('done');
            if (response.cv.file_name) {
              setFile({ name: response.cv.file_name });
            }
          }
        }
      } catch (err) {
        console.warn("Failed to fetch latest CV analysis", err);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchLatestAnalysis();
  }, []);

  const uploadCV = useCallback(async (selectedFile) => {
    if (!selectedFile) return;

    // File validation
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.pdf') && !selectedFile.name.endsWith('.doc') && !selectedFile.name.endsWith('.docx')) {
      setError('Format berkas tidak didukung. Harap unggah berkas PDF, DOC, atau DOCX.');
      setStatus('error');
      return;
    }

    if (selectedFile.size > maxSize) {
      setError('Ukuran berkas terlalu besar. Maksimal ukuran berkas adalah 5MB.');
      setStatus('error');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setStatus('uploading');
    setCurrentStep(0);

    let reachedStep = 0;

    try {
      const response = await cvAnalyzerService.uploadAndSmartAnalyze(selectedFile, (progress, statusMessage) => {
        // Map progress to steps
        let step = 0;
        if (progress <= 20) {
          setStatus('uploading');
          step = 0;
        } else if (progress <= 40) {
          setStatus('processing');
          step = 1;
        } else if (progress <= 60) {
          setStatus('processing');
          step = 2;
        } else if (progress <= 80) {
          setStatus('processing');
          step = 3;
        } else {
          setStatus('processing');
          step = 4;
        }
        reachedStep = Math.max(reachedStep, step);
        setCurrentStep(reachedStep);
      });

      // Slowly transition remaining steps to target step (4) to ensure a smooth, completed experience
      const targetStep = 4;
      while (reachedStep < targetStep) {
        reachedStep += 1;
        setCurrentStep(reachedStep);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Brief delay to let the user see the final step completed checkmark
      await new Promise(resolve => setTimeout(resolve, 600));

      setResults(response.results);
      setStatus('done');
      toastSuccess('CV Anda berhasil dianalisis!');
    } catch (err) {
      const errMsg = err.message || 'Terjadi kesalahan saat menganalisis CV. Silakan coba kembali.';
      setError(errMsg);
      setStatus('error');
      toastError(errMsg);
    }
  }, [toastSuccess, toastError]);

  const resetAnalysis = useCallback(() => {
    setFile(null);
    setStatus('idle');
    setCurrentStep(0);
    setError(null);
    setResults(null);
  }, []);

  return {
    file,
    status,
    currentStep,
    steps,
    error,
    results,
    uploadCV,
    resetAnalysis,
    isInitialLoading
  };
};
