require('dotenv').config();
const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

const client = new Client({
  connectionString: DATABASE_URL,
});

const DOMAINS = [
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

const BASE_DEMAND = {
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

const GROWTH_RATES = {
  "Cyber Security": 0.024,
  "Data Analytics": 0.018,
  "Data Engineering": 0.031,
  "Data Science & AI": 0.045,
  "DevOps & Cloud": 0.028,
  "Product Management": 0.012,
  "Software Development": 0.015,
  "UI/UX Design": 0.016,
  "Web Development": 0.011
};

async function run() {
  await client.connect();
  console.log('Connected to database for seeding.');

  try {
    // 1. Clean up existing market trends to avoid duplicates
    console.log('Cleaning up existing market records...');
    await client.query('DELETE FROM public.market');
    console.log('Existing market records cleared.');

    // 2. Generate and Insert 12 months of historical data
    console.log('Generating historical market trend records...');
    const today = new Date();
    const records = [];

    // Let's generate data for the past 12 months
    for (let i = 12; i >= 1; i--) {
      // Find month date (last day of the month)
      const year = today.getFullYear();
      const month = today.getMonth() - i;
      const trendDate = new Date(year, month + 1, 0); // Last day of month

      for (const domain of DOMAINS) {
        // Calculate historical demand by compounding growth backwards
        const base = BASE_DEMAND[domain];
        const rate = GROWTH_RATES[domain];
        // val = base / (1 + rate)^i
        const calculatedDemand = base / Math.pow(1 + rate, i);
        const jobCount = Math.round(calculatedDemand);

        records.push({
          title: `${domain} Job Market Trend`,
          category: domain,
          trend_date: trendDate.toISOString(),
          job_count: jobCount,
          growth_rate: rate * 100, // percentage representation
          avg_salary: getAverageSalary(domain),
          market_data: JSON.stringify({
            growth_trend: rate >= 0.02 ? 'Sangat Tinggi' : rate >= 0.015 ? 'Tinggi' : 'Stabil'
          })
        });
      }
    }

    console.log(`Inserting ${records.length} records into public.market...`);
    
    for (const record of records) {
      await client.query(`
        INSERT INTO public.market (title, category, trend_date, job_count, growth_rate, avg_salary, market_data)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        record.title,
        record.category,
        record.trend_date,
        record.job_count,
        record.growth_rate,
        record.avg_salary,
        record.market_data
      ]);
    }

    console.log('Database seeded successfully.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await client.end();
  }
}

function getAverageSalary(domain) {
  const salaries = {
    "Cyber Security": 12000000,
    "Data Analytics": 9500000,
    "Data Engineering": 14000000,
    "Data Science & AI": 16000000,
    "DevOps & Cloud": 15000000,
    "Product Management": 11000000,
    "Software Development": 10000000,
    "UI/UX Design": 8500000,
    "Web Development": 8000000
  };
  return salaries[domain] || 9000000;
}

run();
