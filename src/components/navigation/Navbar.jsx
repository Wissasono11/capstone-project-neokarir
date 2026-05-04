import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
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
          <a href="#home" className="text-[15px] font-medium text-primary-text hover:text-primary transition-colors">Home</a>
          <a href="#works" className="text-[15px] font-medium text-primary-text hover:text-primary transition-colors">How It Works</a>
          <a href="#features" className="text-[15px] font-medium text-primary-text hover:text-primary transition-colors">Features</a>
          <a href="#testimonials" className="text-[15px] font-medium text-primary-text hover:text-primary transition-colors">Testimonials</a>
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/register" className="text-[15px] py-2.5 px-5 rounded-[10px] font-medium text-primary-text hover:text-primary hover:bg-primary/10 transition-colors">Sign Up</Link>
          <Link to="/login">
            <Button variant="primary" className="py-2.5 px-5">Login</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="p-2 text-primary-text hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.div
              className="w-6 h-5 flex flex-col justify-between relative"
            >
              <motion.span 
                className="w-full h-0.5 bg-current rounded-full origin-center"
                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <motion.span 
                className="w-full h-0.5 bg-current rounded-full"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <motion.span 
                className="w-full h-0.5 bg-current rounded-full origin-center"
                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </motion.div>
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
              <a href="#home" onClick={closeMenu} className="text-[15px] font-medium text-primary-text hover:text-primary transition-colors py-2 block">Home</a>
              <a href="#works" onClick={closeMenu} className="text-[15px] font-medium text-primary-text hover:text-primary transition-colors py-2 block">How It Works</a>
              <a href="#features" onClick={closeMenu} className="text-[15px] font-medium text-primary-text hover:text-primary transition-colors py-2 block">Features</a>
              <a href="#testimonials" onClick={closeMenu} className="text-[15px] font-medium text-primary-text hover:text-primary transition-colors py-2 block">Testimonials</a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 mt-2">
                <Link to="/register" onClick={closeMenu} className="text-center py-2.5 px-5 rounded-[10px] font-medium text-primary-text hover:text-primary hover:bg-primary/10 transition-colors border border-gray-200">Sign Up</Link>
                <Link to="/login" onClick={closeMenu} className="w-full">
                  <Button variant="primary" className="w-full justify-center">Login</Button>
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
