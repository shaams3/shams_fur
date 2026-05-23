import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { lang, t } = useApp();

  const titleVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const buttonVariants: any = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-darkWood"
    >
      {/* Background Image with Dark Wood overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Living Room Interior"
          className="w-full h-full object-cover opacity-45 scale-105 animate-pulse-subtle"
        />
        {/* Darkening Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-darkWood via-darkWood/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-darkWood/40 via-transparent to-transparent" />
      </div>

      {/* Floating Decorative Gold Shapes (Inspired by Faseela but tailored for Luxury Home Decor) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {/* Abstract Circle Ring */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[10%] w-24 h-24 border border-primary-gold/25 rounded-full"
        />
        {/* Gold Diamond shape */}
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-[15%] w-16 h-16 border border-primary-gold/15 rotate-45"
        />
        {/* Small Gold Star SVG 1 */}
        <motion.svg
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute top-1/3 right-[25%] w-6 h-6 text-primary-gold"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.2-6.2-4.5-6.2 4.5 2.4-7.2-6.2-4.5h7.6z" />
        </motion.svg>
        {/* Small Gold Star SVG 2 */}
        <motion.svg
          animate={{ scale: [1, 0.7, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 left-[20%] w-4 h-4 text-primary-gold"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.2-6.2-4.5-6.2 4.5 2.4-7.2-6.2-4.5h7.6z" />
        </motion.svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center text-white mt-12">
        {/* Luxury Gold Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-primary-gold/30 px-4 py-1.5 rounded-full mb-6 bg-darkWood/40 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-gold animate-ping" />
          <span className="text-[10px] md:text-xs font-serifEn tracking-[0.2em] font-semibold text-primary-gold uppercase">
            {lang === 'ar' ? 'تصاميم فاخرة وعصرية' : 'Luxury Furniture Atelier'}
          </span>
        </motion.div>

        {/* Animated Main Title */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide leading-[1.25] text-white ${
            lang === 'ar' ? 'font-serifAr' : 'font-serifEn'
          }`}
        >
          {lang === 'ar' ? (
            <>
              أثاث فاخر مصمم <span className="gold-gradient-text">لحياة عصرية</span>
            </>
          ) : (
            <>
              Luxury Furniture Designed <br />
              For <span className="gold-gradient-text">Modern Living</span>
            </>
          )}
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl mx-auto mt-6 text-sm md:text-lg text-primary-beige/90 leading-relaxed font-light"
        >
          {lang === 'ar'
            ? 'اكتشف أرقى خطوط الأثاث المنزلي المصنع يدوياً بالكامل بجودة إيطالية تدوم لعقود. بساطة هندسية تعيد تعريف المساحة.'
            : 'Discover our premium, hand-sculpted interior furnishing sets curated with Italian craftsmanship. Geometric simplicity redefining your home spaces.'}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="#products"
            className="w-full sm:w-auto bg-primary-gold hover:bg-white text-darkWood hover:text-darkWood font-serifEn tracking-widest font-semibold px-8 py-4 rounded transition-all duration-300 shadow-lg hover:shadow-primary-gold/20 text-xs uppercase"
          >
            {t.shopNow}
          </a>
          <a
            href="#collections"
            className="w-full sm:w-auto bg-transparent border border-white/30 hover:border-primary-gold text-white hover:text-primary-gold font-serifEn tracking-widest font-semibold px-8 py-4 rounded transition-all duration-300 text-xs uppercase bg-white/5 hover:bg-white/10"
          >
            {t.exploreCollections}
          </a>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave Angle */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg className="relative block w-full h-[50px] text-primary-lightBeige fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 120 0 0 1200 120z" />
        </svg>
      </div>
    </section>
  );
};
export default Hero;
