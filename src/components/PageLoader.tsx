import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to simulate buffer loading and wow the user with high-end preloader
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-darkWood"
        >
          {/* Rotating Gold Sun / Shams Logo */}
          <div className="relative flex items-center justify-center">
            {/* Spinning rays */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute w-24 h-24 border border-dashed border-primary-gold/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute w-28 h-28 border border-dashed border-primary-gold/15 rounded-full"
            />
            
            {/* Center Sun Graphic */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FAF8F5]/5 border border-primary-gold"
            >
              <svg className="w-8 h-8 text-primary-gold animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </motion.div>
          </div>
          
          {/* Logo Name */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <h1 className="text-2xl font-serifEn tracking-[0.35em] text-primary-gold uppercase">SHAMS</h1>
            <p className="mt-1 text-xs font-sansAr tracking-widest text-primary-lightBeige/60">أثاث فاخر وعصري</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default PageLoader;
