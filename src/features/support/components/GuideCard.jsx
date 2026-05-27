import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Icon as Iconify } from '@iconify/react';

const GuideCard = ({ title, description, icon: Icon, path, color, bg }) => {
  return (
    <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col justify-between group hover:border-primary/40 hover:shadow-md transition-all duration-300">
      <div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0 ${bg}`}>
          {typeof Icon === 'string' ? (
            <Iconify icon={Icon} width={24} height={24} className={color} />
          ) : (
            <Icon size={24} className={color} />
          )}
        </div>

        <h3 className="font-bold text-primary-text text-body md:text-body-lg mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-body-sm text-secondary-text leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <Link
        to={path}
        className="inline-flex items-center gap-1.5 text-body-sm font-bold text-primary hover:text-indigo-700 transition-colors cursor-pointer group/link"
      >
        <span>Pelajari Fitur</span>
        <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-1" />
      </Link>
    </div>
  );
};

export default GuideCard;
