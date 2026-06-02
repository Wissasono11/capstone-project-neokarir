import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';
import { authStaggerVariants, authItemVariants } from '../../../utils/animations';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';
import PasswordInput from '../../../components/ui/PasswordInput';
import Button from '../../../components/ui/Button';

const ResetPasswordForm = () => {
  const {
    form,
    errors,
    isSubmitting,
    isSuccess,
    tokenValid,
    countdown,
    handleChange,
    handleSubmit,
  } = useResetPasswordForm();

  /* ── Loading State (Validasi Token) ── */
  if (tokenValid === null) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-8 h-8 text-primary" />
        </motion.div>
        <p className="text-sm text-secondary-text">Memverifikasi link reset...</p>
      </motion.div>
    );
  }

  /* ── Invalid Token State ── */
  if (tokenValid === false) {
    return (
      <motion.div
        variants={authStaggerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center gap-4"
      >
        <motion.div 
          variants={authItemVariants}
          className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-2"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </motion.div>
        </motion.div>

        <motion.h2 
          variants={authItemVariants}
          className="text-lg font-bold text-primary-text"
        >
          Link Tidak Valid
        </motion.h2>

        <motion.p 
          variants={authItemVariants}
          className="text-sm text-secondary-text leading-relaxed max-w-sm"
        >
          Link reset password yang Anda gunakan tidak valid atau sudah kedaluwarsa. 
          Silakan minta link reset baru.
        </motion.p>

        <motion.div variants={authItemVariants} className="w-full mt-2 flex flex-col gap-3">
          <Link to="/forgot-password">
            <Button variant="primary" className="w-full py-3.5 text-body">
              Minta Link Baru
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" className="w-full py-3 text-body">
              <ArrowLeft size={16} className="mr-2" />
              Kembali ke Login
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        /* ── Success State ── */
        <motion.div
          key="success"
          variants={authStaggerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex flex-col items-center text-center gap-4"
        >
          <motion.div 
            variants={authItemVariants}
            className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </motion.div>
          </motion.div>

          <motion.h2 
            variants={authItemVariants}
            className="text-lg font-bold text-primary-text"
          >
            Password Berhasil Diubah!
          </motion.h2>

          <motion.p 
            variants={authItemVariants}
            className="text-sm text-secondary-text leading-relaxed max-w-sm"
          >
            Password Anda telah berhasil diperbarui. Anda akan dialihkan ke halaman login dalam{' '}
            <span className="font-semibold text-primary">{countdown} detik</span>.
          </motion.p>

          <motion.div variants={authItemVariants} className="w-full mt-2">
            <Link to="/login">
              <Button variant="primary" className="w-full py-3.5 text-body">
                <ArrowLeft size={16} className="mr-2" />
                Masuk Sekarang
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        /* ── Form State ── */
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          variants={authStaggerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex flex-col gap-5"
        >
          <motion.p 
            variants={authItemVariants} 
            className="text-sm text-secondary-text leading-relaxed -mt-2 mb-1"
          >
            Buat password baru untuk akun Anda. Pastikan password yang kuat dan mudah diingat.
          </motion.p>

          <motion.div variants={authItemVariants}>
            <PasswordInput
              label="Password Baru"
              id="password"
              placeholder="Minimal 8 karakter"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              showStrength={true}
              autoComplete="new-password"
            />
          </motion.div>

          <motion.div variants={authItemVariants}>
            <PasswordInput
              label="Konfirmasi Password Baru"
              id="confirmPassword"
              placeholder="Ulangi password baru"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
          </motion.div>

          <motion.div variants={authItemVariants}>
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full py-3.5 text-body"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : 'Atur Ulang Password'}
            </Button>
          </motion.div>

          <motion.p 
            variants={authItemVariants} 
            className="text-center text-sm text-secondary-text mt-2"
          >
            Ingat password Anda?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Masuk
            </Link>
          </motion.p>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default ResetPasswordForm;
