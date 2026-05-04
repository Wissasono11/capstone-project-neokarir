import React from 'react';
import Card from '../../../components/ui/Card';
import Avatar from '../../../components/ui/Avatar';

const TestimonialCard = ({ company, companyIcon, quote, name, role, avatar }) => {
  return (
    <Card className="flex flex-col shrink-0 w-[85vw] md:w-[480px] snap-center p-8 md:p-10 hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="flex items-center gap-3 mb-8 text-primary-text font-bold text-xl md:text-2xl">
        {companyIcon}
        {company}
      </div>

      <p className="text-secondary-text leading-relaxed mb-10 grow text-base md:text-lg">
        {quote}
      </p>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/40">
        <div className="flex items-center gap-4">
          <Avatar src={avatar} alt={name} size="md" className="border-border border shadow-sm" />
          <div>
            <h4 className="text-sm font-bold text-primary-text">{name}</h4>
            <p className="text-xs text-secondary-text mt-0.5">{role}</p>
          </div>
        </div>
        <div className="flex text-strength-medium">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
