import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
};

const bgColors = {
  success: 'border-emerald-100 bg-white shadow-emerald-500/5',
  error: 'border-rose-100 bg-white shadow-rose-500/5',
  warning: 'border-amber-100 bg-white shadow-amber-500/5',
  info: 'border-sky-100 bg-white shadow-sky-500/5',
};

const ToastItem = ({ id, message, type, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg pointer-events-auto min-w-[280px] max-w-[400px] ${bgColors[type]}`}
    >
      {icons[type]}
      <div className="flex-1 text-sm font-semibold text-slate-800 pr-2 pt-0.5 break-words">
        {message}
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-slate-450 hover:text-slate-700 transition-colors p-0.5 rounded-lg hover:bg-slate-100 shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none w-full max-w-[400px] px-4 md:px-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
