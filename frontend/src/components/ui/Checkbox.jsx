import React from 'react';
import { Check } from 'lucide-react';

const Checkbox = ({ id, label, checked, onChange, className = '' }) => {
  return (
    <label 
      htmlFor={id} 
      className={`inline-flex items-start gap-2.5 cursor-pointer select-none group ${className}`}
    >
      <div className="relative mt-0.5 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div 
          className={`
            w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center
            transition-all duration-200
            ${checked 
              ? 'bg-primary border-primary' 
              : 'bg-white border-border group-hover:border-primary/40'
            }
          `}
        >
          {checked && <Check size={12} className="text-white" strokeWidth={3} />}
        </div>
      </div>
      {label && (
        <span className="text-sm text-secondary-text leading-snug">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;
