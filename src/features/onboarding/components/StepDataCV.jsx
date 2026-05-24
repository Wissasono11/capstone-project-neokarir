import React from 'react';
import { motion } from 'framer-motion';
import { onboardingStepVariants } from '../../../utils/animations';
import Button from '../../../components/ui/Button';
import CVUploadZone from './CVUploadZone';
import ManualInputForm from './ManualInputForm';

const StepDataCV = ({ 
  inputMethod, 
  setInputMethod, 
  cvFile, 
  setCvFile, 
  manualData, 
  updateManualData, 
  nextStep, 
  prevStep 
}) => {
  
  // Basic validation check
  const isUploadValid = inputMethod === 'upload' && cvFile !== null;
  const isManualValid = inputMethod === 'manual' && 
    manualData.domain && 
    manualData.role && 
    manualData.techStack.length > 0 &&
    manualData.experience &&
    manualData.education;

  const isValid = isUploadValid || isManualValid;

  return (
    <motion.div
      variants={onboardingStepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={1}
      className="flex flex-col items-center w-full"
    >
      <div className="text-center mb-10">
        <h1 className="text-heading-lg md:text-heading-xl font-bold text-primary-text tracking-tight mb-4">
          Upload your CV for AI Analysis
        </h1>
        <p className="text-secondary-text text-lg max-w-2xl mx-auto">
          Let our AI read your experience to create an accurate profile.
        </p>
      </div>

      <div className="w-full mb-12">
        {inputMethod === 'upload' ? (
          <div className="flex flex-col items-center w-full">
            <CVUploadZone cvFile={cvFile} setCvFile={setCvFile} />
            
            <div className="flex items-center w-full max-w-2xl my-8">
              <div className="flex-1 h-px bg-border"></div>
              <span className="px-4 text-xs font-semibold text-secondary-text tracking-wider">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>
            
            <button 
              onClick={() => setInputMethod('manual')}
              className="text-primary font-medium underline hover:text-primary/80 transition-colors"
            >
              Or fill data manually
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <ManualInputForm 
              manualData={manualData} 
              updateManualData={updateManualData} 
            />
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => setInputMethod('upload')}
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                &larr; Back to Upload CV
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="w-full md:w-auto min-w-[140px] py-3.5"
        >
          Back
        </Button>
        <Button 
          variant="primary"
          onClick={nextStep} 
          disabled={!isValid}
          className="w-full md:w-auto min-w-[200px] py-3.5"
        >
          Continue &rarr;
        </Button>
      </div>
    </motion.div>
  );
};

export default StepDataCV;
