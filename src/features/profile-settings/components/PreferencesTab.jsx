import React from 'react';
import { Save, CheckCircle, Loader2, Globe, ChevronDown } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../contexts/LanguageContext';

const ToggleRow = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <div className="pr-4">
      <p className="text-body-sm font-medium text-primary-text">{label}</p>
      {description && (
        <p className="text-caption text-secondary-text mt-0.5">{description}</p>
      )}
    </div>
    <button
      role="switch"
      aria-checked={checked}
      aria-label={`Toggle ${label}`}
      onClick={onChange}
      className={`
        relative inline-flex h-7 w-12 items-center rounded-full
        transition-colors duration-300 shrink-0
        ${checked ? 'bg-primary' : 'bg-border'}
      `}
    >
      <span
        className={`
          inline-block h-5 w-5 rounded-full bg-white shadow-sm
          transform transition-transform duration-300
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  </div>
);

const ThemeOption = ({ icon: Icon, label, value, selected, onChange }) => (
  <button
    onClick={() => onChange(value)}
    className={`
      flex flex-col items-center gap-2 p-4 rounded-xl border-2
      transition-all duration-200 cursor-pointer flex-1 min-w-[100px]
      ${selected
        ? 'border-primary bg-primary-light'
        : 'border-border bg-white hover:border-primary/30'
      }
    `}
    aria-pressed={selected}
    aria-label={`Tema ${label}`}
  >
    <Icon
      size={24}
      className={selected ? 'text-primary' : 'text-secondary-text'}
    />
    <span className={`text-body-sm font-medium ${selected ? 'text-primary' : 'text-secondary-text'}`}>
      {label}
    </span>
  </button>
);

const PreferencesTab = ({ preferences, updatePreferences, onSave, isSaving, saveSuccess }) => {
  const { t } = useLanguage();

  return (
    <div
      role="tabpanel"
      id="tabpanel-preferences"
      aria-labelledby="tab-preferences"
      className="space-y-6 animate-fade-in"
    >

      {/* Language Selection */}
      <Card className="!p-6 md:!p-8">
        <div className="flex items-center gap-2 mb-1">
          <Globe size={20} className="text-primary" />
          <h3 className="text-body-lg font-bold text-primary-text">
            {t.profile.language}
          </h3>
        </div>
        <p className="text-body-sm text-secondary-text mb-4">
          {t.profile.languageDesc}
        </p>

        <div className="relative w-full max-w-xs">
          <select
            id="pref-language"
            value={preferences.language}
            onChange={(e) => updatePreferences('language', e.target.value)}
            className="
              w-full rounded-xl border bg-white pl-4 pr-10 py-3 text-sm text-primary-text
              transition-all duration-200 outline-none appearance-none cursor-pointer
              border-border hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/10
            "
          >
            <option value="id">🇮🇩 Bahasa Indonesia</option>
            <option value="en">🇬🇧 English</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-secondary-text">
            <ChevronDown size={18} />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              {t.profile.savingPreferences}
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle size={16} className="mr-2" />
              {t.profile.saved}
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              {t.profile.savePreferences}
            </>
          )}
        </Button>
        {saveSuccess && (
          <span className="text-caption text-success font-medium animate-fade-in">
            {t.profile.saveSuccess}
          </span>
        )}
      </div>
    </div>
  );
};

export default PreferencesTab;
