import React from 'react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { useLanguage } from '../../../contexts/LanguageContext';

const DOMAIN_COLORS = {
  "Cyber Security": "#3B82F6",      // Blue
  "Data Analytics": "#06B6D4",      // Cyan
  "Data Engineering": "#8B5CF6",    // Violet
  "Data Science & AI": "#10B981",   // Emerald
  "DevOps & Cloud": "#F59E0B",      // Amber
  "Product Management": "#F43F5E",  // Rose
  "Software Development": "#F97316", // Orange
  "UI/UX Design": "#D946EF",        // Fuchsia
  "Web Development": "#14B8A6"      // Teal
};

const CustomTooltip = ({ active, payload, label, vacanciesUnit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#18181B] text-white p-3.5 rounded-xl border border-white/10 shadow-xl text-caption font-jakarta">
        <p className="font-bold mb-1.5 text-white/80">{label}</p>
        {payload.map((item, idx) => {
          // Resolve color for label
          const color = DOMAIN_COLORS[label] || item.color || item.fill;
          return (
            <div key={idx} className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-semibold text-white/70">{item.name}:</span>
              <span className="font-bold text-white text-body-sm">{Math.round(item.value)} {vacanciesUnit}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

const JobMarketChart = ({ predictions, selectedDomain, loading }) => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 flex flex-col gap-4">
        <div>
          <div className="h-5 w-80 rounded-lg" style={{ background: 'linear-gradient(90deg, #F1F5F9 25%, #E8EDF3 37%, #F1F5F9 63%)', backgroundSize: '200% 100%', animation: 'shimmer 1.8s ease-in-out infinite' }} />
          <div className="h-3.5 w-96 rounded-md mt-2" style={{ background: 'linear-gradient(90deg, #F1F5F9 25%, #E8EDF3 37%, #F1F5F9 63%)', backgroundSize: '200% 100%', animation: 'shimmer 1.8s ease-in-out infinite', animationDelay: '100ms' }} />
        </div>
        <div className="w-full h-[360px] md:h-[400px] flex items-end gap-2 px-4 pt-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
              <div
                className="w-full rounded-t-lg"
                style={{
                  height: `${25 + Math.sin(i * 0.7) * 30 + 20}%`,
                  background: 'linear-gradient(90deg, #F1F5F9 25%, #E8EDF3 37%, #F1F5F9 63%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.8s ease-in-out infinite',
                  animationDelay: `${i * 60}ms`
                }}
              />
              <div
                className="w-4/5 h-2.5 rounded"
                style={{
                  background: 'linear-gradient(90deg, #F1F5F9 25%, #E8EDF3 37%, #F1F5F9 63%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.8s ease-in-out infinite',
                  animationDelay: `${i * 60 + 30}ms`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!predictions || predictions.length === 0) {
    return (
      <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 h-[460px] flex items-center justify-center">
        <p className="text-body-sm font-semibold text-secondary-text">
          {t.jobsMarket?.noDataAvailable || 'No data available to visualize.'}
        </p>
      </div>
    );
  }

  // Formatting for Recharts
  const isComparisonMode = selectedDomain === 'all';
  
  let chartData = [];
  if (isComparisonMode) {
    const firstMonth = predictions[0] || {};
    chartData = Object.keys(firstMonth)
      .map(key => ({
        name: key,
        'Estimasi Demand': firstMonth[key]
      }))
      .sort((a, b) => b['Estimasi Demand'] - a['Estimasi Demand']); // Sort for neat bar ranking
  } else {
    chartData = predictions.map((pred, index) => ({
      name: typeof t.jobsMarket?.monthPlus === 'function' ? t.jobsMarket.monthPlus(index + 1) : `Month +${index + 1}`,
      'Estimasi Demand': pred[selectedDomain] || 0
    }));
  }

  return (
    <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-body-lg font-bold text-primary-text mb-1">
          {isComparisonMode 
            ? (t.jobsMarket?.comparisonTitle || 'Comparison') 
            : (typeof t.jobsMarket?.projectionTitle === 'function' ? t.jobsMarket.projectionTitle(selectedDomain) : `Demand Trend Projection: ${selectedDomain}`)}
        </h3>
        <p className="text-caption font-medium text-secondary-text">
          {isComparisonMode 
            ? (t.jobsMarket?.comparisonDesc || 'Comparison Description')
            : (typeof t.jobsMarket?.projectionDesc === 'function' ? t.jobsMarket.projectionDesc(selectedDomain) : `Showing the estimated growth of ${selectedDomain} job vacancies`)}
        </p>
      </div>

      <div className="w-full h-[360px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {isComparisonMode ? (
            isMobile ? (
              // Horizontal Bar Chart for Mobile (vertical layout)
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis 
                  type="number"
                  stroke="#64748B" 
                  fontSize={10} 
                  fontWeight={500}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  type="category"
                  dataKey="name" 
                  stroke="#64748B" 
                  fontSize={10} 
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
                <Tooltip content={<CustomTooltip vacanciesUnit={t.jobsMarket?.vacanciesUnit || 'vacancies'} />} cursor={{ fill: '#F8FAFC', radius: 4 }} />
                <Legend 
                  verticalAlign="top" 
                  height={32} 
                  iconType="circle" 
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, fontWeight: 600 }}
                />
                <Bar 
                  dataKey="Estimasi Demand" 
                  name={t.jobsMarket?.estDemand || 'Estimated Demand'}
                  radius={[0, 4, 4, 0]} 
                  barSize={16}
                >
                  {chartData.map((entry, index) => {
                    const color = DOMAIN_COLORS[entry.name] || "#4F46E5";
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            ) : (
              // Vertical Bar Chart for Desktop (horizontal layout)
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B" 
                  fontSize={11} 
                  fontWeight={500}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={11} 
                  fontWeight={500}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip vacanciesUnit={t.jobsMarket?.vacanciesUnit || 'vacancies'} />} cursor={{ fill: '#F8FAFC', radius: 8 }} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="circle" 
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, fontWeight: 600 }}
                />
                <Bar 
                  dataKey="Estimasi Demand" 
                  name={t.jobsMarket?.estDemand || 'Estimated Demand'}
                  radius={[8, 8, 0, 0]} 
                  barSize={32}
                >
                  {chartData.map((entry, index) => {
                    const color = DOMAIN_COLORS[entry.name] || "#4F46E5";
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            )
          ) : (
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748B" 
                fontSize={12} 
                fontWeight={500}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748B" 
                fontSize={12} 
                fontWeight={500}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip vacanciesUnit={t.jobsMarket?.vacanciesUnit || 'vacancies'} />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ fontSize: 12, fontWeight: 600 }}
              />
              <Area 
                type="monotone" 
                dataKey="Estimasi Demand" 
                name={t.jobsMarket?.estDemand || 'Estimated Demand'}
                stroke="#4F46E5" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#areaGradient)"
                activeDot={{ r: 6, strokeWidth: 0, fill: '#4F46E5' }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobMarketChart;
