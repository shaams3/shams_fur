import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { testimonials } from '../data/mockData';
import { IoStar } from 'react-icons/io5';

export const Reviews: React.FC = () => {
  const { lang, t } = useApp();

  return (
    <section className="py-24 bg-primary-lightBeige relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-10 left-[10%] text-primary-gold/5 text-9xl font-serifEn font-bold select-none pointer-events-none">
        “
      </div>
      <div className="absolute bottom-10 right-[10%] text-primary-gold/5 text-9xl font-serifEn font-bold select-none pointer-events-none">
        ”
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-gold uppercase">
            {t.reviewsSubtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-serifEn font-bold text-darkWood mt-2">
            {t.reviewsTitle}
          </h2>
          <div className="w-16 h-[2px] bg-primary-gold mx-auto mt-4" />
        </div>

        {/* Testimonials Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white border border-primary-gold/15 p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Quote Icon decorative */}
              <div className="absolute top-6 right-6 text-primary-gold/15 group-hover:text-primary-gold/30 transition-colors duration-300">
                <span className="text-5xl font-serif font-bold leading-none">“</span>
              </div>

              {/* Star rating */}
              <div className="flex text-amber-500 gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar
                    key={i}
                    size={14}
                    className={i < Math.floor(item.rating) ? 'fill-current' : 'text-charcoal/20'}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-base text-charcoal/80 leading-relaxed italic mb-6">
                "{item.text[lang]}"
              </p>

              {/* User Bio Footer */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary-gold/20 flex-shrink-0 bg-primary-beige">
                  <img
                    src={item.avatar}
                    alt={item.name[lang]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-darkWood">
                    {item.name[lang]}
                  </h4>
                  <p className="text-xs text-charcoal/50 mt-0.5 font-medium">
                    {item.role[lang]}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default Reviews;
