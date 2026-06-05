import { useState, useEffect, useRef, useCallback } from 'react';
import { authService } from '../api/authService';
import { useToast } from '../../../contexts/ToastContext';

/**
 * Extracts the remaining seconds from a Supabase rate-limit error message.
 * Example: "For security purposes, you can only request this after 54 seconds."
 * Returns the parsed number or 60 as a safe fallback.
 */
const parseRateLimitSeconds = (message) => {
  const match = message?.match(/after\s+(\d+)\s+second/i);
  return match ? parseInt(match[1], 10) : 60;
};

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);
  const { success, error } = useToast();

  // Countdown timer effect
  useEffect(() => {
    if (cooldown <= 0) return;

    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(cooldownRef.current);
  }, [cooldown]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  const startCooldown = useCallback((seconds) => {
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    setCooldown(seconds);
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({});
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await authService.forgotPassword(email);
      success(response.message || 'Link pemulihan kata sandi telah dikirim.');
      setIsSuccess(true);
      // Start cooldown after successful send to prevent rapid re-sends
      startCooldown(60);
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message || '';

      // Detect Supabase rate-limit error and start cooldown
      if (errMsg.toLowerCase().includes('security purposes') || errMsg.toLowerCase().includes('after') && errMsg.toLowerCase().includes('second')) {
        const seconds = parseRateLimitSeconds(errMsg);
        startCooldown(seconds);
        error(`Mohon tunggu ${seconds} detik sebelum mengirim ulang.`);
      } else {
        error(errMsg || 'Gagal mengirim email pemulihan. Silakan coba kembali.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setErrors({});
    setIsSuccess(false);
  };

  return {
    email,
    errors,
    isSubmitting,
    isSuccess,
    cooldown,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
