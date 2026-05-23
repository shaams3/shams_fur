import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Home from './pages/Home';
import CollectionDetail from './pages/CollectionDetail';
import { Navbar } from './components/Navbar';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PageLoader } from './components/PageLoader';
import { Footer } from './components/Footer';

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

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection/:collectionId" element={<CollectionDetail />} />
      </Routes>

      {/* Footer */}
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
