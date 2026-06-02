import { Target, Award, FileText, MessageSquareMore, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Icon as Iconify } from '@iconify/react';

const QuickLinks = () => {
  const links = [
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Target, path: '/dashboard/skill-gap', color: 'text-primary', bg: 'bg-primary/10' },
    { id: 'recommendation', label: 'Career Recommendation', icon: Award, path: '/dashboard/recommendations', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'cv-analyzer', label: 'CV Analyzer', icon: FileText, path: '/dashboard/cv-analyzer', color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'jobs-market', label: 'Jobs Market', icon: "mingcute:presentation-1-line", path: '/dashboard/jobs-market', color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: MessageSquareMore, path: '/dashboard/ai-assistant', color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 'settings', label: 'Profile & Settings', icon: Settings, path: '/dashboard/settings', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-border p-4 md:p-8 shadow-sm h-full flex flex-col">
      <h3 className="text-body md:text-subtitle font-bold text-primary-text mb-5 md:mb-6">Akses Cepat</h3>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.id} 
              to={link.path}
              className="flex items-center gap-2.5 md:gap-3 p-3 rounded-2xl border border-border hover:border-primary/40 hover:bg-bg-secondary/30 transition-all group min-w-0"
            >
              <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 ${link.bg}`}>
                {typeof Icon === 'string' ? (
                  <Iconify icon={Icon} width={18} height={18} className={link.color} />
                ) : (
                  <Icon size={18} className={link.color} />
                )}
              </div>
              <span className="text-caption md:text-body-sm font-semibold text-secondary-text group-hover:text-primary-text leading-tight truncate">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;
