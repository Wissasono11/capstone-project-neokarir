import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

export const useAIProfiling = () => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('Reading data profile...');

  useEffect(() => {
    // Mock processing sequence
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress === 30) setProcessingStatus('Analyzing your skills & experience...');
      if (currentProgress === 60) setProcessingStatus('Mapping to industry standards...');
      if (currentProgress === 85) setProcessingStatus('Generating personalized recommendations...');
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsProcessing(false), 500);
      }
    }, 60); // Total ~3 seconds

    return () => clearInterval(interval);
  }, []);

  // Mock results based on user data
  const results = {
    overallScore: 81,
    topCareers: [
      {
        id: 1,
        title: 'Junior Frontend Developer',
        company: 'Gojek',
        location: 'Jakarta',
        salary: 'Rp 5-11 jt/bulan',
        matchScore: 92,
        icon: 'https://logo.clearbit.com/gojek.com'
      },
      {
        id: 2,
        title: 'IT Support',
        company: 'Kopi Kenangan',
        location: 'Bandung',
        salary: 'Rp 5-8 jt/bulan',
        matchScore: 87,
        icon: 'https://logo.clearbit.com/kopikenangan.com'
      },
      {
        id: 3,
        title: 'Junior Backend Developer',
        company: 'Shopee',
        location: 'Remote',
        salary: 'Rp 8-12 jt/bulan',
        matchScore: 91,
        icon: 'https://logo.clearbit.com/shopee.co.id'
      }
    ],
    skillGap: [
      { subject: 'Problem Solving', A: 90, fullMark: 100 },
      { subject: 'React', A: 85, fullMark: 100 },
      { subject: 'Golang', A: 65, fullMark: 100 },
      { subject: 'Communication', A: 80, fullMark: 100 },
      { subject: 'Laravel', A: 70, fullMark: 100 },
      { subject: 'Docker', A: 60, fullMark: 100 },
    ],
    learningPath: [
      {
        title: 'Docker for Beginners',
        platform: 'Coursera',
        duration: '2 Weeks',
        tag: 'High Priority'
      },
      {
        title: 'Advanced Golang Microservices',
        platform: 'Udemy',
        duration: '4 Weeks',
        tag: 'Medium Priority'
      }
    ]
  };

  return {
    isProcessing,
    progress,
    processingStatus,
    results,
    user
  };
};
