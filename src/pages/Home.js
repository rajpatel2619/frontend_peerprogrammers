import React from 'react';
import HeroSection  from '../components/home/HeroSection';
import CTASection from '../components/home/CTASection';
import CourseTabs from '../components/home/CourseTabs';

const HomePage = () => { // Note: Capitalized component name
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <HeroSection />
      <CTASection />
      <CourseTabs />
    </div>
  );
};

export default HomePage; // Note: Capitalized component name