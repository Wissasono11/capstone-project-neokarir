import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../api/authService';
import { useToast } from '../../../contexts/ToastContext';

export const useResetPasswordForm = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(null); // null = loading, true/false = result
  const [countdown, setCountdown] = useState(5);
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // Validasi token saat komponen dimount
  useEffect(() => {
    const validateToken = async () => {
      // Mock token validation - akan diganti dengan real API call nanti
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock: token dianggap valid jika ada dan tidak kosong
      if (token && token.trim().length > 0) {
        setTokenValid(true);
      } else {
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  // Countdown dan auto-redirect setelah reset berhasil
  useEffect(() => {
    if (!isSuccess) return;

    if (countdown <= 0) {
      navigate('/login');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isSuccess, countdown, navigate]);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  }, [errors]);

  const validate = () => {
    const newErrors = {};
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await authService.resetPassword(token, form.password);
      success(response.message || 'Kata sandi berhasil diperbarui. Mengalihkan ke halaman login...');
      setIsSuccess(true);
    } catch (err) {
      error(err.message || 'Gagal memperbarui kata sandi. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    errors,
    isSubmitting,
    isSuccess,
    tokenValid,
    countdown,
    handleChange,
    handleSubmit,
  };
};
