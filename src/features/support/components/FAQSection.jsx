import React from 'react';
import FAQItem from './FAQItem';
import { HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    category: 'umum',
    question: 'Apa itu NeoKarir AI?',
    answer: 'NeoKarir AI adalah platform asisten karir cerdas berbasis kecerdasan buatan yang dirancang untuk membantu mahasiswa IT, fresh graduate, dan profesional muda menganalisis kecocokan profil mereka dengan kebutuhan industri, menemukan kesenjangan keterampilan (skill gap), serta mendapatkan panduan pembelajaran terarah menuju pekerjaan impian mereka.'
  },
  {
    category: 'cv-analyzer',
    question: 'Bagaimana cara kerja fitur Smart CV Analyzer?',
    answer: 'Fitur Smart CV Analyzer bekerja dengan mengekstraksi teks dari berkas CV PDF Anda dan menganalisis isinya menggunakan model AI khusus Named Entity Recognition (NER). Sistem akan mendeteksi entitas penting seperti Skill, Role, Education, Certification, Company, dan Experience untuk memetakan profil karir Anda secara akurat.'
  },
  {
    category: 'skill-gap',
    question: 'Bagaimana cara membaca grafik di Skill Gap Analysis?',
    answer: 'Skill Gap Analysis menggunakan grafik Radar Chart untuk membandingkan keterampilan Anda dengan kebutuhan role industri target secara langsung. Titik luar menggambarkan skill minimum yang dibutuhkan, sedangkan area berwarna menunjukkan level kepemilikan skill Anda saat ini. Semakin dekat area berwarna ke tepi luar, semakin siap Anda untuk melamar posisi tersebut.'
  },
  {
    category: 'jobs-market',
    question: 'Dari mana asal data Job Market Trend Forecasting?',
    answer: 'Data ramalan pasar kerja IT kami diproses menggunakan model machine learning peramalan time-series (forecasting) yang menganalisis tren permintaan ribuan data lowongan pekerjaan dalam katalog history. Model ini memprediksi volume kebutuhan keterampilan dan domain IT hingga 12 bulan ke depan.'
  },
  {
    category: 'ai-assistant',
    question: 'Bagaimana AI Assistant membantu merencanakan karir saya?',
    answer: 'AI Assistant kami terhubung dengan knowledge base khusus karir IT. Anda bisa berdiskusi tentang tips interview, cara menegosiasikan gaji, rekomendasi sertifikasi, hingga meminta dibuatkan draf portofolio atau struktur belajar. AI diprogram khusus untuk mendeteksi intent karir agar tidak memberikan informasi di luar konteks.'
  },
  {
    category: 'akun',
    question: 'Bagaimana cara memperbarui data keahlian atau preferensi karir saya?',
    answer: 'Anda bisa memperbarui data keahlian melalui menu "Profile & Settings" pada tab "Career & Skills", atau dengan menekan tombol "Update Skill" di halaman Skill Gap Analysis untuk memicu kembali kuesioner Onboarding.'
  },
  {
    category: 'umum',
    question: 'Apakah platform NeoKarir AI sepenuhnya gratis?',
    answer: 'Ya, semua fitur inti di NeoKarir seperti Smart CV Analyzer, Skill Gap Analysis, Job Market Forecasting, dan AI Assistant dapat diakses sepenuhnya gratis tanpa biaya berlangganan apa pun untuk mendukung perkembangan talenta digital Indonesia.'
  },
  {
    category: 'teknis',
    question: 'Bagaimana jika sistem gagal menganalisis CV saya?',
    answer: 'Pastikan file CV yang Anda unggah berformat PDF asli (bukan hasil scan gambar/foto) dan memiliki ukuran kurang dari 5MB. Jika masih mengalami kendala, pastikan koneksi internet Anda stabil, atau silakan hubungi tim dukungan kami melalui tab "Hubungi Support".'
  }
];

const FAQSection = ({ searchQuery, expandedFAQ, toggleFAQ, setSearchQuery }) => {
  const filteredFAQs = FAQ_DATA.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4 mb-2">
        <div>
          <h2 className="text-body-lg md:text-subtitle font-bold text-primary-text">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-body-sm text-secondary-text">Jawaban cepat untuk pertanyaan populer seputar fitur NeoKarir.</p>
        </div>
        <span className="text-caption font-semibold px-2.5 py-1 bg-bg-secondary text-primary rounded-full shrink-0 self-start sm:self-center">
          {filteredFAQs.length} Topik ditemukan
        </span>
      </div>

      {filteredFAQs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredFAQs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={expandedFAQ === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-border rounded-3xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-bg-secondary flex items-center justify-center text-primary mb-4">
            <HelpCircle size={28} />
          </div>
          <h3 className="font-bold text-primary-text text-body-lg mb-2">Pencarian Tidak Ditemukan</h3>
          <p className="text-body-sm text-secondary-text max-w-sm mb-6">
            Kami tidak menemukan hasil untuk kata kunci &ldquo;{searchQuery}&rdquo;. Coba gunakan kata kunci lainnya.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-5 py-2.5 bg-primary hover:bg-indigo-700 active:scale-95 text-white font-semibold text-body-sm rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQSection;
