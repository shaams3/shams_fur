import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { collections } from '../data/mockData';

export const Collections: React.FC = () => {
  const { lang, t } = useApp();

  return (
    <section id="collections" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-gold uppercase">
            {t.collectionsSubtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-serifEn font-bold text-darkWood mt-2">
            {t.collectionsTitle}
          </h2>
          <div className="w-16 h-[2px] bg-primary-gold mx-auto mt-4" />
        </div>

        {/* Collections Grid (10 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col, index) => {
            // Span double columns for featured collections to create a nice masonry grid layout (e.g. Bed & Sofa)
            const isFeatured = index === 0 || index === 1;

            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className={`group relative h-[380px] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-primary-gold/10 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Backplate image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Shadow Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-darkWood via-darkWood/50 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Card content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8 text-white">
                  <span className="text-[10px] tracking-[0.25em] font-semibold text-primary-gold uppercase mb-1.5 opacity-80">
                    Collection
                  </span>
                  <h3 className="text-xl md:text-2xl font-serifEn font-semibold tracking-wide">
                    {col.name[lang]}
                  </h3>
                  <p className="text-xs text-white/70 mt-2 line-clamp-2 max-w-sm group-hover:text-white transition-colors duration-300">
                    {col.description[lang]}
                  </p>

                  {/* Explore Button Slide-up */}
                  <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300 ease-in-out">
                    <a
                      href="#products"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary-gold hover:text-white transition-colors duration-200"
                    >
                      {lang === 'ar' ? 'اكتشف المجموعة ←' : 'Explore Collection →'}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default Collections;
