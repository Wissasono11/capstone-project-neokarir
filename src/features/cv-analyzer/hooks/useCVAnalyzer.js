import { useState, useCallback } from 'react';
import { mockResults, steps } from '../data/cvAnalyzerConstants';

export const useCVAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); 
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

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

    // Simulate multi-stage processing
    try {
      // 1. Uploading
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('processing');
      
      // 2. Extracting text
      setCurrentStep(1);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // 3. NER Analysis
      setCurrentStep(2);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 4. Entity Tagging
      setCurrentStep(3);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // 5. Compiling
      setCurrentStep(4);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setResults(mockResults);
      setStatus('done');
    } catch (err) {
      setError('Terjadi kesalahan saat menganalisis CV. Silakan coba kembali.');
      setStatus('error');
    }
  }, []);

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
