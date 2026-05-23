import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { products, collections } from '../data/mockData';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, setQuickViewProduct, lang, t } = useApp();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setActiveCategory('all');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Filter products based on search term and selected category tab
  const results = products.filter((prod) => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const nameMatch = prod.name[lang].toLowerCase().includes(query.toLowerCase());
    const descMatch = prod.description[lang].toLowerCase().includes(query.toLowerCase());
    return matchesCategory && (nameMatch || descMatch);
  }).slice(0, 12); // Limit to 12 items for aesthetic UI

  const handleResultClick = (product: typeof products[0]) => {
    setQuickViewProduct(product);
    setSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-darkWood/80 backdrop-blur-md">
      {/* Backdrop Close Click */}
      <div className="absolute inset-0" onClick={() => setSearchOpen(false)} />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-primary-lightBeige border border-primary-gold/20 shadow-2xl rounded-lg overflow-hidden z-10"
      >
        {/* Top Header Panel */}
        <div className="flex items-center justify-between border-b border-primary-gold/10 px-6 py-4">
          <h2 className="text-xl font-serifEn tracking-wider text-darkWood font-medium uppercase">
            {lang === 'ar' ? 'البحث الفاخر' : 'Luxury Search'}
          </h2>
          <button
            onClick={() => setSearchOpen(false)}
            className="text-darkWood hover:text-primary-gold transition-colors duration-200"
            aria-label={t.close}
          >
            <IoCloseOutline size={28} />
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-6">
          <div className="relative">
            <IoSearchOutline className="absolute top-1/2 left-4 -translate-y-1/2 text-charcoal/50" size={24} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full bg-white border border-primary-gold/20 focus:border-primary-gold focus:outline-none rounded-md py-4 pl-12 pr-6 text-charcoal text-lg shadow-inner ${
                lang === 'ar' ? 'text-right pr-12 pl-6' : 'text-left'
              }`}
            />
            {lang === 'ar' && (
              <IoSearchOutline className="absolute top-1/2 right-4 -translate-y-1/2 text-charcoal/50" size={24} />
            )}
          </div>

          {/* Quick Categories filter */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-darkWood text-primary-beige border-darkWood'
                  : 'bg-white text-charcoal border-primary-gold/20 hover:border-primary-gold'
              }`}
            >
              {t.filterAll}
            </button>
            {collections.map((col) => (
              <button
                key={col.id}
                onClick={() => setActiveCategory(col.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-all duration-200 ${
                  activeCategory === col.id
                    ? 'bg-darkWood text-primary-beige border-darkWood'
                    : 'bg-white text-charcoal border-primary-gold/20 hover:border-primary-gold'
                }`}
              >
                {col.name[lang]}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="mt-6 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
            {query.trim().length === 0 ? (
              <div className="text-center py-12 text-charcoal/50 text-sm">
                {lang === 'ar' ? 'ابدأ بالكتابة للبحث في أثاث شمس الفاخر...' : 'Start typing to search Shams luxury furniture...'}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleResultClick(prod)}
                    className="flex gap-4 p-3 bg-white border border-primary-gold/15 hover:border-primary-gold/50 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md"
                  >
                    <div className="w-20 h-20 overflow-hidden rounded bg-primary-beige flex-shrink-0">
                      <img src={prod.image} alt={prod.name[lang]} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-xs text-primary-gold font-medium uppercase tracking-wider">
                        {collections.find((c) => c.id === prod.category)?.name[lang]}
                      </span>
                      <h4 className="text-sm font-semibold text-darkWood truncate mt-0.5">
                        {prod.name[lang]}
                      </h4>
                      <p className="text-xs text-charcoal/70 line-clamp-1 mt-0.5">
                        {prod.description[lang]}
                      </p>
                      <span className="text-sm font-serifEn text-darkWood font-semibold mt-1">
                        ${prod.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-charcoal/50 text-sm">
                {lang === 'ar'
                  ? 'لم نعثر على أي نتائج مطابقة لبحثك.'
                  : 'We could not find any matching results for your query.'}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default SearchModal;
