import { useState } from 'react';

/**
 * useSupport — Custom hook untuk mengelola state halaman Support.
 * Mengapa hook terpisah: Memisahkan logika bisnis dari presentasi,
 * konsisten dengan pola hook lain di codebase (useDashboardData, useSkillGap, dll).
 */
export const useSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: 'question',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleFAQ = (index) => {
    setExpandedFAQ(prev => prev === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));

    // Hapus error saat user mengetik kembali
    if (formErrors[name]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!contactForm.name.trim()) {
      errors.name = 'Nama lengkap wajib diisi';
    }

    if (!contactForm.email.trim()) {
      errors.email = 'Alamat email wajib diisi';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactForm.email)) {
        errors.email = 'Format email tidak valid';
      }
    }

    if (!contactForm.message.trim()) {
      errors.message = 'Pesan wajib diisi';
    } else if (contactForm.message.trim().length < 10) {
      errors.message = 'Pesan minimal 10 karakter';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Simulasi submit — belum terhubung API backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setContactForm({ name: '', email: '', category: 'question', message: '' });

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return {
    activeTab,
    setActiveTab,
    expandedFAQ,
    toggleFAQ,
    searchQuery,
    setSearchQuery,
    contactForm,
    handleInputChange,
    formErrors,
    isSubmitting,
    submitSuccess,
    handleSubmit
  };
};
