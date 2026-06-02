import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'text-primary', 
  fullPage = false, 
  label = 'Memuat...' 
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinnerElement = (
    <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in">
      <div className="relative flex items-center justify-center">
        {/* Glow effect in background */}
        <div className={`absolute rounded-full bg-primary/10 blur-xl ${sizeClasses[size]}`} />
        
        {/* Animated Spin Loader */}
        <Loader2 className={`animate-spin ${color} ${sizeClasses[size]} relative z-10`} />
      </div>
      
      {label && (
        <span className="text-body-sm font-medium text-secondary-text animate-pulse">
          {label}
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md transition-opacity duration-300">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

export default LoadingSpinner;
