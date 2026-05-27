import React from 'react';
import { Search, HelpCircle } from 'lucide-react';

const SupportHero = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative overflow-hidden bg-dashboard-background rounded-3xl p-6 md:p-10 shadow-lg text-white mb-8 border border-white/10">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-caption font-semibold mb-4 border border-white/5">
          <HelpCircle size={14} />
          <span>Pusat Bantuan & Dukungan</span>
        </div>

        <h1 className="text-title md:text-heading-lg font-bold text-white tracking-tight mb-2">
          Ada yang bisa kami bantu?
        </h1>
        <p className="text-body-sm md:text-body text-indigo-100/80 mb-6 font-medium">
          Temukan jawaban atas pertanyaan seputar fitur NeoKarir AI, ikuti panduan langkah demi langkah, atau hubungi langsung tim kami.
        </p>

        {/* Search Input */}
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Cari pertanyaan, panduan, atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/10 hover:bg-white/15 focus:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-body-sm md:text-body"
          />
        </div>
      </div>
    </div>
  );
};

export default SupportHero;
