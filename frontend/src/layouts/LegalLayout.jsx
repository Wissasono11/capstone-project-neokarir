import React from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const LegalLayout = ({ title, lastUpdated, children }) => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-24 ">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </header>
        
        <div className="legal-content space-y-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LegalLayout;
