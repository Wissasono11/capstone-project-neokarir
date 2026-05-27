import React from 'react';
import { Target, Award, FileText, MessageSquareMore, Settings, TrendingUp } from 'lucide-react';
import GuideCard from './GuideCard';

const GUIDE_ITEMS = [
  {
    title: 'Skill Gap Analysis',
    description: 'Analisis kesiapan karir Anda dengan memetakan keterampilan yang Anda miliki saat ini terhadap keterampilan yang disyaratkan oleh industri target.',
    icon: Target,
    path: '/dashboard/skill-gap',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    title: 'Career Recommendation',
    description: 'Dapatkan rekomendasi peran karir IT terbaik berdasarkan latar belakang pendidikan, preferensi kerja, dan keahlian teknis Anda.',
    icon: Award,
    path: '/dashboard/recommendations',
    color: 'text-teal-600',
    bg: 'bg-teal-50'
  },
  {
    title: 'CV Analyzer',
    description: 'Unggah berkas CV Anda untuk dianalisis oleh AI. Temukan bagian CV mana yang sudah ATS-friendly dan entitas apa saja yang terdeteksi.',
    icon: FileText,
    path: '/dashboard/cv-analyzer',
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
  {
    title: 'Jobs Market Trend',
    description: 'Pantau fluktuasi kebutuhan keterampilan IT. Gunakan fitur forecasting AI kami untuk melihat estimasi demand domain IT hingga 12 bulan.',
    icon: TrendingUp,
    path: '/dashboard/jobs-market',
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    title: 'AI Assistant Chatbot',
    description: 'Ajukan pertanyaan tentang karir IT Anda. Asisten cerdas kami siap menjawab roadmap belajar, tips interview, dan penulisan portofolio.',
    icon: MessageSquareMore,
    path: '/dashboard/ai-assistant',
    color: 'text-pink-600',
    bg: 'bg-pink-50'
  },
  {
    title: 'Profile & Settings',
    description: 'Perbarui biodata Anda, edit riwayat pendidikan, tambahkan sertifikasi profesional, atau sesuaikan preferensi akun Anda.',
    icon: Settings,
    path: '/dashboard/settings',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  }
];

const UsageGuideSection = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-4 mb-2">
        <h2 className="text-body-lg md:text-subtitle font-bold text-primary-text">Panduan Penggunaan Fitur</h2>
        <p className="text-body-sm text-secondary-text">Pelajari cara memaksimalkan asisten AI di setiap menu dashboard NeoKarir.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDE_ITEMS.map((item, index) => (
          <GuideCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            path={item.path}
            color={item.color}
            bg={item.bg}
          />
        ))}
      </div>
    </div>
  );
};

export default UsageGuideSection;
