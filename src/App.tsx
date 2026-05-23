import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PageLoader } from './components/PageLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BriefAbout } from './components/BriefAbout';
import { Collections } from './components/Collections';
import { Products } from './components/Products';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BestSellers } from './components/BestSellers';
import { Reviews } from './components/Reviews';
import { InstagramGallery } from './components/InstagramGallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';

const MainLayout: React.FC = () => {
  const { dir } = useApp();

  return (
    <div 
      className={`w-full min-h-screen text-charcoal bg-primary-lightBeige relative overflow-x-hidden ${
        dir === 'rtl' ? 'font-sansAr' : 'font-sansEn'
      }`}
    >
      {/* Loading Screen */}
      <PageLoader />

      {/* Sticky Header */}
      <Navbar />

      {/* Layout Main Blocks */}
      <main>
        <Hero />
        <BriefAbout />
        <Collections />
        <Products />
        <WhyChooseUs />
        <BestSellers />
        <Reviews />
        <InstagramGallery />
        <Contact />
      </main>

      {/* Footer Area */}
      <Footer />
      
      {/* Global Overlays & Drawer Popups */}
      <SearchModal />
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
