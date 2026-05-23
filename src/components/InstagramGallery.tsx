import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { galleryImages } from '../data/mockData';
import { IoLogoInstagram } from 'react-icons/io5';

export const InstagramGallery: React.FC = () => {
  const { t } = useApp();

  // Asymmetrical layout configuration classes per image index
  const layoutClasses = [
    "col-span-1 row-span-1 h-[260px]", // 0
    "col-span-1 row-span-2 h-[540px]", // 1 (tall)
    "col-span-1 row-span-1 h-[260px]", // 2
    "col-span-1 md:col-span-2 row-span-1 h-[260px]", // 3 (wide)
    "col-span-1 row-span-1 h-[260px]", // 4
    "col-span-1 row-span-1 h-[260px]", // 5
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-gold uppercase">
            {t.gallerySubtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-serifEn font-bold text-darkWood mt-2">
            {t.galleryTitle}
          </h2>
          <div className="w-16 h-[2px] bg-primary-gold mx-auto mt-4" />
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[auto]">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className={`relative rounded-lg overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300 border border-primary-gold/10 ${
                layoutClasses[index % layoutClasses.length]
              }`}
            >
              {/* Image */}
              <img
                src={img}
                alt={`Shams premium space setup ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Gold Instagram overlay */}
              <div className="absolute inset-0 bg-darkWood/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 pointer-events-none">
                <div className="w-12 h-12 rounded-full border border-primary-gold flex items-center justify-center text-primary-gold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <IoLogoInstagram size={24} />
                </div>
                <span className="text-[10px] tracking-widest text-primary-beige uppercase font-serifEn transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  @Shams.Luxury
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default InstagramGallery;
