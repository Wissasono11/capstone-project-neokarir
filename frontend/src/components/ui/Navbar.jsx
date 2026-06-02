import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import { navbarVariants } from '../../utils/animations';
import { useScrollDetection } from '../../hooks/useScrollDetection';
import { useMobileMenu } from '../../hooks/useMobileMenu';

const Navbar = () => {
  const scrolled = useScrollDetection(20);
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] py-4' : 'bg-white/80 backdrop-blur-md py-6'}`}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="text-2xl font-bold text-primary tracking-tight">
            NeoKarir
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-body font-medium text-primary-text hover:text-primary transition-colors">Beranda</a>
          <a href="#works" className="text-body font-medium text-primary-text hover:text-primary transition-colors">Cara Kerja</a>
          <a href="#features" className="text-body font-medium text-primary-text hover:text-primary transition-colors">Fitur</a>
          <a href="#testimonials" className="text-body font-medium text-primary-text hover:text-primary transition-colors">Testimoni</a>
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/register" className="text-body py-2.5 px-5 rounded-[10px] font-medium text-primary-text hover:text-primary hover:bg-primary/10 transition-colors">Daftar</Link>
          <Link to="/login">
            <Button variant="primary" className="py-2.5 px-5">Masuk</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 text-primary-text hover:text-primary focus:outline-none flex items-center justify-center w-10 h-10"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? 'open' : 'closed'}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg absolute top-full left-0 w-full"
          >
            <div className="px-6 py-4 flex flex-col space-y-2">
              <a href="#home" onClick={closeMenu} className="text-body font-medium text-primary-text hover:text-primary transition-colors py-2 block">Beranda</a>
              <a href="#works" onClick={closeMenu} className="text-body font-medium text-primary-text hover:text-primary transition-colors py-2 block">Cara Kerja</a>
              <a href="#features" onClick={closeMenu} className="text-body font-medium text-primary-text hover:text-primary transition-colors py-2 block">Fitur</a>
              <a href="#testimonials" onClick={closeMenu} className="text-body font-medium text-primary-text hover:text-primary transition-colors py-2 block">Testimoni</a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 mt-2">
                <Link to="/register" onClick={closeMenu} className="text-center py-2.5 px-5 rounded-[10px] font-medium text-primary-text hover:text-primary hover:bg-primary/10 transition-colors border border-gray-200">Daftar</Link>
                <Link to="/login" onClick={closeMenu} className="w-full">
                  <Button variant="primary" className="w-full justify-center">Masuk</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
