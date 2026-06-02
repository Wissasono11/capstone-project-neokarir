import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { authStaggerVariants, authItemVariants } from '../../../utils/animations';
import { useLoginForm } from '../hooks/useLoginForm';
import FormInput from '../../../components/ui/FormInput';
import PasswordInput from '../../../components/ui/PasswordInput';
import Checkbox from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const LoginForm = () => {
  const {
    form,
    remember,
    setRemember,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <motion.form 
      onSubmit={handleSubmit}
      variants={authStaggerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5"
    >
      <motion.div variants={authItemVariants}>
        <FormInput
          label="Alamat Email"
          id="email"
          type="email"
          placeholder="halo@example.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />
      </motion.div>

      <motion.div variants={authItemVariants}>
        <PasswordInput
          label="Password"
          id="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />
      </motion.div>

      <motion.div variants={authItemVariants} className="flex items-center justify-between">
        <Checkbox
          id="remember"
          label="Ingat saya"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <Link 
          to="/forgot-password" 
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Lupa password?
        </Link>
      </motion.div>

      <motion.div variants={authItemVariants}>
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full py-3.5 text-body"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Masuk...' : 'Masuk'}
        </Button>
      </motion.div>

      <motion.p variants={authItemVariants} className="text-center text-sm text-secondary-text mt-2">
        Belum punya akun?{' '}
        <Link 
          to="/register" 
          className="font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Daftar
        </Link>
      </motion.p>
    </motion.form>
  );
};

export default LoginForm;
