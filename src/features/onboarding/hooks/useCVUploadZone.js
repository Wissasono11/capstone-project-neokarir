import { useState, useRef } from 'react';

export const useCVUploadZone = (cvFile, setCvFile) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const simulateUpload = (file) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCvFile(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.includes('word')) {
        simulateUpload(file);
      } else {
        alert('Please upload a PDF or DOCX file.');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    setUploadProgress(0);
  };

  return {
    fileInputRef,
    isDragging,
    uploadProgress,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeFile
  };
};
