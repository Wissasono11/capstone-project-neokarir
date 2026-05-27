import React from 'react';
import ContactInfoCard from './ContactInfoCard';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const ContactFormSection = ({
  contactForm,
  handleInputChange,
  formErrors,
  isSubmitting,
  submitSuccess,
  handleSubmit
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Contact Form Card */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm flex flex-col justify-between">
        <div className="space-y-5">
          <div>
            <h2 className="text-body-lg md:text-subtitle font-bold text-primary-text mb-1">Hubungi Layanan Dukungan</h2>
            <p className="text-body-sm text-secondary-text">Kirimkan pesan Anda secara langsung. Tim kami akan segera menindaklanjutinya.</p>
          </div>

          {/* Success Banner */}
          {submitSuccess && (
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-body-sm font-bold">Pesan Berhasil Terkirim!</p>
                <p className="text-caption text-emerald-700/90 leading-tight">
                  Terima kasih atas laporan Anda. Salinan tiket dukungan telah dikirim ke alamat email Anda.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="support-name" className="text-caption font-bold text-secondary-text tracking-wider">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="support-name"
                name="name"
                value={contactForm.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                placeholder="Masukkan nama lengkap Anda"
                className={`w-full px-4 py-3 bg-canvas-white border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-body-sm text-primary-text placeholder-secondary-text/50 ${
                  formErrors.name ? 'border-error focus:ring-error/30' : 'border-border'
                }`}
              />
              {formErrors.name && (
                <p className="text-caption font-semibold text-error flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {formErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="support-email" className="text-caption font-bold text-secondary-text tracking-wider">
                Alamat Email
              </label>
              <input
                type="email"
                id="support-email"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                placeholder="nama@domain.com"
                className={`w-full px-4 py-3 bg-canvas-white border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-body-sm text-primary-text placeholder-secondary-text/50 ${
                  formErrors.email ? 'border-error focus:ring-error/30' : 'border-border'
                }`}
              />
              {formErrors.email && (
                <p className="text-caption font-semibold text-error flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {formErrors.email}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label htmlFor="support-category" className="text-caption font-bold text-secondary-text tracking-wider">
                Kategori Masalah
              </label>
              <select
                id="support-category"
                name="category"
                value={contactForm.category}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-canvas-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-body-sm text-primary-text cursor-pointer appearance-none"
              >
                <option value="question">Pertanyaan Umum</option>
                <option value="bug">Masalah Teknis & Bug</option>
                <option value="feature">Usulan Fitur Baru</option>
                <option value="other">Kategori Lainnya</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="support-message" className="text-caption font-bold text-secondary-text tracking-wider">
                Deskripsi Detail
              </label>
              <textarea
                id="support-message"
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
                rows={4}
                placeholder="Tuliskan pesan Anda secara detail di sini..."
                className={`w-full px-4 py-3 bg-canvas-white border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-body-sm text-primary-text placeholder-secondary-text/50 resize-none ${
                  formErrors.message ? 'border-error focus:ring-error/30' : 'border-border'
                }`}
              />
              {formErrors.message && (
                <p className="text-caption font-semibold text-error flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {formErrors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-6 font-bold text-body-sm rounded-2xl text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting
                  ? 'bg-primary/60 cursor-not-allowed'
                  : 'bg-primary hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Mengirimkan Pesan...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Kirim Pesan Dukungan</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Info Card */}
      <div className="lg:col-span-5">
        <ContactInfoCard />
      </div>
    </div>
  );
};

export default ContactFormSection;
