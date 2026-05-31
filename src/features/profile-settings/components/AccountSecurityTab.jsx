import React from 'react';
import { Save, CheckCircle, Loader2, Monitor, Smartphone, LogOut, AlertTriangle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import PasswordInput from '../../../components/ui/PasswordInput';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../contexts/LanguageContext';

const AccountSecurityTab = ({ security, updateSecurity, removeSession, onSave, isSaving, saveSuccess }) => {
  const { t } = useLanguage();
  return (
    <div
      role="tabpanel"
      id="tabpanel-security"
      aria-labelledby="tab-security"
      className="space-y-6 animate-fade-in"
    >
      {/* Change Password */}
      <Card className="!p-6 md:!p-8">
        <h3 className="text-body-lg font-bold text-primary-text mb-1">
          {t.profile.changePassword}
        </h3>
        <p className="text-body-sm text-secondary-text mb-6">
          {t.profile.passwordSecDesc}
        </p>

        <div className="space-y-4 max-w-md">
          <PasswordInput
            label={t.profile.currentPassword}
            id="security-current-password"
            placeholder={t.profile.currentPasswordPlaceholder}
            value={security.currentPassword}
            onChange={(e) => updateSecurity('currentPassword', e.target.value)}
          />

          <PasswordInput
            label={t.profile.newPassword}
            id="security-new-password"
            placeholder={t.profile.newPasswordPlaceholder}
            showStrength={true}
            value={security.newPassword}
            onChange={(e) => updateSecurity('newPassword', e.target.value)}
          />

          <PasswordInput
            label={t.profile.confirmPassword}
            id="security-confirm-password"
            placeholder={t.profile.confirmPasswordPlaceholder}
            value={security.confirmPassword}
            onChange={(e) => updateSecurity('confirmPassword', e.target.value)}
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
          <Button
            variant="primary"
            onClick={onSave}
            disabled={isSaving || !security.currentPassword || !security.newPassword || !security.confirmPassword}
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
                {t.profile.updatePassword}
              </>
            )}
          </Button>
          {saveSuccess && (
            <span className="text-caption text-success font-medium animate-fade-in">
              {t.profile.securitySaveSuccess}
            </span>
          )}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="!p-6 md:!p-8 !border-error/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-error-light flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-error" />
          </div>
          <div className="flex-1">
            <h3 className="text-body-lg font-bold text-error mb-1">
              {t.profile.dangerZone}
            </h3>
            <p className="text-body-sm text-secondary-text mb-4">
              {t.profile.dangerZoneDesc}
            </p>
            <Button
              variant="outline"
              className="!border-error !text-error hover:!bg-error-light"
            >
              {t.profile.deleteAccount}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountSecurityTab;
