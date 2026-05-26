import React from 'react';
import { Award, CheckCircle, TrendingUp } from 'lucide-react';
import { DOMAIN_INSIGHTS } from '../utils/insightsData';

const JobMarketInsights = ({ selectedDomain, predictions }) => {
  const isComparisonMode = selectedDomain === 'all';

  if (isComparisonMode) {
    // Determine ranking from first month
    const firstMonth = predictions[0] || {};
    const rankedDomains = Object.keys(firstMonth)
      .map(key => ({
        name: key,
        value: firstMonth[key],
        growth: DOMAIN_INSIGHTS[key]?.growth || 'Tinggi'
      }))
      .sort((a, b) => b.value - a.value);

    return (
      <div className="bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-body-lg font-bold text-primary-text mb-1">
            Peringkat Kebutuhan Domain Kerja IT
          </h3>
          <p className="text-caption font-medium text-secondary-text">
            Urutan bidang keahlian IT berdasarkan estimasi lowongan aktif bulan depan.
          </p>
        </div>

        <div className="divide-y divide-border/60">
          {rankedDomains.map((dom, idx) => (
            <div key={dom.name} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-700 font-bold text-caption border border-indigo-100">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-body-sm font-bold text-primary-text">{dom.name}</h4>
                  <p className="text-caption text-secondary-text">Rating Pertumbuhan: <span className="font-semibold text-indigo-600">{dom.growth}</span></p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-body-sm font-bold text-primary-text block">{Math.round(dom.value)}</span>
                <span className="text-[10px] font-semibold text-secondary-text uppercase">Lowongan</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const insight = DOMAIN_INSIGHTS[selectedDomain] || {
    outlook: "Permintaan domain ini diproyeksikan tumbuh stabil.",
    skills: ["Analisis Industri", "Keahlian Teknis Terkait", "Sertifikasi Profesional"],
    roles: ["Junior Specialist", "Mid Professional", "Lead Consultant"],
    growth: "Stabil"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Outlook & Prospek Kerja */}
      <div className="lg:col-span-7 bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 space-y-5">
        <div>
          <h3 className="text-body-lg font-bold text-primary-text mb-1 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span>Prospek Pasar Kerja ({selectedDomain})</span>
          </h3>
          <p className="text-caption font-medium text-secondary-text">
            Analisis prospek pertumbuhan karir dan tantangan di masa depan.
          </p>
        </div>

        <div className="p-4 bg-indigo-50/50 border border-indigo-100/60 rounded-2xl text-body-sm font-medium text-primary-text leading-relaxed">
          {insight.outlook}
        </div>

        <div className="space-y-3">
          <h4 className="text-body-sm font-bold text-primary-text flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Peran Kerja Paling Dibutuhkan:</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {insight.roles.map((role, idx) => (
              <span 
                key={idx} 
                className="px-3.5 py-1.5 rounded-xl bg-canvas-white border border-border/80 text-secondary-text text-caption font-semibold"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Skills */}
      <div className="lg:col-span-5 bg-pure-surface rounded-[24px] border border-border shadow-sm p-6 space-y-5">
        <div>
          <h3 className="text-body-lg font-bold text-primary-text mb-1 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Skill Penunjang Utama</span>
          </h3>
          <p className="text-caption font-medium text-secondary-text">
            Rekomendasi kompetensi yang wajib dikuasai untuk bersaing.
          </p>
        </div>

        <div className="space-y-3">
          {insight.skills.map((skill, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-canvas-white border border-border/60 rounded-xl hover:border-primary/40 transition-colors duration-200">
              <span className="w-5 h-5 shrink-0 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px] border border-emerald-100 mt-0.5">
                ✓
              </span>
              <span className="text-body-sm font-semibold text-primary-text">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobMarketInsights;
