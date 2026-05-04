import React from 'react';
import { Target, Award, Briefcase, FileText, Globe, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
  const links = [
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Target, path: '/dashboard/skill-gap', color: 'text-primary', bg: 'bg-primary/10' },
    { id: 'recommendation', label: 'Career Recommendation', icon: Award, path: '/dashboard/recommendations', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'jobs-match', label: 'Jobs Match Score', icon: Briefcase, path: '/dashboard/jobs-match', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'cv-analyzer', label: 'CV Analyzer', icon: FileText, path: '/dashboard/cv-analyzer', color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'jobs-market', label: 'Jobs Market', icon: Globe, path: '/dashboard/jobs-market', color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, path: '/dashboard/ai-assistant', color: 'text-pink-500', bg: 'bg-pink-50' },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-border p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-[17px] font-bold text-primary-text mb-6">Quick Links</h3>
      
      <div className="flex-1 grid grid-cols-2 gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.id} 
              to={link.path}
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-bg-secondary/30 transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${link.bg}`}>
                <Icon size={20} className={link.color} />
              </div>
              <span className="text-[13px] font-semibold text-secondary-text group-hover:text-primary-text leading-tight">
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
