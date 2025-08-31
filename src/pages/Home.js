import React from 'react';
import HeroSection  from '../components/home/HeroSection';
import Features from '../components/Features';

const HomePage = () => { 
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <HeroSection />
      <Features/>
    </div>
  );
};

export default HomePage; 