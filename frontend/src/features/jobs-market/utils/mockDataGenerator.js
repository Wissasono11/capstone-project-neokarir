export const MOCK_DOMAINS = [
  "Cyber Security",
  "Data Analytics",
  "Data Engineering",
  "Data Science & AI",
  "DevOps & Cloud",
  "Product Management",
  "Software Development",
  "UI/UX Design",
  "Web Development"
];

// Baseline values for dummy data
export const BASE_DEMAND = {
  "Cyber Security": 270.0,
  "Data Analytics": 360.0,
  "Data Engineering": 900.0,
  "Data Science & AI": 2500.0,
  "DevOps & Cloud": 1300.0,
  "Product Management": 200.0,
  "Software Development": 500.0,
  "UI/UX Design": 320.0,
  "Web Development": 470.0
};

// Monthly growth rates (compounded)
export const GROWTH_RATES = {
  "Cyber Security": 0.024,      // 2.4% monthly growth (steady increase)
  "Data Analytics": 0.018,      // 1.8% monthly growth
  "Data Engineering": 0.031,    // 3.1% monthly growth (high infrastructure demand)
  "Data Science & AI": 0.045,   // 4.5% monthly growth (AI boom)
  "DevOps & Cloud": 0.028,      // 2.8% monthly growth
  "Product Management": 0.012,  // 1.2% monthly growth
  "Software Development": 0.015, // 1.5% monthly growth
  "UI/UX Design": 0.016,        // 1.6% monthly growth
  "Web Development": 0.011      // 1.1% monthly growth
};

export const generateMockPredictions = (nMonths, filterDomain = null) => {
  const predictions = [];
  
  for (let i = 0; i < nMonths; i++) {
    const monthData = {};
    MOCK_DOMAINS.forEach(domain => {
      if (!filterDomain || domain === filterDomain) {
        const base = BASE_DEMAND[domain];
        const rate = GROWTH_RATES[domain];
        const randomVariation = 1 + (Math.random() * 0.01 - 0.005);
        const predictionValue = base * Math.pow(1 + rate, i + 1) * randomVariation;
        monthData[domain] = Math.round(predictionValue * 10) / 10;
      }
    });
    predictions.push(monthData);
  }
  
  return predictions;
};
