import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { IoSearchOutline, IoBagOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const {
    lang,
    toggleLang,
    cartCount,
    setCartOpen,
    setSearchOpen,
    isMobileMenuOpen,
    setMobileMenuOpen,
    t,
  } = useApp();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, href: '#home' },
    { name: t.navCollections, href: '#collections' },
    { name: t.navBestSellers, href: '#bestsellers' },
    { name: t.navAbout, href: '#about' },
    { name: t.navContact, href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-nav py-4 shadow-lg'
            : 'bg-transparent py-6 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Hamburger Menu Icon (Mobile Only) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white hover:text-primary-gold transition-colors duration-300"
            aria-label="Open menu"
          >
            <IoMenuOutline size={30} />
          </button>

          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-2 group">
            {/* Elegant Custom Gold Sun Icon */}
            <svg
              className="w-7 h-7 text-primary-gold group-hover:rotate-90 transition-transform duration-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.1" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <span className="text-xl font-serifEn tracking-[0.2em] font-bold text-white group-hover:text-primary-gold transition-colors duration-300 uppercase">
              {t.brandName}
            </span>
          </a>

          {/* Centered Desktop Menu Links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/80 hover:text-primary-gold text-xs font-semibold uppercase tracking-widest transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-primary-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="text-white hover:text-primary-gold text-xs font-bold uppercase tracking-wider border border-white/20 hover:border-primary-gold px-2.5 py-1 rounded transition-all duration-300"
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>

            {/* Search Icon button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-white hover:text-primary-gold transition-colors duration-300"
              aria-label="Search"
            >
              <IoSearchOutline size={22} />
            </button>

            {/* Cart Icon button with item counter */}
            <button
              onClick={() => setCartOpen(true)}
              className="text-white hover:text-primary-gold transition-colors duration-300 relative"
              aria-label="Cart"
            >
              <IoBagOutline size={22} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-2 bg-primary-gold text-darkWood text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-darkWood"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[130] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-darkWood/80 backdrop-blur-md"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute top-0 left-0 w-4/5 max-w-sm h-full bg-darkWood p-8 flex flex-col justify-between z-10 border-r border-primary-gold/10"
            >
              <div>
                {/* Header info */}
                <div className="flex justify-between items-center mb-10">
                  <span className="text-xl font-serifEn tracking-[0.2em] font-bold text-white uppercase">
                    {t.brandName}
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:text-primary-gold"
                  >
                    <IoCloseOutline size={30} />
                  </button>
                </div>

                {/* Vertical Links list */}
                <ul className="space-y-6">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white/80 hover:text-primary-gold text-sm font-semibold uppercase tracking-wider block transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom social details inside drawer */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-[11px] text-white/40 tracking-widest uppercase">
                  Shams Furniture
                </p>
                <div className="flex gap-4 mt-3 text-white/60">
                  {/* Static placeholder links */}
                  <span className="text-xs hover:text-primary-gold cursor-pointer">FB</span>
                  <span className="text-xs hover:text-primary-gold cursor-pointer">IG</span>
                  <span className="text-xs hover:text-primary-gold cursor-pointer">WA</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
