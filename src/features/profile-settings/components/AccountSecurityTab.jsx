import React from 'react';
import { Save, CheckCircle, Loader2, Monitor, Smartphone, LogOut, AlertTriangle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import PasswordInput from '../../../components/ui/PasswordInput';
import Button from '../../../components/ui/Button';

const AccountSecurityTab = ({ security, updateSecurity, removeSession, onSave, isSaving, saveSuccess }) => {
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
          Ubah Password
        </h3>
        <p className="text-body-sm text-secondary-text mb-6">
          Pastikan password baru kamu kuat dan unik untuk keamanan akun.
        </p>

        <div className="space-y-4 max-w-md">
          <PasswordInput
            label="Password Saat Ini"
            id="security-current-password"
            placeholder="Masukkan password saat ini"
            value={security.currentPassword}
            onChange={(e) => updateSecurity('currentPassword', e.target.value)}
          />

          <PasswordInput
            label="Password Baru"
            id="security-new-password"
            placeholder="Masukkan password baru"
            showStrength={true}
            value={security.newPassword}
            onChange={(e) => updateSecurity('newPassword', e.target.value)}
          />

          <PasswordInput
            label="Konfirmasi Password Baru"
            id="security-confirm-password"
            placeholder="Ulangi password baru"
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
                Menyimpan...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle size={16} className="mr-2" />
                Tersimpan!
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Update Password
              </>
            )}
          </Button>
          {saveSuccess && (
            <span className="text-caption text-success font-medium animate-fade-in">
              Password berhasil diperbarui
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
              Zona Berbahaya
            </h3>
            <p className="text-body-sm text-secondary-text mb-4">
              Menghapus akun akan menghilangkan semua data, termasuk profil karir, hasil analisis AI, dan riwayat aktivitas. Tindakan ini tidak dapat dibatalkan.
            </p>
            <Button
              variant="outline"
              className="!border-error !text-error hover:!bg-error-light"
            >
              Hapus Akun Saya
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountSecurityTab;
