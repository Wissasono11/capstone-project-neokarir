import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-pure-surface rounded-[24px] border border-border shadow-sm p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
