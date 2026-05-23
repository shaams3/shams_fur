import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { products, collections } from '../data/mockData';
import { IoHeart, IoHeartOutline, IoStar, IoSearchOutline, IoEyeOutline, IoBagAddOutline } from 'react-icons/io5';

export const Products: React.FC = () => {
  const {
    lang,
    addToCart,
    toggleFavorite,
    isFavorite,
    setQuickViewProduct,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState('bedrooms');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Filter and sort products dynamically
  const filteredProducts = useMemo(() => {
    // 1. Filter by active category tab
    let items = products.filter((p) => p.category === activeTab);

    // 2. Filter by search term if typed
    if (searchTerm.trim() !== '') {
      items = items.filter(
        (p) =>
          p.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Sort products
    if (sortBy === 'low-high') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items = [...items].sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [activeTab, searchTerm, sortBy, lang]);

  return (
    <section id="products" className="py-24 bg-primary-lightBeige relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-gold uppercase">
            {t.productsSubtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-serifEn font-bold text-darkWood mt-2">
            {t.productsTitle}
          </h2>
          <div className="w-16 h-[2px] bg-primary-gold mx-auto mt-4" />
        </div>

        {/* Tab Controls for 10 Collections */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-thin">
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => {
                setActiveTab(col.id);
                setSearchTerm('');
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border whitespace-nowrap ${
                activeTab === col.id
                  ? 'bg-darkWood text-primary-beige border-darkWood shadow-md'
                  : 'bg-white text-charcoal border-primary-gold/15 hover:border-primary-gold/60 hover:bg-primary-beige/30'
              }`}
            >
              {col.name[lang]}
            </button>
          ))}
        </div>

        {/* Filters Bar: Search & Sort */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-primary-gold/10 mb-8">
          {/* Search inside tab */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'ar' ? 'البحث في هذه المجموعة...' : 'Search in this collection...'}
              className={`w-full bg-primary-lightBeige border border-primary-gold/15 focus:border-primary-gold focus:outline-none rounded py-2 px-4 text-sm text-charcoal ${
                lang === 'ar' ? 'text-right pl-10 pr-4' : 'text-left pr-10 pl-4'
              }`}
            />
            <IoSearchOutline
              className={`absolute top-1/2 -translate-y-1/2 text-charcoal/40 ${
                lang === 'ar' ? 'left-3' : 'right-3'
              }`}
              size={18}
            />
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs text-charcoal/60 font-semibold">{t.sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-primary-lightBeige border border-primary-gold/15 focus:border-primary-gold focus:outline-none rounded py-2 px-3 text-xs text-charcoal font-medium cursor-pointer"
            >
              <option value="default">{lang === 'ar' ? 'الافتراضي' : 'Default'}</option>
              <option value="low-high">{t.sortPriceLowHigh}</option>
              <option value="high-low">{t.sortPriceHighLow}</option>
              <option value="rating">{t.sortRating}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => {
              const isFav = isFavorite(prod.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={prod.id}
                  className="group bg-white rounded-lg border border-primary-gold/10 hover:border-primary-gold/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-square overflow-hidden bg-primary-beige">
                    <img
                      src={prod.image}
                      alt={prod.name[lang]}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Sale Badge */}
                    {prod.saleBadge && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider z-10">
                        {prod.saleBadge[lang]}
                      </span>
                    )}

                    {/* Quick Badges (New/Popular) */}
                    {!prod.saleBadge && prod.isNew && (
                      <span className="absolute top-3 left-3 bg-primary-gold text-darkWood text-[9px] font-bold px-2 py-0.5 rounded tracking-wider z-10">
                        NEW
                      </span>
                    )}

                    {/* Favorite Wishlist Icon Button */}
                    <button
                      onClick={() => toggleFavorite(prod.id)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-sm flex items-center justify-center text-charcoal hover:text-red-500 transition-all duration-200"
                      aria-label="Add to wishlist"
                    >
                      {isFav ? <IoHeart size={18} className="text-red-500" /> : <IoHeartOutline size={18} />}
                    </button>

                    {/* Hover Utility overlay */}
                    <div className="absolute inset-0 bg-darkWood/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      
                      {/* Quick View Button */}
                      <button
                        onClick={() => setQuickViewProduct(prod)}
                        className="w-10 h-10 rounded-full bg-white text-darkWood hover:bg-primary-gold hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-115"
                        title={t.quickView}
                      >
                        <IoEyeOutline size={20} />
                      </button>

                      {/* Add to Cart quick button */}
                      <button
                        onClick={() => addToCart(prod)}
                        disabled={prod.availability === 'out-of-stock'}
                        className="w-10 h-10 rounded-full bg-white text-darkWood hover:bg-primary-gold hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-115 disabled:bg-charcoal/20 disabled:text-charcoal/40 disabled:cursor-not-allowed"
                        title={t.addToCart}
                      >
                        <IoBagAddOutline size={20} />
                      </button>

                    </div>
                  </div>

                  {/* Info details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & price row */}
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <h3 className="font-semibold text-darkWood text-sm leading-tight line-clamp-1 group-hover:text-primary-gold transition-colors duration-200">
                          {prod.name[lang]}
                        </h3>
                        <span className="text-sm font-serifEn text-darkWood font-bold flex-shrink-0">
                          ${prod.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-charcoal/60 line-clamp-2 leading-relaxed mb-3">
                        {prod.description[lang]}
                      </p>
                    </div>

                    {/* Bottom Row: Stars & Status */}
                    <div className="flex items-center justify-between border-t border-primary-gold/10 pt-3 mt-auto">
                      <div className="flex items-center gap-1 text-amber-500">
                        <IoStar size={12} className="fill-current" />
                        <span className="text-[10px] text-charcoal/70 font-semibold font-serifEn">{prod.rating}</span>
                      </div>
                      <span className={`text-[9px] uppercase font-bold tracking-wider ${
                        prod.availability === 'in-stock'
                          ? 'text-emerald-600'
                          : prod.availability === 'low-stock'
                          ? 'text-amber-600'
                          : 'text-red-500'
                      }`}>
                        {prod.availability === 'in-stock'
                          ? t.inStock
                          : prod.availability === 'low-stock'
                          ? t.lowStock
                          : t.outOfStock}
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State inside Tab */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-charcoal/50 text-sm font-medium">
            {lang === 'ar' ? 'لا توجد منتجات مطابقة في هذه المجموعة حالياً.' : 'No matching products inside this collection.'}
          </div>
        )}

      </div>
    </section>
  );
};
export default Products;
