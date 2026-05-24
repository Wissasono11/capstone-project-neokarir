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

      {/* Two-Factor Authentication */}
      <Card className="!p-6 md:!p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-body-lg font-bold text-primary-text mb-1">
              Autentikasi Dua Faktor (2FA)
            </h3>
            <p className="text-body-sm text-secondary-text">
              Tambahkan lapisan keamanan ekstra ke akun kamu.
            </p>
          </div>

          {/* Toggle Switch */}
          <button
            role="switch"
            aria-checked={security.twoFactorEnabled}
            aria-label="Toggle autentikasi dua faktor"
            onClick={() => updateSecurity('twoFactorEnabled', !security.twoFactorEnabled)}
            className={`
              relative inline-flex h-7 w-12 items-center rounded-full
              transition-colors duration-300 shrink-0
              ${security.twoFactorEnabled ? 'bg-primary' : 'bg-border'}
            `}
          >
            <span
              className={`
                inline-block h-5 w-5 rounded-full bg-white shadow-sm
                transform transition-transform duration-300
                ${security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {security.twoFactorEnabled && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <p className="text-body-sm text-emerald-700 font-medium">
              ✅ 2FA aktif. Akun kamu dilindungi dengan autentikasi dua faktor.
            </p>
          </div>
        )}
      </Card>

      {/* Active Sessions */}
      <Card className="!p-6 md:!p-8">
        <h3 className="text-body-lg font-bold text-primary-text mb-1">
          Sesi Aktif
        </h3>
        <p className="text-body-sm text-secondary-text mb-4">
          Perangkat yang sedang masuk ke akun kamu.
        </p>

        <div className="space-y-3">
          {security.sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 rounded-xl bg-canvas-white border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bg-secondary flex items-center justify-center shrink-0">
                  {session.device.includes('Chrome') || session.device.includes('Firefox') ? (
                    <Monitor size={18} className="text-secondary-text" />
                  ) : (
                    <Smartphone size={18} className="text-secondary-text" />
                  )}
                </div>
                <div>
                  <p className="text-body-sm font-medium text-primary-text">{session.device}</p>
                  <p className="text-caption text-secondary-text">
                    {session.location} • {session.lastActive}
                  </p>
                </div>
              </div>

              {session.isCurrent ? (
                <span className="text-caption font-semibold text-primary px-3 py-1 rounded-full bg-primary-light">
                  Perangkat ini
                </span>
              ) : (
                <button
                  onClick={() => removeSession(session.id)}
                  className="flex items-center gap-1.5 text-caption font-medium text-error hover:text-error/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-error-light"
                  aria-label={`Logout dari ${session.device}`}
                >
                  <LogOut size={14} />
                  Logout
                </button>
              )}
            </div>
          ))}
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
