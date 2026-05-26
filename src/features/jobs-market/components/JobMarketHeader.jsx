import React from 'react';
import { TrendingUp, RefreshCw, Radio, ShieldCheck } from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const JobMarketHeader = ({ isSimulated, loading, onRefresh }) => {
  const breadcrumbItems = [
    { label: 'Jobs Market', path: '/dashboard/jobs-market', icon: TrendingUp }
  ];

  return (
    <div className="space-y-4">
      {/* Navigation Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Header Content */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-title md:text-heading font-bold text-primary-text mb-1 tracking-tight flex items-center gap-2">
            IT Job Market Trend Forecasting
          </h1>
          <p className="text-body-sm font-medium text-secondary-text max-w-xl">
            Pantau dan analisis prediksi kebutuhan lowongan kerja IT di masa mendatang berdasarkan pemodelan kecerdasan buatan (AI).
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Connection Status Badge */}
          {isSimulated ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-caption font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Mode Simulasi (API Offline)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-caption font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live API Terkoneksi</span>
            </div>
          )}

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`px-4 py-2 border border-border text-primary-text hover:bg-canvas-white rounded-lg font-medium text-body-sm transition-all duration-200 flex items-center gap-2 active:scale-95 disabled:opacity-50`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Segarkan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobMarketHeader;
