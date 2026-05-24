import { Search, SlidersHorizontal } from 'lucide-react';

const RecommendationFilter = ({
  searchQuery,
  setSearchQuery,
  selectedDomain,
  setSelectedDomain,
  selectedMatchFilter,
  setSelectedMatchFilter,
  domains
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
      {/* Search and Quick Match Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari karir, perusahaan, atau skill..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/10 outline-none text-body-sm font-medium transition-all"
          />
        </div>

        {/* Match filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <span className="text-caption font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1 tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" /> Match Level:
          </span>
          {[
            { id: 'all', label: 'Semua' },
            { id: 'high', label: 'Tinggi (≥80%)' },
            { id: 'medium', label: 'Sedang (50-79%)' },
            { id: 'low', label: 'Rendah (<50%)' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedMatchFilter(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-caption font-bold transition-all shrink-0 cursor-pointer
                ${selectedMatchFilter === opt.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/60'
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Domain Categories tabs */}
      <div className="border-t border-slate-100 pt-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {domains.map(dom => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3.5 py-1.5 rounded-lg text-caption font-bold transition-all shrink-0 cursor-pointer border
                ${selectedDomain === dom
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }
              `}
            >
              {dom === 'All' ? 'Semua Bidang' : dom}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationFilter;
