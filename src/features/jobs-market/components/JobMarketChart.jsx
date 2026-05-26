import React from 'react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

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

const CustomTooltip = ({ active, payload, label }) => {
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
              <span className="font-bold text-white text-body-sm">{Math.round(item.value)} lowongan</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

const JobMarketChart = ({ predictions, selectedDomain, loading }) => {
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
      <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 h-[460px] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-body-sm font-semibold text-secondary-text animate-pulse">
          Menganalisis tren data dengan AI NeoKarir...
        </p>
      </div>
    );
  }

  if (!predictions || predictions.length === 0) {
    return (
      <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 h-[460px] flex items-center justify-center">
        <p className="text-body-sm font-semibold text-secondary-text">
          Tidak ada data yang tersedia untuk divisualisasikan.
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
      name: `Bulan +${index + 1}`,
      'Estimasi Demand': pred[selectedDomain] || 0
    }));
  }

  return (
    <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-body-lg font-bold text-primary-text mb-1">
          {isComparisonMode 
            ? 'Perbandingan Kebutuhan Lowongan IT (Bulan Depan)' 
            : `Proyeksi Tren Demand: ${selectedDomain}`}
        </h3>
        <p className="text-caption font-medium text-secondary-text">
          {isComparisonMode 
            ? 'Membandingkan tingkat demand lowongan IT antar-domain pada bulan pertama proyeksi.'
            : `Menampilkan pertumbuhan estimasi jumlah lowongan kerja ${selectedDomain} dalam beberapa bulan ke depan.`}
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
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC', radius: 4 }} />
                <Legend 
                  verticalAlign="top" 
                  height={32} 
                  iconType="circle" 
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, fontWeight: 600 }}
                />
                <Bar 
                  dataKey="Estimasi Demand" 
                  name="Estimasi Jumlah Lowongan"
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
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC', radius: 8 }} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="circle" 
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, fontWeight: 600 }}
                />
                <Bar 
                  dataKey="Estimasi Demand" 
                  name="Estimasi Jumlah Lowongan"
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
              <Tooltip content={<CustomTooltip />} />
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
                name="Estimasi Jumlah Lowongan"
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
