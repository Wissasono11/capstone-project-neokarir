import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, User } from 'lucide-react';
import { authStaggerVariants, authItemVariants } from '../../../utils/animations';
import { useRegisterForm } from '../hooks/useRegisterForm';
import FormInput from '../../../components/ui/FormInput';
import PasswordInput from '../../../components/ui/PasswordInput';
import Checkbox from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const RegisterForm = () => {
  const {
    form,
    agreeTerms,
    setAgreeTerms,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    clearTermsError,
  } = useRegisterForm();

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
          label="Full Name"
          id="fullName"
          type="text"
          placeholder="Franz Hermann"
          icon={User}
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
          autoComplete="name"
        />
      </motion.div>

      <motion.div variants={authItemVariants}>
        <FormInput
          label="Email Address"
          id="email"
          type="email"
          placeholder="hello@example.com"
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
          placeholder="Create a strong password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          showStrength={true}
          autoComplete="new-password"
        />
      </motion.div>

      <motion.div variants={authItemVariants}>
        <PasswordInput
          label="Confirm Password"
          id="confirmPassword"
          placeholder="Repeat your password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
      </motion.div>

      <motion.div variants={authItemVariants}>
        <Checkbox
          id="agreeTerms"
          checked={agreeTerms}
          onChange={(e) => {
            setAgreeTerms(e.target.checked);
            clearTermsError();
          }}
          label={
            <span>
              I agree to the{' '}
              <Link to="/terms" className="font-medium text-primary hover:text-primary/80 transition-colors underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-primary hover:text-primary/80 transition-colors underline">
                Privacy Policy
              </Link>
            </span>
          }
        />
        {errors.terms && (
          <p className="text-xs text-error mt-1.5">{errors.terms}</p>
        )}
      </motion.div>

      <motion.div variants={authItemVariants}>
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full py-3.5 text-[15px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>
      </motion.div>

      <motion.p variants={authItemVariants} className="text-center text-sm text-secondary-text mt-2">
        Already have an account?{' '}
        <Link 
          to="/login" 
          className="font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Sign in
        </Link>
      </motion.p>
    </motion.form>
  );
};

export default RegisterForm;
