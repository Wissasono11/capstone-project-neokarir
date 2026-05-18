import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingForm } from '../features/onboarding/hooks/useOnboardingForm';
import OnboardingLayout from '../layouts/OnboardingLayout';
import OnboardingStepIndicator from '../features/onboarding/components/OnboardingStepIndicator';
import StepGoal from '../features/onboarding/components/StepGoal';
import StepDataCV from '../features/onboarding/components/StepDataCV';
import StepSummary from '../features/onboarding/components/StepSummary';

const OnboardingPage = () => {
  const onboardingState = useOnboardingForm();
  const { currentStep, isAnalyzing } = onboardingState;

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={3}>
      <OnboardingStepIndicator currentStep={currentStep} />
      
      <div className="w-full relative min-h-[400px]">
        {/* Loading Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded-3xl"
            >
              <div className="relative mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 size={64} className="text-primary opacity-20" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={32} className="text-primary animate-pulse" />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-primary-text mb-2">Analyzing your CV...</h3>
                <p className="text-secondary-text">Our Smart AI is reading your profile to give the best recommendations.</p>
              </motion.div>
              
              {/* Progress bar simulation */}
              <div className="w-64 h-1.5 bg-bg-secondary rounded-full mt-8 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="h-full bg-primary"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait" custom={1}>
          {currentStep === 1 && (
            <StepGoal key="step-1" {...onboardingState} />
          )}
          {currentStep === 2 && (
            <StepDataCV key="step-2" {...onboardingState} />
          )}
          {currentStep === 3 && (
            <StepSummary key="step-3" {...onboardingState} />
          )}
        </AnimatePresence>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingPage;
