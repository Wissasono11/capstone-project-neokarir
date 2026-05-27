import React from 'react';
import { Mail, Clock, ShieldAlert } from 'lucide-react';
import { Icon as Iconify } from '@iconify/react';

const ContactInfoCard = () => {
  return (
    <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm space-y-6 h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-primary-text text-body-lg mb-1">Informasi Kontak</h3>
          <p className="text-body-sm text-secondary-text">Hubungi kami melalui kanal resmi berikut untuk respon cepat.</p>
        </div>

        {/* Contact list */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-primary shrink-0">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-caption font-bold text-secondary-text  tracking-wider">Email Dukungan</p>
              <a href="mailto:support@neokarir.ai" className="text-body-sm font-semibold text-primary-text hover:text-primary transition-colors">
                support@neokarir.ai
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-caption font-bold text-secondary-text tracking-wider">Jam Operasional</p>
              <p className="text-body-sm font-semibold text-primary-text leading-tight">
                Senin - Jumat | 09.00 - 17.00 WIB
              </p>
              <p className="text-caption text-secondary-text mt-0.5">Respons maksimal 1x24 jam kerja</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
              <ShieldAlert size={16} />
            </div>
            <div>
              <p className="text-caption font-bold text-secondary-text tracking-wider">Keamanan & Privasi</p>
              <p className="text-caption font-medium text-secondary-text leading-relaxed">
                Setiap laporan masalah keamanan akan kami prioritaskan dalam waktu 1 jam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="border-t border-border/60 pt-6">
        <p className="text-caption font-bold text-secondary-text uppercase tracking-wider mb-3">Ikuti NeoKarir</p>
        <div className="flex items-center gap-3">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary-text hover:text-primary hover:border-primary/30 hover:bg-bg-secondary/30 transition-all cursor-pointer"
            title="LinkedIn"
          >
            <Iconify icon="mdi:linkedin" width={18} height={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary-text hover:text-primary hover:border-primary/30 hover:bg-bg-secondary/30 transition-all cursor-pointer"
            title="Twitter / X"
          >
            <Iconify icon="ri:twitter-x-fill" width={18} height={18} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary-text hover:text-primary hover:border-primary/30 hover:bg-bg-secondary/30 transition-all cursor-pointer"
            title="GitHub"
          >
            <Iconify icon="mdi:github" width={18} height={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
