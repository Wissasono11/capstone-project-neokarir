import React from 'react';
import { useExtractedEntities } from '../hooks/useExtractedEntities';

const CVExtractedEntities = ({ entities }) => {
  const sections = useExtractedEntities(entities);

  if (!entities) return null;

  return (
    <div className="bg-white rounded-[32px] border border-border p-6 md:p-8 shadow-sm w-full mb-8">
      {/* Title */}
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-bold text-primary-text mb-1">
          Ekstraksi Informasi NER (Named Entity Recognition)
        </h3>
        <p className="text-xs md:text-sm font-semibold text-secondary-text">
          Sistem kecerdasan buatan kami berhasil memetakan teks CV Anda menjadi 13 tag sequence BIO berikut:
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div 
              key={idx} 
              className={`rounded-2xl border border-border/80 p-5 flex flex-col justify-between transition-all duration-300 hover:border-primary/20 ${sec.bgColor}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl bg-white shrink-0 shadow-sm ${sec.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-[15px] font-bold text-primary-text">
                      {sec.title}
                    </h4>
                  </div>

                  {/* NER tag badge */}
                  <span className="text-[10px] font-extrabold text-secondary-text bg-border/60 px-2 py-0.5 rounded-md uppercase">
                    NER: {sec.tag}
                  </span>
                </div>

                <p className="text-xs font-semibold text-secondary-text mb-4">
                  {sec.description}
                </p>
              </div>

              {/* Badges container */}
              <div className="flex flex-wrap gap-2">
                {sec.items && sec.items.length > 0 ? (
                  sec.items.map((item, itemIdx) => (
                    <span 
                      key={itemIdx} 
                      className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 border border-black/5 ${sec.badgeColor}`}
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-xs font-semibold text-secondary-text italic bg-canvas-white px-3 py-1.5 rounded-xl border border-border/40">
                    Tidak ditemukan data
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CVExtractedEntities;
