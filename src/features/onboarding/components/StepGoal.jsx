import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRightLeft, TrendingUp, CheckCircle2 } from 'lucide-react';
import { onboardingStepVariants, onboardingCardVariants } from '../../../animations/variants';
import Button from '../../../components/ui/Button';

const StepGoal = ({ careerGoal, setCareerGoal, nextStep }) => {
  const goals = [
    {
      id: 'first-job',
      title: 'Finding First Job',
      description: 'Fresh graduates or students preparing for a solid career start.',
      icon: GraduationCap,
      color: 'bg-purple-100 text-primary'
    },
    {
      id: 'career-switch',
      title: 'Career Switch',
      description: 'Professionals planning a transition to a new field or industry.',
      icon: ArrowRightLeft,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'upskill',
      title: 'Upskilling',
      description: 'Focus on promotion, salary increase, or deepening skills in your current role.',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600'
    }
  ];

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
        <h1 className="text-[32px] md:text-[40px] font-bold text-primary-text tracking-tight mb-4">
          What is your main focus right now?
        </h1>
        <p className="text-secondary-text text-lg max-w-2xl mx-auto">
          Help us tailor your AI Co-pilot to provide recommendations most relevant to your career journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        {goals.map((goal) => {
          const isSelected = careerGoal === goal.id;
          const Icon = goal.icon;
          
          return (
            <motion.div
              key={goal.id}
              variants={onboardingCardVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setCareerGoal(goal.id)}
              className={`
                relative cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 flex flex-col h-full bg-white
                ${isSelected 
                  ? 'border-primary! shadow-lg shadow-primary/10 ring-1 ring-primary' 
                  : 'border-border hover:border-border/80'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-primary">
                  <CheckCircle2 size={24} className="fill-primary/10" />
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${goal.color}`}>
                <Icon size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-primary-text mb-3">
                {goal.title}
              </h3>
              
              <p className="text-secondary-text leading-relaxed grow">
                {goal.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <Button 
        onClick={nextStep} 
        disabled={!careerGoal}
        className="w-full md:w-auto min-w-[200px] py-3.5 text-[15px]"
      >
        Continue &rarr;
      </Button>
    </motion.div>
  );
};

export default StepGoal;
