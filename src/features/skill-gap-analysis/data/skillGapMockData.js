export const heroData = {
  overallReadiness: 81,
  targetRole: "Fullstack Engineer",
  targetDomain: "Web Development",
  matchedSkillsCount: 4,
  totalRequiredSkills: 6,
  missingSkillsCount: 2,
  experienceGap: { current: "Belum ada (Fresh Graduate / Sedang belajar)", required: "1 - 2 Tahun", hasGap: true },
  educationMatch: { current: "S1/D4", required: "S1/D4", hasGap: false },
  readinessLevel: "Hampir Siap"
};

export const radarData = [
  { subject: 'Problem Solving', A: 90, fullMark: 100 },
  { subject: 'React', A: 85, fullMark: 100 },
  { subject: 'Golang', A: 65, fullMark: 100 },
  { subject: 'Communication', A: 80, fullMark: 100 },
  { subject: 'Laravel', A: 70, fullMark: 100 },
  { subject: 'Docker', A: 60, fullMark: 100 },
];

export const skillBreakdown = [
  { skill: "Problem Solving", current: 90, required: 90, gap: 0, trend: "up" },
  { skill: "React", current: 85, required: 90, gap: -5, trend: "down" },
  { skill: "Golang", current: 65, required: 85, gap: -20, trend: "down" },
  { skill: "Communication", current: 80, required: 85, gap: -5, trend: "down" },
  { skill: "Laravel", current: 70, required: 80, gap: -10, trend: "down" },
  { skill: "Docker", current: 60, required: 80, gap: -20, trend: "down" },
];

export const recommendedActions = [
  {
    type: "critical",
    title: "Gap Kritis",
    color: "red",
    description: "Fokus tingkatkan skill Golang & Docker untuk memenuhi standar industri Fullstack Engineer."
  },
  {
    type: "improvement",
    title: "Perlu Ditingkatkan",
    color: "yellow",
    description: "Perkuat kemampuan React, Laravel, dan Communication untuk meningkatkan daya saing."
  },
  {
    type: "strength",
    title: "Keunggulan",
    color: "green",
    description: "Skill Problem Solving kamu sudah memenuhi standar industri. Pertahankan!"
  }
];

export const missingSkillCards = [
  {
    skill: "Golang",
    gap: 20,
    priority: "Tinggi",
    description: "Bahasa pemrograman backend berkinerja tinggi yang populer untuk microservices.",
    alasan: "Banyak startup skala besar menggunakan Golang untuk backend services.",
    relatedSkills: ["Docker", "Problem Solving"],
    waktuBelajar: "6 - 10 Minggu"
  },
  {
    skill: "Docker",
    gap: 20,
    priority: "Tinggi",
    description: "Platform containerization untuk memastikan aplikasi berjalan konsisten di semua environment.",
    alasan: "Standard DevOps yang wajib dikuasai oleh Fullstack Engineer modern.",
    relatedSkills: ["Golang", "Laravel"],
    waktuBelajar: "4 - 6 Minggu"
  }
];

export const learningPath = [
  {
    id: 1,
    skill: "Docker",
    judul: "Docker untuk Pemula",
    platform: "Dicoding",
    link: "https://www.dicoding.com/academies/382",
    durasi: "20 Jam",
    prioritas: "Tinggi",
    urutan: 1,
    prasyarat: [],
    deskripsi: "Pelajari containerization dasar menggunakan Docker untuk kemudahan deployment."
  },
  {
    id: 2,
    skill: "Golang",
    judul: "Pemrograman Backend dengan Go-Lang",
    platform: "Dicoding",
    link: "https://www.dicoding.com/academies/184",
    durasi: "40 Jam",
    prioritas: "Tinggi",
    urutan: 2,
    prasyarat: ["Problem Solving"],
    deskripsi: "Kuasai sintaksis Go-Lang, rest api, microservices, dan concurrency dasar."
  }
];
