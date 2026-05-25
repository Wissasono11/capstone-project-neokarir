import React from 'react';

const Avatar = ({ src, alt, fallback, size = 'md', className = '', ...props }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-bg-secondary border-2 border-white ${sizes[size]} ${className}`}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <span className="font-medium text-secondary-text">{fallback || 'U'}</span>
      )}
    </div>
  );
};

export default Avatar;
