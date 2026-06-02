import { useState } from 'react';
import { authService } from '../api/authService';
import { useToast } from '../../../contexts/ToastContext';

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { success, error } = useToast();

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
    } catch (err) {
      error(err.message || 'Gagal mengirim email pemulihan. Silakan coba kembali.');
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
    handleChange,
    handleSubmit,
    handleReset,
  };
};
