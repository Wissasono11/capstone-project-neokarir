import React from 'react';

const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-primary-light text-primary',
    secondary: 'bg-bg-secondary text-secondary-text',
    white: 'bg-white text-primary-text shadow-sm',
  };

  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
