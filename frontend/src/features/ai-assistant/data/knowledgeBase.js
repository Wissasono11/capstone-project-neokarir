// Simulated RAG Knowledge Base and Intent Processor for AI Assistant
// Based on planning/request dataset capstone.md

export const INTENTS = {
  SALAM: 'salam_sapaan',
  ROADMAP: 'tanya_roadmap',
  LOKER: 'cari_lowongan',
  TIPS_REKRUTMEN: 'tanya_tips_rekrutmen',
  FITUR: 'bantuan_fitur_aplikasi',
  ANALISIS_SKILL: 'analisis_skill',
  OUT_OF_CONTEXT: 'out_of_context'
};

export const KNOWLEDGE_BASE = {
  roadmaps: {
    frontend: {
      title: "Frontend Engineer Roadmap",
      skills: ["HTML", "CSS", "JavaScript", "ReactJS", "TypeScript"],
      description: "Jalur belajar untuk menjadi Frontend Engineer handal yang menguasai antarmuka modern.",
      steps: [
        "**Dasar Web:** Pahami struktur HTML5, styling dengan CSS3 (Flexbox/Grid), dan dasar JavaScript modern (ES6+).",
        "**Git & Version Control:** Pelajari Git untuk kolaborasi kode di GitHub/GitLab.",
        "**CSS Framework:** Pelajari Tailwind CSS atau Bootstrap untuk mempercepat proses styling.",
        "**JavaScript Framework:** Kuasai ReactJS (State, Props, Hooks, React Router, Context API).",
        "**Type Safety:** Pelajari TypeScript untuk membuat kode JavaScript yang lebih aman dan terstruktur.",
        "**Build Tools & Package Manager:** Pahami npm/yarn, Vite, dan konsep bundling."
      ],
      courses: [
        { judul: "Belajar Dasar Pemrograman Web", platform: "Dicoding", link: "https://dicoding.com/web" },
        { judul: "Belajar Membuat Aplikasi Web dengan React", platform: "Dicoding", link: "https://dicoding.com/react" }
      ]
    },
    backend: {
      title: "Backend Engineer Roadmap",
      skills: ["NodeJS", "Express", "MongoDB", "SQL", "Docker", "Golang"],
      description: "Jalur belajar untuk menguasai arsitektur server, basis data, dan performa API.",
      steps: [
        "**Dasar Bahasa:** Pelajari JavaScript (Node.js) atau Go (Golang) untuk pemrograman sisi server.",
        "**Web Server Framework:** Pelajari Express.js (Node.js) atau Gin (Go) untuk membuat RESTful API.",
        "**Database Relasional (SQL):** Pahami PostgreSQL atau MySQL untuk data terstruktur, relasi, dan indexing.",
        "**Database NoSQL:** Pelajari MongoDB atau Redis untuk penyimpanan dokumen dan caching.",
        "**Autentikasi & Keamanan:** Terapkan JWT (JSON Web Tokens), hashing password (bcrypt), dan CORS.",
        "**Containerization:** Pelajari Docker untuk mengemas aplikasi server agar mudah di-deploy."
      ],
      courses: [
        { judul: "Belajar Membuat Aplikasi Back-End untuk Pemula", platform: "Dicoding", link: "https://dicoding.com/backend" },
        { judul: "Belajar Dasar Structured Query Language (SQL)", platform: "Dicoding", link: "https://dicoding.com/sql" }
      ]
    },
    data: {
      title: "Data Scientist & Analyst Roadmap",
      skills: ["Python", "SQL", "Machine Learning", "Pandas", "Scikit-Learn", "Tableau"],
      description: "Jalur belajar untuk mengolah data, membuat visualisasi, serta membangun model prediksi berbasis AI.",
      steps: [
        "**Pemrograman & Tools:** Kuasai Python dasar dan query SQL untuk ekstraksi data.",
        "**Manipulasi Data:** Pelajari library Pandas, NumPy, dan teknik pembersihan data (*Data Wrangling*).",
        "**Visualisasi Data:** Pelajari Tableau atau library Matplotlib/Seaborn untuk menyajikan insight bisnis.",
        "**Statistika & Matematika:** Pahami konsep probabilitas, kalkulus dasar, aljabar linier, dan uji hipotesis.",
        "**Machine Learning:** Kuasai algoritma supervised/unsupervised learning menggunakan Scikit-Learn.",
        "**Deep Learning & MLOps:** Pelajari TensorFlow/PyTorch dan pipeline deployment model (MLflow/Kubeflow)."
      ],
      courses: [
        { judul: "Memulai Pemrograman dengan Python", platform: "Dicoding", link: "https://dicoding.com/python" },
        { judul: "Belajar Machine Learning untuk Pemula", platform: "Dicoding", link: "https://dicoding.com/machine-learning-beginner" },
        { judul: "Belajar Analisis Data dengan Python", platform: "Dicoding", link: "https://dicoding.com/data-analysis-python" }
      ]
    },
    cybersecurity: {
      title: "Penetration Tester / Security Analyst Roadmap",
      skills: ["Kali Linux", "Burp Suite", "Networking", "Linux", "Bash"],
      description: "Jalur belajar untuk mengamankan infrastruktur jaringan dan mendeteksi celah keamanan sistem.",
      steps: [
        "**Jaringan Dasar:** Pahami model OSI, TCP/IP, routing, subnetting, dan protokol keamanan.",
        "**Sistem Operasi Linux:** Kuasai administrasi Linux CLI, manajemen hak akses, dan otomasi Bash script.",
        "**Web Security Academy:** Pelajari jenis kerentanan umum seperti SQL Injection, XSS, CSRF, dan Broken Authentication.",
        "**Penetration Testing Tools:** Pelajari Nmap untuk port scanning, Burp Suite untuk interseptasi request, dan Metasploit.",
        "**Sertifikasi Profesional:** Persiapkan sertifikasi seperti CEH (Certified Ethical Hacker) atau OSCP."
      ],
      courses: [
        { judul: "Penetration Testing with Kali Linux (PWK)", platform: "Offensive Security", link: "https://www.offsec.com/courses/pen-200/" },
        { judul: "Belajar Dasar Linux", platform: "Dicoding", link: "https://dicoding.com/linux" }
      ]
    },
    uiux: {
      title: "UI/UX Designer Roadmap",
      skills: ["Figma", "Prototyping", "Wireframing", "Adobe XD", "Miro"],
      description: "Jalur belajar untuk menciptakan desain antarmuka pengguna yang estetik, fungsional, dan intuitif.",
      steps: [
        "**Dasar Desain (UI):** Pahami layout, tipografi, psikologi warna, dan visual hierarchy.",
        "**Proses UX & Research:** Pelajari user persona, user journey mapping, information architecture, dan wireframing.",
        "**Figma Essentials:** Kuasai penggunaan Auto-Layout, Components, Variants, dan Design System di Figma.",
        "**Prototyping:** Buat interaksi dinamis dan mikro-animasi untuk demo produk.",
        "**Usability Testing:** Lakukan evaluasi desain secara langsung kepada pengguna menggunakan alat seperti Maze."
      ],
      courses: [
        { judul: "Belajar Dasar Figma untuk Desain Antarmuka", platform: "Dicoding", link: "https://dicoding.com/figma" },
        { judul: "Advanced Prototyping & Micro-animations in Figma", platform: "Udemy", link: "https://udemy.com/figma-prototyping" }
      ]
    }
  },
  tips: {
    cv: {
      title: "Panduan CV ATS Friendly",
      tips: [
        "**Gunakan Format Sederhana:** Gunakan layout satu kolom, hindari gambar, ikon grafik, atau diagram progress lingkaran.",
        "**Gunakan Font Standar:** Pilih tipe font yang mudah dibaca seperti Arial, Calibri, Helvetica, atau Times New Roman.",
        "**Gunakan Keyword yang Tepat:** Masukkan kata kunci keahlian yang tercantum pada deskripsi lowongan pekerjaan.",
        "**Format File:** Selalu simpan dokumen CV Anda dalam format PDF kecuali diminta format lainnya.",
        "**Gunakan Heading Standar:** Gunakan judul bagian yang umum seperti *Work Experience*, *Skills*, *Education*, dan *Certifications*."
      ]
    },
    interview: {
      title: "Tips Persiapan Interview Kerja",
      tips: [
        "**Riset Perusahaan:** Pelajari produk utama perusahaan, visi misi, serta berita/update terbaru mengenai perusahaan.",
        "**Metode STAR:** Jawab pertanyaan perilaku (behavioral questions) dengan metode *Situation, Task, Action, Result*.",
        "**Siapkan Pertanyaan:** Di akhir wawancara, selalu ajukan pertanyaan berkualitas tentang kultur tim atau ekspektasi peran.",
        "**Latihan Mock Interview:** Latihlah cara berbicara dan artikulasi Anda di depan cermin atau bersama teman."
      ]
    },
    negotiation: {
      title: "Cara Negosiasi Gaji bagi Talenta IT",
      tips: [
        "**Riset Standar Pasar:** Cek rentang gaji peran Anda berdasarkan lokasi dan tingkat pengalaman di situs portal karir.",
        "**Tawarkan Nilai Lebih:** Hubungkan kompensasi yang Anda minta dengan kontribusi spesifik atau portofolio nyata.",
        "**Berikan Rentang Gaji:** Sebutkan rentang angka dengan batas bawah sesuai ekspektasi ideal Anda.",
        "**Pertimbangkan Benefit Lain:** Jika gaji pokok sulit dinaikkan, negosiasikan benefit seperti tunjangan kesehatan, asuransi, atau opsi WFH."
      ]
    }
  }
};

export const suggestIntents = (text) => {
  const query = text.toLowerCase();
  
  // 1. Salam / Greetings
  if (query.match(/\b(halo|hai|hi|pagi|siang|sore|malam|hello|hei|hola|assalamualaikum)\b/)) {
    return INTENTS.SALAM;
  }
  
  // 2. Roadmap / Urutan Belajar
  if (query.match(/\b(roadmap|belajar|jalur|pelajari|kurikulum|tahap|step|langkah|urutan)\b/)) {
    return INTENTS.ROADMAP;
  }
  
  // 3. Lowongan / Job Search
  if (query.match(/\b(loker|lowongan|kerja|cari loker|jobs|perusahaan|rekrut|daftar loker)\b/)) {
    return INTENTS.LOKER;
  }
  
  // 4. Tips Rekrutmen / CV / Portfolio / Gaji / Nego
  if (query.match(/\b(cv|resume|portfolio|portofolio|interview|wawancara|gaji|nego|negosiasi|ats)\b/)) {
    return INTENTS.TIPS_REKRUTMEN;
  }
  
  // 5. Fitur Aplikasi / Bantuan
  if (query.match(/\b(fitur|aplikasi|fitur aplikasi|cara pakai|bantuan|menu|guide|neokarir|tanya fitur)\b/)) {
    return INTENTS.FITUR;
  }
  
  // 6. Analisis Skill / Profile Match
  if (query.match(/\b(skill|gap|kecocokan|cocok|match|persen|profil|kurang apa|kurang skill|evaluasi)\b/)) {
    return INTENTS.ANALISIS_SKILL;
  }

  // 7. Check for general out of context (basic filter for demo)
  if (query.match(/\b(rendang|masak|resep|makan|game|cuaca|berita politik|musik|film|bola|sepakbola)\b/)) {
    return INTENTS.OUT_OF_CONTEXT;
  }

  // Default fallback if no immediate match but we'll try semantic fallbacks in reply processor
  return null;
};

// Generates response based on detected intent and context
export const getSimulatedResponse = (text, userProfile, activeRecommendations = []) => {
  const intent = suggestIntents(text) || 'default';
  const name = userProfile?.name?.split(' ')[0] || 'User';
  const targetRole = userProfile?.role || 'Frontend Engineer';
  const ownedSkills = userProfile?.skills || ['HTML', 'CSS', 'JavaScript'];

  switch (intent) {
    case INTENTS.SALAM:
      return `Halo **${name}**! 👋 Saya adalah Neobots.\n\nSaya bisa membantu kamu dalam hal:\n1. 🗺️ **Roadmap Belajar:** Panduan belajar terstruktur untuk berbagai peran IT.\n2. 🔍 **Cari Lowongan:** Menampilkan daftar lowongan kerja terbaru di database.\n3. 📊 **Analisis Skill:** Mengevaluasi kesiapan profil kamu terhadap karir target.\n4. 📝 **Tips Rekrutmen:** Tips membuat CV ATS Friendly, portofolio, dan wawancara.\n\nAda yang ingin kamu tanyakan hari ini?`;
      
    case INTENTS.ROADMAP: {
      let roleKey = 'frontend';
      let cleanRole = 'Frontend Engineer';
      if (text.toLowerCase().includes('data') || text.toLowerCase().includes('python') || text.toLowerCase().includes('ml')) {
        roleKey = 'data';
        cleanRole = 'Data Scientist / Analyst';
      } else if (text.toLowerCase().includes('back') || text.toLowerCase().includes('node') || text.toLowerCase().includes('api')) {
        roleKey = 'backend';
        cleanRole = 'Backend Engineer';
      } else if (text.toLowerCase().includes('security') || text.toLowerCase().includes('cyber') || text.toLowerCase().includes('penetration')) {
        roleKey = 'cybersecurity';
        cleanRole = 'Penetration Tester';
      } else if (text.toLowerCase().includes('design') || text.toLowerCase().includes('ui') || text.toLowerCase().includes('ux') || text.toLowerCase().includes('figma')) {
        roleKey = 'uiux';
        cleanRole = 'UI/UX Designer';
      } else {
        // Fallback to user's current role if mapped
        const lowerRole = targetRole.toLowerCase();
        if (lowerRole.includes('data')) roleKey = 'data';
        else if (lowerRole.includes('back')) roleKey = 'backend';
        else if (lowerRole.includes('security') || lowerRole.includes('cyber')) roleKey = 'cybersecurity';
        else if (lowerRole.includes('design') || lowerRole.includes('ui') || lowerRole.includes('ux')) roleKey = 'uiux';
        cleanRole = targetRole;
      }
      
      const roadmap = KNOWLEDGE_BASE.roadmaps[roleKey];
      let stepsFormatted = roadmap.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n');
      let coursesFormatted = roadmap.courses.map(c => `- **${c.judul}** (${c.platform}) - [Link Belajar](${c.link})`).join('\n');
      
      return `Berikut adalah **Roadmap Pembelajaran** yang direkomendasikan untuk posisi **${roadmap.title}**:\n\n*Deskripsi:* ${roadmap.description}\n\n**Langkah-langkah Belajar:**\n${stepsFormatted}\n\n**Rekomendasi Kelas / Materi:**\n${coursesFormatted}\n\n*Tips: Fokuslah menguasai satu langkah sebelum beralih ke teknologi berikutnya.*`;
    }
      
    case INTENTS.LOKER: {
      // Find matching jobs
      let filteredJobs = activeRecommendations;
      if (activeRecommendations.length === 0) {
        // If not loaded, mock some jobs
        filteredJobs = [
          { job_title: "Frontend Engineer", company: "Gojek", required_skills: ["HTML", "CSS", "ReactJS", "TypeScript"], min_experience: "1 - 3 Tahun" },
          { job_title: "Backend Engineer", company: "Tokopedia", required_skills: ["NodeJS", "Express", "MongoDB", "SQL"], min_experience: "< 1 Tahun" },
          { job_title: "Data Scientist", company: "Traveloka", required_skills: ["Python", "SQL", "Machine Learning", "Pandas"], min_experience: "1 - 3 Tahun" }
        ];
      }
      
      // Let's filter based on query keywords
      let searchKeyword = '';
      if (text.toLowerCase().includes('frontend')) searchKeyword = 'frontend';
      else if (text.toLowerCase().includes('backend')) searchKeyword = 'backend';
      else if (text.toLowerCase().includes('data')) searchKeyword = 'data';
      else if (text.toLowerCase().includes('security') || text.toLowerCase().includes('cyber')) searchKeyword = 'security';
      else if (text.toLowerCase().includes('design') || text.toLowerCase().includes('ui')) searchKeyword = 'design';
      
      let jobsToShow = filteredJobs;
      if (searchKeyword) {
        jobsToShow = filteredJobs.filter(j => j.job_title.toLowerCase().includes(searchKeyword) || j.job_domain?.toLowerCase().includes(searchKeyword));
      }
      
      if (jobsToShow.length === 0) {
        return `Saya tidak menemukan lowongan yang spesifik untuk pencarian tersebut saat ini, tetapi berikut beberapa lowongan teratas di NeoKarir:\n\n` +
          filteredJobs.slice(0, 2).map(j => `- **${j.job_title}** di *${j.company}* (Tech stack: ${j.required_skills.slice(0, 3).join(', ')})`).join('\n') +
          `\n\nKamu juga bisa melihat daftar lengkapnya di tab **Career Recommendation**.`;
      }
      
      let jobList = jobsToShow.slice(0, 3).map(j => {
        return `- **${j.job_title}** di **${j.company || 'Perusahaan Mitra'}**\n  - Syarat Pengalaman: ${j.min_experience || 'Fresh Graduate'}\n  - Skill Utama: ${j.required_skills.slice(0, 4).join(', ')}`;
      }).join('\n\n');
      
      return `Berdasarkan database lowongan kerja di NeoKarir, berikut beberapa lowongan yang cocok:\n\n${jobList}\n\nKamu dapat melamar atau menganalisis kecocokan CV kamu untuk posisi di atas melalui halaman **Career Recommendation**.`;
    }
      
    case INTENTS.TIPS_REKRUTMEN: {
      if (text.toLowerCase().includes('cv') || text.toLowerCase().includes('ats') || text.toLowerCase().includes('resume')) {
        const cvTips = KNOWLEDGE_BASE.tips.cv;
        return `Berikut adalah **${cvTips.title}** untuk membantu kamu lolos screening awal sistem HRD:\n\n` +
          cvTips.tips.map(tip => `- ${tip}`).join('\n') +
          `\n\n*Ingin mencoba menganalisis CV kamu saat ini? Gunakan fitur **CV Analyzer** kami untuk melihat skor kesiapan ATS!*`;
      }
      
      if (text.toLowerCase().includes('interview') || text.toLowerCase().includes('wawancara')) {
        const intTips = KNOWLEDGE_BASE.tips.interview;
        return `Berikut adalah **${intTips.title}** agar kamu tampil percaya diri di hadapan interviewer:\n\n` +
          intTips.tips.map(tip => `- ${tip}`).join('\n') +
          `\n\n*Jangan ragu untuk latihan berbicara secara terstruktur menggunakan teknik STAR.*`;
      }
      
      if (text.toLowerCase().includes('gaji') || text.toLowerCase().includes('nego') || text.toLowerCase().includes('negosiasi')) {
        const negoTips = KNOWLEDGE_BASE.tips.negotiation;
        return `Berikut adalah **${negoTips.title}** yang bisa kamu terapkan:\n\n` +
          negoTips.tips.map(tip => `- ${tip}`).join('\n') +
          `\n\n*Ingatlah bahwa negosiasi gaji adalah hal yang wajar dan menunjukkan profesionalitas kamu.*`;
      }
      
      // Default to resume tips if general
      const cvTips = KNOWLEDGE_BASE.tips.cv;
      return `Berikut adalah **Tips Rekrutmen & Portofolio** secara umum:\n\n1. **Buat CV ATS Friendly:** Pastikan teks dapat dibaca mesin scanner.\n2. **Tunjukkan Portofolio Riil:** Hubungkan tautan GitHub atau berkas desain Figma di CV Anda.\n3. **Gunakan Metode STAR:** Menjawab interview dengan menceritakan situasi, tugas, aksi, dan hasil riil.\n\n*Ketik 'tips cv', 'tips interview', atau 'tips gaji' untuk mendapatkan panduan yang lebih mendalam.*`;
    }
      
    case INTENTS.FITUR:
      return `Aplikasi **NeoKarir** memiliki beberapa fitur unggulan yang dirancang untuk mempercepat persiapan karirmu:\n\n1. 🎯 **Skill Gap Analysis:** Bandingkan skill yang kamu miliki dengan skill yang dicari industri, serta dapatkan kurikulum belajar yang pas.\n2. 🏆 **Career Recommendation:** Dapatkan rekomendasi lowongan kerja dari mitra terpercaya yang disortir berdasarkan skor kesiapan karirmu.\n3. 📄 **CV Analyzer:** Unggah CV PDF kamu, dan sistem AI kami akan mengekstrak teks serta menganalisis kesesuaian isinya.\n4. 📊 **Jobs Market (Tren Pasar):** Lihat statistik tren kebutuhan skill di masa mendatang secara real-time.\n\nKamu dapat mengakses semua fitur ini melalui menu navigasi di bagian kiri layar (*sidebar*).`;
      
    case INTENTS.ANALISIS_SKILL: {
      // Find recommendation matching targetRole
      const matchingJob = activeRecommendations.find(
        rec => rec.job_title.toLowerCase().includes(targetRole.toLowerCase())
      ) || activeRecommendations[0];
      
      if (!matchingJob) {
        return `Saya mendeteksi target karir kamu adalah **${targetRole}**.\n\nBerdasarkan profil kamu, kamu sudah memiliki beberapa skill dasar. Kami merekomendasikan untuk memperbarui profil kamu di menu **Update Skill** agar kami dapat menghitung skor kecocokan yang lebih akurat.`;
      }

      const matchScore = matchingJob.matchScore || 75;
      const missingSkills = matchingJob.required_skills.filter(
        skill => !ownedSkills.some(owned => owned.toLowerCase() === skill.toLowerCase())
      );
      
      let reply = `Berdasarkan analisis profil kamu terhadap posisi **${matchingJob.job_title}** di **${matchingJob.company}**:\n\n`;
      reply += `- 📈 **Skor Kecocokan (Match Score):** **${matchScore}%**\n`;
      
      if (missingSkills.length > 0) {
        reply += `- ⚠️ **Skill yang Perlu Ditingkatkan:** ${missingSkills.join(', ')}\n`;
        reply += `\nUntuk menutupi kesenjangan skill tersebut, saya menyarankan kamu untuk segera mengambil course yang direkomendasikan di tab **Skill Gap Analysis**.`;
      } else {
        reply += `- 🎉 **Hebat!** Kamu telah memenuhi semua skill wajib yang dibutuhkan untuk posisi ini.\n`;
        reply += `\nKamu sudah siap untuk melamar pekerjaan ini! Silakan kunjungi tab **Career Recommendation** untuk mengirimkan lamaranmu.`;
      }
      
      return reply;
    }
      
    case INTENTS.OUT_OF_CONTEXT:
      return `Aduh, pertanyaan tersebut sepertinya di luar topik karir dan pengembangan diri. 😅\n\nSebagai asisten karir digitalmu di **NeoKarir**, saya hanya bisa menjawab seputar *roadmap belajar IT, tips rekrutmen/CV/interview, info lowongan kerja, dan analisis skill*. Mari kita bahas topik karirmu saja! Ada hal apa tentang karirmu yang ingin kamu diskusikan?`;
      
    default:
      // Try keyword fallback
      if (text.toLowerCase().includes('react') || text.toLowerCase().includes('node') || text.toLowerCase().includes('python') || text.toLowerCase().includes('database')) {
        // Redirect to roadmap
        return getSimulatedResponse('roadmap ' + text, userProfile, activeRecommendations);
      }
      if (text.toLowerCase().includes('cv') || text.toLowerCase().includes('resume') || text.toLowerCase().includes('wawancara') || text.toLowerCase().includes('interview')) {
        return getSimulatedResponse('tips ' + text, userProfile, activeRecommendations);
      }
      
      return `Maaf, saya belum memahami maksud pertanyaan kamu sepenuhnya. 🤖\n\nBisa tolong perjelas? Kamu juga bisa mencoba mengklik salah satu **Rekomendasi Pertanyaan** di bawah, atau tekan tombol **Enhance Prompt** (ikon 🪄) di samping kolom input untuk membuat pertanyaanmu lebih detail.`;
  }
};
