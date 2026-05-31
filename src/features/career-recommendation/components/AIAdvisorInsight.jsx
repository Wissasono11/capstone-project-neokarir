import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';

const AIAdvisorInsight = ({ user }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100/60 text-slate-700 relative overflow-hidden"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-indigo-100/50 text-indigo-600 rounded-xl shrink-0">
          <BrainCircuit className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h4 className="text-body-sm font-bold text-indigo-900 mb-1">
            {t.career.advisorInsightTitle}
          </h4>
          <p className="text-caption text-slate-600 font-medium leading-relaxed">
            {t.career.advisorInsight(
              user?.education || 'S1/D4', 
              user?.experience || 'Fresh Graduate', 
              user?.domain || 'Software Development'
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAdvisorInsight;
