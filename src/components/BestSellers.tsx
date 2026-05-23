import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { products } from '../data/mockData';
import { IoChevronBackOutline, IoChevronForwardOutline, IoEyeOutline, IoBagAddOutline, IoHeart, IoHeartOutline, IoStar } from 'react-icons/io5';

export const BestSellers: React.FC = () => {
  const {
    lang,
    addToCart,
    toggleFavorite,
    isFavorite,
    setQuickViewProduct,
    t,
  } = useApp();

  // Filter products where isPopular is true (we have around 10 of these)
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 8);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 4 cards on desktop, 2 on tablet, 1 on mobile
  // We can just create an elegant sliding container or standard paginated carousel
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= popularProducts.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? popularProducts.length - 1 : prev - 1));
  };

  return (
    <section id="bestsellers" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-gold uppercase">
              {t.bestSellersSubtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-serifEn font-bold text-darkWood mt-2">
              {t.bestSellersTitle}
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-primary-gold/30 hover:border-primary-gold text-darkWood hover:bg-primary-beige flex items-center justify-center transition-all duration-300 shadow-sm"
              aria-label="Previous slide"
            >
              <IoChevronBackOutline size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-primary-gold/30 hover:border-primary-gold text-darkWood hover:bg-primary-beige flex items-center justify-center transition-all duration-300 shadow-sm"
              aria-label="Next slide"
            >
              <IoChevronForwardOutline size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${currentIndex * (100 / 4)}%` }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="flex gap-6 md:gap-8 cursor-grab"
            style={{ width: `${(popularProducts.length * 100) / 4}%` }}
          >
            {popularProducts.map((prod) => {
              const isFav = isFavorite(prod.id);
              return (
                <div
                  key={prod.id}
                  className="w-full md:w-[calc(25%-24px)] flex-shrink-0 bg-primary-lightBeige border border-primary-gold/10 hover:border-primary-gold/45 rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  style={{ flexBasis: '100%' }} // will adjust dynamically on responsive viewports via tailwind class hierarchy
                >
                  {/* Card Image Frame */}
                  <div className="relative aspect-square overflow-hidden bg-primary-beige flex-shrink-0">
                    <img
                      src={prod.image}
                      alt={prod.name[lang]}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Popular badge */}
                    <span className="absolute top-3 left-3 bg-[#1E1611] text-primary-gold text-[9px] font-bold px-2.5 py-0.5 rounded tracking-widest z-10">
                      POPULAR
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleFavorite(prod.id)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-sm flex items-center justify-center text-charcoal hover:text-red-500 transition-all duration-200"
                    >
                      {isFav ? <IoHeart size={18} className="text-red-500" /> : <IoHeartOutline size={18} />}
                    </button>

                    {/* Hover Utilities */}
                    <div className="absolute inset-0 bg-darkWood/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => setQuickViewProduct(prod)}
                        className="w-10 h-10 rounded-full bg-white text-darkWood hover:bg-primary-gold hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                        title={t.quickView}
                      >
                        <IoEyeOutline size={18} />
                      </button>
                      <button
                        onClick={() => addToCart(prod)}
                        disabled={prod.availability === 'out-of-stock'}
                        className="w-10 h-10 rounded-full bg-white text-darkWood hover:bg-primary-gold hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 disabled:bg-charcoal/20 disabled:text-charcoal/40"
                        title={t.addToCart}
                      >
                        <IoBagAddOutline size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Card Description Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <h3 className="font-semibold text-darkWood text-sm leading-tight line-clamp-1 group-hover:text-primary-gold transition-colors duration-200">
                          {prod.name[lang]}
                        </h3>
                        <span className="text-sm font-serifEn text-darkWood font-bold">
                          ${prod.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal/60 line-clamp-2 leading-relaxed mb-3">
                        {prod.description[lang]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-primary-gold/10 pt-3 mt-auto">
                      <div className="flex items-center gap-1 text-amber-500">
                        <IoStar size={12} className="fill-current" />
                        <span className="text-[10px] text-charcoal/70 font-semibold font-serifEn">{prod.rating}</span>
                      </div>
                      <span className={`text-[9px] uppercase font-bold tracking-wider ${
                        prod.availability === 'in-stock'
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}>
                        {prod.availability === 'in-stock' ? t.inStock : t.lowStock}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default BestSellers;
