import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authFormVariants, navbarVariants } from '../utils/animations';
import logo from '../assets/images/logo.png';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-canvas-white flex flex-col">
      {/* Auth Navbar */}
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md py-6"
      >
        <div className="max-w-[1280px] mx-auto px-6 flex justify-start items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary tracking-tight">
              NeoKarir
            </span>
          </Link>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 pt-28">
        <motion.div
          variants={authFormVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[460px]"
        >
          {/* Form Content */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
            {/* Header */}
            <div className="mb-2 flex items-center justify-center">
              <div className="inline-flex items-center gap-1 mb-2 group">
                <img
                  src={logo}
                  alt="NeoKarir Logo"
                  className="h-14 w-auto"
                />
              </div>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-heading font-bold text-primary-text tracking-tight mb-2">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-secondary-text leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AuthLayout;
