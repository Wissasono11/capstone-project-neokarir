import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { profilingResultVariants } from '../../../utils/animations';
import Button from '../../../components/ui/Button';

const ProfilingCTA = () => {
  const { completeOnboarding } = useAuth();

  return (
    <motion.div 
      variants={profilingResultVariants}
      className="bg-primary-text rounded-2xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div>
        <h3 className="text-2xl font-bold mb-2">Siap untuk melangkah ke tahap berikutnya?</h3>
        <p className="text-secondary-text">Jelajahi dasbor personalisasi lengkap Anda untuk melihat wawasan terperinci dan pekerjaan yang cocok.</p>
      </div>
      
      <Link to="/dashboard" state={{ fromOnboarding: true }} onClick={() => completeOnboarding()}>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-4 font-bold text-lg inline-flex items-center gap-2 group whitespace-nowrap">
          Eksplorasi Dashboard 🚀
        </Button>
      </Link>
    </motion.div>
  );
};

export default ProfilingCTA;
