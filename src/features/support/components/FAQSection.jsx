import React from 'react';
import FAQItem from './FAQItem';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const FAQSection = ({ searchQuery, expandedFAQ, toggleFAQ, setSearchQuery }) => {
  const { t } = useLanguage();
  const faqData = t.support.faqData || [];

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4 mb-2">
        <div>
          <h2 className="text-body-lg md:text-subtitle font-bold text-primary-text">{t.support.faqTitle}</h2>
          <p className="text-body-sm text-secondary-text">{t.support.faqSubtitle}</p>
        </div>
        <span className="text-caption font-semibold px-2.5 py-1 bg-bg-secondary text-primary rounded-full shrink-0 self-start sm:self-center">
          {t.support.topicsFound(filteredFAQs.length)}
        </span>
      </div>

      {filteredFAQs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredFAQs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={expandedFAQ === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-border rounded-3xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-bg-secondary flex items-center justify-center text-primary mb-4">
            <HelpCircle size={28} />
          </div>
          <h3 className="font-bold text-primary-text text-body-lg mb-2">{t.support.searchNotFound}</h3>
          <p className="text-body-sm text-secondary-text max-w-sm mb-6">
            {t.support.searchNotFoundDesc(searchQuery)}
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-5 py-2.5 bg-primary hover:bg-indigo-700 active:scale-95 text-white font-semibold text-body-sm rounded-xl transition-all shadow-sm cursor-pointer"
          >
            {t.support.resetSearch}
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQSection;

