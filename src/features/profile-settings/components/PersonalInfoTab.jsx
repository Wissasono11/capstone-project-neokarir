import React from 'react';
import { Save, CheckCircle, Loader2 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import FormInput from '../../../components/ui/FormInput';
import Button from '../../../components/ui/Button';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const PersonalInfoTab = ({ personalInfo, updatePersonalInfo, onSave, isSaving, saveSuccess }) => {
  const { t } = useLanguage();
  return (
    <div
      role="tabpanel"
      id="tabpanel-personal"
      aria-labelledby="tab-personal"
      className="animate-fade-in"
    >
      <Card className="!p-6 md:!p-8">
        <h3 className="text-body-lg font-bold text-primary-text mb-1">
          {t.profile.personalInfo}
        </h3>
        <p className="text-body-sm text-secondary-text mb-6">
          {t.profile.personalInfoSub}
        </p>

        {/* Two-column form layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput
            label={t.profile.fullName}
            id="profile-fullname"
            placeholder={t.profile.fullNamePlaceholder}
            icon={User}
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
          />

          <FormInput
            label={t.profile.email}
            id="profile-email"
            type="email"
            placeholder="email@example.com"
            icon={Mail}
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
          />

          <FormInput
            label={t.profile.phone}
            id="profile-phone"
            type="tel"
            placeholder="+62 812-xxxx-xxxx"
            icon={Phone}
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
          />

          <FormInput
            label={t.profile.dateOfBirth}
            id="profile-dob"
            type="date"
            icon={Calendar}
            value={personalInfo.dateOfBirth}
            onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
          />

          {/* Gender select */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="profile-gender"
              className="text-sm font-semibold text-primary-text"
            >
              {t.profile.gender}
            </label>
            <select
              id="profile-gender"
              value={personalInfo.gender}
              onChange={(e) => updatePersonalInfo('gender', e.target.value)}
              className="
                w-full rounded-xl border bg-white px-4 py-3 text-sm text-primary-text
                transition-all duration-200 outline-none appearance-none cursor-pointer
                border-border hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/10
              "
            >
              <option value="male">{t.profile.genderMale}</option>
              <option value="female">{t.profile.genderFemale}</option>
              <option value="other">{t.profile.genderOther}</option>
              <option value="prefer-not-to-say">{t.profile.genderPreferNotToSay}</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
          <Button
            variant="primary"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                {t.common.saving}
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle size={16} className="mr-2" />
                {t.common.saved}
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                {t.profile.saveChanges}
              </>
            )}
          </Button>
          {saveSuccess && (
            <span className="text-caption text-success font-medium animate-fade-in">
              {t.profile.personalSaveSuccess}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PersonalInfoTab;
