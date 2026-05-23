import React from 'react';
import { Hero } from '../components/Hero';
import { BriefAbout } from '../components/BriefAbout';
import { Collections } from '../components/Collections';
import { Products } from '../components/Products';
import { BestSellers } from '../components/BestSellers';
import { Reviews } from '../components/Reviews';
import { Contact } from '../components/Contact';
import { useApp } from '../context/AppContext';

export const Home: React.FC = () => {
  const { dir } = useApp();

  return (
    <main 
      className={`w-full text-charcoal bg-primary-lightBeige relative overflow-x-hidden ${
        dir === 'rtl' ? 'font-sansAr' : 'font-sansEn'
      }`}
    >
      <Hero />
      <BriefAbout />
      <Collections />
      <Products />
      <BestSellers />
      <Reviews />
      <Contact />
    </main>
  );
};

export default Home;
