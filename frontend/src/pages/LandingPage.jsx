import React, { lazy, Suspense } from 'react';
import LandingLayout from '../layouts/LandingLayout';
import HeroSection from '../features/landing/components/HeroSection';
import TrustBar from '../features/landing/components/TrustBar';

// Lazy loaded below-the-fold sections to prevent blocking the initial Hero rendering
const HowItWorksSection = lazy(() => import('../features/landing/components/HowItWorksSection'));
const ProblemSection = lazy(() => import('../features/landing/components/ProblemSection'));
const FeaturesSection = lazy(() => import('../features/landing/components/FeaturesSection'));
const TestimonialSection = lazy(() => import('../features/landing/components/TestimonialSection'));
const CTASection = lazy(() => import('../features/landing/components/CTASection'));

const LandingPage = () => {
  return (
    <LandingLayout>
      <HeroSection />
      <TrustBar />
      <Suspense fallback={<div className="py-12 text-center text-secondary-text animate-pulse">Memuat konten...</div>}>
        <HowItWorksSection />
        <ProblemSection />
        <FeaturesSection />
        <TestimonialSection />
        <CTASection />
      </Suspense>
    </LandingLayout>
  );
};

export default LandingPage;
