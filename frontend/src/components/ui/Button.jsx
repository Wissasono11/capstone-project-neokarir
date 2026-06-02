import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 spring-transition btn-tactile px-6 py-3';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-bg-secondary text-primary-text hover:bg-bg-secondary/80',
    outline: 'border border-border text-primary-text hover:bg-canvas-white',
    ghost: 'text-secondary-text hover:text-primary hover:bg-bg-secondary',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
