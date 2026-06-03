import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const JobMarketFilters = ({ 
  domains, 
  selectedDomain, 
  setSelectedDomain, 
  nMonths, 
  setNMonths 
}) => {
  const { t } = useLanguage();
  const MONTHS_OPTIONS = [
    { value: 3, label: t.jobsMarket?.threeMonths || '3 Months' },
    { value: 6, label: t.jobsMarket?.sixMonths || '6 Months' },
    { value: 12, label: t.jobsMarket?.twelveMonths || '12 Months' }
  ];

  return (
    <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Domain Selection */}
      <div className="flex-1 space-y-2">
        <label htmlFor="domain-select" className="text-body-sm font-bold text-primary-text flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" />
          <span>{t.jobsMarket?.domainLabel || 'IT Job Domain:'}</span>
        </label>
        <div className="relative">
          <select
            id="domain-select"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-canvas-white border border-border rounded-xl font-medium text-body-sm text-primary-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer appearance-none"
          >
            <option value="all">{t.jobsMarket?.allDomainsCompare || 'All Domains (Demand Comparison)'}</option>
            {domains.map((dom) => (
              <option key={dom} value={dom}>
                {dom}
              </option>
            ))}
          </select>
          {/* Custom chevron indicator */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-secondary-text">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="space-y-2 shrink-0">
        <label className="text-body-sm font-bold text-primary-text flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{t.jobsMarket?.timeRangeLabel || 'Prediction Time Range:'}</span>
        </label>
        <div className="flex p-1 bg-canvas-white border border-border rounded-xl">
          {MONTHS_OPTIONS.map((opt) => {
            const isActive = nMonths === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setNMonths(opt.value)}
                className={`px-5 py-2.5 rounded-lg text-body-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-white text-primary shadow-sm border border-border/50' 
                    : 'text-secondary-text hover:text-primary-text'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobMarketFilters;
