import React from 'react';
import { TrendingUp, RefreshCw, Radio, ShieldCheck } from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import { useLanguage } from '../../../contexts/LanguageContext';

const JobMarketHeader = ({ isSimulated, loading, onRefresh }) => {
  const { t } = useLanguage();
  const breadcrumbItems = [
    { label: t.sidebar.jobsMarket, path: '/dashboard/jobs-market', icon: "mingcute:presentation-1-line" }
  ];

  return (
    <div className="space-y-4">
      {/* Navigation Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Header Content */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-title md:text-heading font-bold text-primary-text mb-1 tracking-tight flex items-center gap-2">
            {t.jobsMarket.title}
          </h1>
          <p className="text-body-sm font-medium text-secondary-text max-w-xl">
            {t.jobsMarket.desc}
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Connection Status Badge */}
          {isSimulated ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-caption font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{t.jobsMarket.simulatedMode}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-caption font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.jobsMarket.liveConnected}</span>
            </div>
          )}

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`px-4 py-2 border border-border text-primary-text hover:bg-canvas-white rounded-lg font-medium text-body-sm transition-all duration-200 flex items-center gap-2 active:scale-95 disabled:opacity-50`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{t.jobsMarket.refresh}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobMarketHeader;
