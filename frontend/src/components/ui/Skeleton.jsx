import React from 'react';

/**
 * Base Skeleton primitive component.
 * Use this as building blocks for page-specific skeleton layouts.
 *
 * @param {'rectangular'|'circular'|'text'} variant - Shape of the skeleton
 * @param {string} width - CSS width (e.g. '100%', '200px')
 * @param {string} height - CSS height (e.g. '20px', '3rem')
 * @param {string} className - Additional Tailwind classes
 * @param {number} delay - Animation delay in ms for staggered effects
 * @param {string} borderRadius - Custom border radius
 */
const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  delay = 0,
  borderRadius,
  style: externalStyle,
  ...props
}) => {
  const baseStyles = {
    width: width || '100%',
    height: height || (variant === 'text' ? '14px' : variant === 'circular' ? '48px' : '100%'),
    borderRadius:
      borderRadius ||
      (variant === 'circular' ? '50%' : variant === 'text' ? '8px' : '16px'),
    background: 'linear-gradient(90deg, #F1F5F9 25%, #E8EDF3 37%, #F1F5F9 63%)',
    backgroundSize: '200% 100%',
    animation: `shimmer 1.8s ease-in-out infinite`,
    animationDelay: `${delay}ms`,
    ...externalStyle,
  };

  if (variant === 'circular') {
    baseStyles.width = width || height || '48px';
    baseStyles.height = height || width || '48px';
    baseStyles.flexShrink = 0;
  }

  return (
    <div
      className={`${className}`}
      style={baseStyles}
      aria-hidden="true"
      role="presentation"
      {...props}
    />
  );
};

/**
 * SkeletonGroup - Wraps multiple skeletons for staggered animations
 */
const SkeletonGroup = ({ children, className = '', stagger = 80 }) => {
  return (
    <div className={`animate-skeleton-in ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && !child.props.delay) {
          return React.cloneElement(child, { delay: index * stagger });
        }
        return child;
      })}
    </div>
  );
};

/**
 * SkeletonText - Multiple text lines skeleton
 */
const SkeletonText = ({ lines = 3, gap = '10px', lastLineWidth = '60%', className = '' }) => {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? lastLineWidth : '100%'}
          delay={i * 60}
        />
      ))}
    </div>
  );
};

export { Skeleton, SkeletonGroup, SkeletonText };
export default Skeleton;
