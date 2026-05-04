import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { profilingResultVariants } from '../../../animations/variants';
import Button from '../../../components/ui/Button';

const ProfilingCTA = () => {
  return (
    <motion.div 
      variants={profilingResultVariants}
      className="bg-primary-text rounded-2xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div>
        <h3 className="text-2xl font-bold mb-2">Ready to take the next step?</h3>
        <p className="text-secondary-text">Explore your full personalized dashboard to see detailed insights and apply for matched jobs.</p>
      </div>
      
      <Link to="/dashboard">
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-4 font-bold text-lg inline-flex items-center gap-2 group whitespace-nowrap">
          Explore Dashboard 
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </motion.div>
  );
};

export default ProfilingCTA;
