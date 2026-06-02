import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

const getStrength = (password) => {
  if (!password) return { level: 0, label: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: 'Weak' };
  if (score <= 2) return { level: 2, label: 'Medium' };
  return { level: 3, label: 'Strong' };
};

const strengthColors = {
  1: 'bg-strength-weak',
  2: 'bg-strength-medium',
  3: 'bg-strength-strong',
};

const strengthTextColors = {
  1: 'text-strength-weak',
  2: 'text-strength-medium',
  3: 'text-strength-strong',
};

const PasswordInput = ({ 
  label, 
  id, 
  error, 
  showStrength = false, 
  value,
  className = '', 
  ...rest 
}) => {
  const [visible, setVisible] = useState(false);
  const strength = useMemo(() => getStrength(value || ''), [value]);

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
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none">
          <Lock size={18} />
        </div>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          className={`
            w-full rounded-xl border bg-white pl-11 py-3 pr-12 text-sm text-primary-text
            placeholder:text-secondary-text/60
            transition-all duration-200
            outline-none
            ${error 
              ? 'border-error ring-2 ring-error-light' 
              : 'border-border hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/10'
            }
          `}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary-text transition-colors"
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {showStrength && value && (
        <div className="flex items-center gap-2 mt-1">
          <div className="flex gap-1 grow">
            {[1, 2, 3].map((seg) => (
              <div
                key={seg}
                className={`h-1 rounded-full grow transition-colors duration-300 ${
                  seg <= strength.level
                    ? strengthColors[strength.level]
                    : 'bg-border'
                }`}
              />
            ))}
          </div>
          <span className={`text-xs font-medium ${strengthTextColors[strength.level] || 'text-secondary-text'}`}>
            {strength.label}
          </span>
        </div>
      )}

      {error && (
        <p className="text-xs text-error mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
