import React from 'react';

const StatCard = ({ icon: Icon, title, iconBgColor = 'bg-bg-secondary', iconColor = 'text-primary', children }) => {
  return (
    <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-2xl ${iconBgColor} flex items-center justify-center overflow-hidden`}>
          {typeof Icon === 'string' ? (
            <img src={Icon} alt={title} className="w-full h-full object-cover" />
          ) : (
            <Icon size={24} className={iconColor} />
          )}
        </div>
        <h3 className="font-bold text-primary-text text-body-lg md:text-subtitle">{title}</h3>
      </div>
      <div className="flex-1 flex flex-col justify-start">
        {children}
      </div>
    </div>
  );
};


export default StatCard;
