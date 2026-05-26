import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import JobMarketHeader from '../features/jobs-market/components/JobMarketHeader';
import JobMarketOverview from '../features/jobs-market/components/JobMarketOverview';
import JobMarketFilters from '../features/jobs-market/components/JobMarketFilters';
import JobMarketChart from '../features/jobs-market/components/JobMarketChart';
import JobMarketInsights from '../features/jobs-market/components/JobMarketInsights';
import { useJobMarketForecast } from '../features/jobs-market/hooks/useJobMarketForecast';

const JobsMarketPage = () => {
  const {
    domains,
    selectedDomain,
    setSelectedDomain,
    nMonths,
    setNMonths,
    predictions,
    topDomain,
    generatedAt,
    loading,
    isSimulated,
    refreshData
  } = useJobMarketForecast();

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12 animate-fade-in">
        {/* Header Section */}
        <JobMarketHeader 
          isSimulated={isSimulated} 
          loading={loading} 
          onRefresh={refreshData} 
        />

        {/* Overview Stats Cards */}
        <JobMarketOverview 
          predictions={predictions} 
          selectedDomain={selectedDomain} 
          topDomain={topDomain} 
          generatedAt={generatedAt} 
          isSimulated={isSimulated} 
        />

        {/* Filters Toolbar */}
        <JobMarketFilters 
          domains={domains}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          nMonths={nMonths}
          setNMonths={setNMonths}
        />

        {/* Main Chart Section */}
        <JobMarketChart 
          predictions={predictions}
          selectedDomain={selectedDomain}
          loading={loading}
        />

        {/* AI Qualitative Insights Section */}
        {!loading && (
          <JobMarketInsights 
            selectedDomain={selectedDomain} 
            predictions={predictions}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobsMarketPage;
