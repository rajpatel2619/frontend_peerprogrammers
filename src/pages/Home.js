import React from 'react';
import HeroSection  from '../components/home/HeroSection';
import CTASection from '../components/home/CTASection';


import FAQs from '../components/home/FAQs';

import Features from '../components/Features';


const HomePage = () => { // Note: Capitalized component name
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <HeroSection />


      <CTASection />
      {/* <CourseCard /> */}
      {/* <CourseTabs /> */}
      <FAQs />


      <Features/>
      {/* <CTASection /> */}
      {/* <CourseCard /> */}
      {/* <CourseTabs /> */}
      

    </div>
  );
};

export default HomePage; // Note: Capitalized component name