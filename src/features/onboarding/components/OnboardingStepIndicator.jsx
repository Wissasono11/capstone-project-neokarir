import React from 'react';
import { motion } from 'framer-motion';

const OnboardingStepIndicator = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Goal' },
    { num: 2, label: 'Input Data' },
    { num: 3, label: 'Summary' },
  ];

  return (
    <div className="w-full flex items-center justify-center mb-12">
      <div className="flex items-center w-full max-w-md relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-border -translate-y-1/2 z-0" />
        
        {/* Progress Line */}
        <motion.div 
          className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Steps */}
        <div className="w-full flex justify-between relative z-10">
          {steps.map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;
            
            return (
              <div key={step.num} className="flex flex-col items-center gap-3">
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300
                    ${isActive || isCompleted ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white border-2 border-border text-secondary-text'}
                  `}
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.num
                  )}
                </motion.div>
                <span className={`text-xs font-medium ${isActive || isCompleted ? 'text-primary' : 'text-secondary-text'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStepIndicator;
