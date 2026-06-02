import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle, index }) => {
  return (
    <div className="border border-border rounded-2xl bg-white overflow-hidden transition-all duration-200 shadow-sm hover:border-primary/30">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-primary-text text-body-sm md:text-body hover:text-primary transition-colors cursor-pointer"
        >
          <span>{question}</span>
          <ChevronDown
            size={18}
            className={`text-secondary-text transition-transform duration-300 shrink-0 ${
              isOpen ? 'rotate-180 text-primary' : ''
            }`}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/50 text-body-sm text-secondary-text leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;
