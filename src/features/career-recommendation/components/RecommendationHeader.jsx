import { Sparkles } from 'lucide-react';

const RecommendationHeader = ({ overallReadiness }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-title md:text-heading font-bold text-primary-text mb-1 tracking-tight">
          Rekomendasi Karir AI
        </h1>
        <p className="text-body-sm font-medium text-secondary-text">
          Pekerjaan paling sesuai berdasarkan kecocokan CV, skill gap, dan profil Anda.
        </p>
      </div>

      {/* Overall stats badge - simplified and styled cleanly */}
      <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2.5 rounded-2xl shadow-sm shrink-0">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-caption font-bold uppercase tracking-wider text-slate-400">Rata-rata Kesiapan</div>
          <div className="text-body-sm font-extrabold text-slate-800 leading-tight">
            <span className="text-indigo-600">{overallReadiness}%</span> Match Rate
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationHeader;
