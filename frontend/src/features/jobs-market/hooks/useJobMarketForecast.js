import { useState, useEffect, useCallback } from 'react';
import { jobsMarketService } from '../api/jobsMarketService';
import { useToast } from '../../../contexts/ToastContext';

export const useJobMarketForecast = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [nMonths, setNMonths] = useState(3);
  const [predictions, setPredictions] = useState([]);
  const [topDomain, setTopDomain] = useState('');
  const [generatedAt, setGeneratedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [error, setError] = useState(null);
  const { error: toastError } = useToast();

  // 1. Load domain options
  const fetchDomains = useCallback(async () => {
    try {
      const data = await jobsMarketService.getDomains();
      if (data.status === 'success' && data.domains) {
        setDomains(data.domains);
        setIsSimulated(!!data.isFallback);
        return true;
      }
      return false;
    } catch (err) {
      setError('Gagal mengambil data domain pasar kerja.');
      toastError('Gagal mengambil data domain pasar kerja.');
      return false;
    }
  }, [toastError]);

  // 2. Load forecast predictions
  const fetchForecast = useCallback(async (currentDomain, currentMonths) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await jobsMarketService.getForecast(currentDomain, currentMonths);

      if (data.status === 'success') {
        setPredictions(data.predictions);
        setTopDomain(data.top_domain || 'Data Science & AI');
        setGeneratedAt(data.generated_at || new Date().toISOString());
        setIsSimulated(!!data.isSimulated);
      } else {
        throw new Error('API returned unsuccessful status');
      }
    } catch (err) {
      setError('Gagal memproses prediksi tren pasar kerja.');
      toastError('Gagal memproses prediksi tren pasar kerja.');
    } finally {
      setLoading(false);
    }
  }, [toastError]);

  // Initialize domains
  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  // Load forecast when selectedDomain or nMonths changes
  useEffect(() => {
    fetchForecast(selectedDomain, nMonths);
  }, [selectedDomain, nMonths, fetchForecast]);

  const refreshData = () => {
    fetchDomains();
    fetchForecast(selectedDomain, nMonths);
  };

  return {
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
    error,
    refreshData
  };
};
