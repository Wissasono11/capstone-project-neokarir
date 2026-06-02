export const mockResults = {
  atsScore: 81,
  overallRating: 'weak', 
  summary: "CV Anda memiliki struktur yang sangat baik dengan kecocokan skill teknis yang kuat untuk bidang Data Science & Web Development. Namun, beberapa detail pencapaian kuantitatif masih dapat ditingkatkan agar lebih memikat recruiter dan sistem ATS.",
  
  strengths: [
    'Tech stack modern & relevan dengan kebutuhan industri saat ini (Python, SQL, ReactJS).',
    'Memiliki sertifikasi terakreditasi tingkat nasional & global.',
    'Struktur CV bersih, mudah dipindai (scannable), dan ATS-friendly.'
  ],
  
  weaknesses: [
    'Kurangnya data pencapaian kuantitatif (misalnya: menggunakan metrik performa persen/angka nyata).',
    'Belum menyertakan deskripsi ringkasan profesional (Professional Summary) di bagian atas.',
    'Beberapa deskripsi pengalaman kerja terlalu singkat dan kurang deskriptif.'
  ],
  
  improvementTips: [
    { priority: 'high', text: 'Tambahkan metrik kuantitatif pada pengalaman kerja Anda (misal: "Meningkatkan akurasi model ML sebesar 15%" atau "Mengurangi load time website sebesar 20%").' },
    { priority: 'medium', text: 'Tulis ringkasan profesional singkat (2-3 kalimat) yang menjelaskan value utama dan target karir Anda di bagian paling atas CV.' },
    { priority: 'medium', text: 'Tambahkan tautan portofolio aktif atau profil GitHub untuk memvalidasi proyek-proyek yang telah Anda kerjakan.' },
    { priority: 'low', text: 'Sesuaikan keyword skill pada CV dengan deskripsi lowongan kerja target untuk meningkatkan nilai kelolosan sistem screening ATS.' }
  ]
};

export const steps = [
  'Mengunggah berkas CV Anda...',
  'Mengekstrak teks dokumen (PDF/DOCX)...',
  'Menganalisis konten dan struktur CV...',
  'Mengidentifikasi kecocokan skill & kualifikasi...',
  'Menghitung ATS score & menyusun rekomendasi peningkatan...'
];

export const getColorScheme = (val) => {
  if (val >= 85) return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', stroke: '#10B981', label: 'EXCELLENT' };
  if (val >= 70) return { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', stroke: '#4F46E5', label: 'GOOD' };
  if (val >= 50) return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', stroke: '#F59E0B', label: 'FAIR' };
  return { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', stroke: '#EF4444', label: 'WEAK' };
};

