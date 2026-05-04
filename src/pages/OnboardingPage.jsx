import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useOnboardingForm } from '../features/onboarding/hooks/useOnboardingForm';
import OnboardingLayout from '../layouts/OnboardingLayout';
import OnboardingStepIndicator from '../features/onboarding/components/OnboardingStepIndicator';
import StepGoal from '../features/onboarding/components/StepGoal';
import StepDataCV from '../features/onboarding/components/StepDataCV';
import StepSummary from '../features/onboarding/components/StepSummary';

const OnboardingPage = () => {
  const onboardingState = useOnboardingForm();
  const { currentStep } = onboardingState;

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={3}>
      <OnboardingStepIndicator currentStep={currentStep} />
      
      <div className="w-full relative">
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
