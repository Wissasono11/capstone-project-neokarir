import { useState, useCallback } from 'react';
import { steps } from '../data/cvAnalyzerConstants';
import { cvAnalyzerService } from '../api/cvAnalyzerService';
import { useToast } from '../../../contexts/ToastContext';

export const useCVAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); 
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const { success: toastSuccess, error: toastError } = useToast();

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

    try {
      const response = await cvAnalyzerService.uploadAndAnalyze(selectedFile, (progress, statusMessage) => {
        // Map progress to steps
        if (progress <= 20) {
          setStatus('uploading');
          setCurrentStep(0);
        } else if (progress <= 40) {
          setStatus('processing');
          setCurrentStep(1);
        } else if (progress <= 60) {
          setStatus('processing');
          setCurrentStep(2);
        } else if (progress <= 80) {
          setStatus('processing');
          setCurrentStep(3);
        } else {
          setStatus('processing');
          setCurrentStep(4);
        }
      });

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
    resetAnalysis
  };
};
