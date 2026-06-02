import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold text-primary tracking-tight mb-4">NeoKarir</div>
            <p className="text-sm text-secondary-text leading-relaxed">
              Karier Masa Depan Anda, Dibentuk oleh AI. Temukan potensi tersembunyi Anda dan raih posisi impian Anda dengan panduan berbasis data.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-semibold text-primary-text uppercase tracking-widest mb-6">Menu Utama</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-sm text-secondary-text hover:text-primary transition-colors">Beranda</a></li>
              <li><a href="#works" className="text-sm text-secondary-text hover:text-primary transition-colors">Cara Kerja</a></li>
              <li><a href="#features" className="text-sm text-secondary-text hover:text-primary transition-colors">Fitur</a></li>
              <li><a href="#testimonials" className="text-sm text-secondary-text hover:text-primary transition-colors">Testimoni</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-text uppercase tracking-widest mb-6">Tentang</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-sm text-secondary-text hover:text-primary transition-colors">Tentang</a></li>
              <li><a href="#careers" className="text-sm text-secondary-text hover:text-primary transition-colors">Karier</a></li>
              <li><a href="#blog" className="text-sm text-secondary-text hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-text uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-sm text-secondary-text hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
              <li><Link to="/terms" className="text-sm text-secondary-text hover:text-primary transition-colors">Syarat Layanan</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-secondary-text"> © 2026 NeoKarir. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
