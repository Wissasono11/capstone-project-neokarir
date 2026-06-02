import React from 'react';

const FormInput = ({ 
  label, 
  id, 
  type = 'text', 
  placeholder, 
  error, 
  icon: Icon, 
  className = '', 
  ...rest 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm font-semibold text-primary-text"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`
            w-full rounded-xl border bg-white px-4 py-3 text-sm text-primary-text 
            placeholder:text-secondary-text/60
            transition-all duration-200
            outline-none
            ${Icon ? 'pl-11' : ''}
            ${error 
              ? 'border-error ring-2 ring-error-light' 
              : 'border-border hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/10'
            }
          `}
          {...rest}
        />
      </div>
      {error && (
        <p className="text-xs text-error mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
