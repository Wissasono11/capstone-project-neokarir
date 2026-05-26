import { useState, useEffect, useCallback } from 'react';
import { MOCK_DOMAINS, generateMockPredictions } from '../utils/mockDataGenerator';

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

  const API_BASE_URL = 'http://localhost:8000';

  // 1. Load domain options
  const fetchDomains = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/trend/domains`);
      if (!response.ok) throw new Error('API server error when fetching domains');
      const data = await response.json();
      if (data.status === 'success' && data.domains) {
        setDomains(data.domains);
        return true;
      }
      return false;
    } catch (err) {
      console.warn("Backend API offline / CORS issue. Switching domains to simulated mode.", err);
      setDomains(MOCK_DOMAINS);
      setIsSimulated(true);
      return false;
    }
  }, []);

  // 2. Load forecast predictions
  const fetchForecast = useCallback(async (currentDomain, currentMonths) => {
    setLoading(true);
    setError(null);
    const domainParam = currentDomain === 'all' ? null : currentDomain;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/trend/forecast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          n_months: currentMonths,
          domain: domainParam
        })
      });

      if (!response.ok) throw new Error('API server error when fetching predictions');
      const data = await response.json();

      if (data.status === 'success') {
        setPredictions(data.predictions);
        setTopDomain(data.top_domain || 'Data Science & AI');
        setGeneratedAt(data.generated_at || new Date().toISOString());
        setIsSimulated(false);
      } else {
        throw new Error('API returned unsuccessful status');
      }
    } catch (err) {
      console.warn(`Backend API offline or CORS error. Loading simulated forecast for domain=${currentDomain}, months=${currentMonths}.`, err);
      
      // Artificial short loading delay to simulate AI inference speed
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockPred = generateMockPredictions(currentMonths, domainParam);
      setPredictions(mockPred);
      
      // Calculate top domain from mock
      if (domainParam) {
        setTopDomain(domainParam);
      } else {
        // Find the domain with highest value in first month
        const firstMonth = mockPred[0] || {};
        let highestVal = 0;
        let highestDom = 'Data Science & AI';
        Object.keys(firstMonth).forEach(dom => {
          if (firstMonth[dom] > highestVal) {
            highestVal = firstMonth[dom];
            highestDom = dom;
          }
        });
        setTopDomain(highestDom);
      }
      
      setGeneratedAt(new Date().toISOString());
      setIsSimulated(true);
    } finally {
      setLoading(false);
    }
  }, []);

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
