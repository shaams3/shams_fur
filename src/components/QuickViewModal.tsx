import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { IoCloseOutline, IoHeart, IoHeartOutline, IoStar } from 'react-icons/io5';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleFavorite,
    isFavorite,
    lang,
    t,
  } = useApp();

  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);

  // Set default color when product changes
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.details.colors[0] || '#C5A880');
      setQty(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const prod = quickViewProduct;
  const isFav = isFavorite(prod.id);

  const handleAddToCart = () => {
    addToCart(prod, selectedColor, qty);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-darkWood/70 backdrop-blur-sm">
        {/* Backdrop Close trigger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={() => setQuickViewProduct(null)}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-primary-lightBeige border border-primary-gold/20 shadow-2xl rounded-xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 md:top-5 md:right-5 z-20 text-charcoal/75 hover:text-primary-gold transition-colors duration-200 bg-white/70 hover:bg-white p-1 rounded-full border border-primary-gold/10"
            aria-label={t.close}
          >
            <IoCloseOutline size={28} />
          </button>

          {/* Left: Product Image Panel */}
          <div className="relative w-full md:w-1/2 bg-primary-beige flex items-center justify-center min-h-[300px] md:min-h-[480px]">
            <img
              src={prod.image}
              alt={prod.name[lang]}
              className="w-full h-full object-cover"
            />
            {/* Sale Badge */}
            {prod.saleBadge && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded tracking-wider">
                {prod.saleBadge[lang]}
              </span>
            )}
          </div>

          {/* Right: Info Details Panel */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Availability */}
              <div className="flex justify-between items-center gap-2 mb-2">
                <span className="text-xs text-primary-gold font-bold tracking-widest uppercase">
                  {prod.category.replace('-', ' ')}
                </span>
                
                {/* Availability Badge */}
                <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
                  prod.availability === 'in-stock'
                    ? 'bg-emerald-100 text-emerald-800'
                    : prod.availability === 'low-stock'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {prod.availability === 'in-stock'
                    ? t.inStock
                    : prod.availability === 'low-stock'
                    ? t.lowStock
                    : t.outOfStock}
                </span>
              </div>

              {/* Title & Favorite */}
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="text-xl md:text-2xl font-serifEn text-darkWood font-semibold leading-tight">
                  {prod.name[lang]}
                </h3>
                <button
                  onClick={() => toggleFavorite(prod.id)}
                  className="text-primary-gold hover:scale-110 transition-transform duration-200"
                  aria-label={t.wishlist}
                >
                  {isFav ? <IoHeart size={24} className="text-red-500" /> : <IoHeartOutline size={24} />}
                </button>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <IoStar key={i} size={14} className={i < Math.floor(prod.rating) ? 'fill-current' : 'text-charcoal/20'} />
                  ))}
                </div>
                <span className="text-xs text-charcoal/70 font-semibold font-serifEn">({prod.rating})</span>
              </div>

              {/* Prices */}
              <div className="flex items-baseline gap-3 mb-5 border-b border-primary-gold/10 pb-5">
                <span className="text-2xl font-serifEn text-darkWood font-bold">
                  ${prod.price.toLocaleString()}
                </span>
                {prod.oldPrice && (
                  <span className="text-sm font-serifEn text-charcoal/40 line-through">
                    ${prod.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Specifications */}
              <div className="space-y-2 mb-6 text-sm">
                <div>
                  <span className="font-semibold text-darkWood">{t.material}: </span>
                  <span className="text-charcoal/70">{prod.details.material[lang]}</span>
                </div>
                <div>
                  <span className="font-semibold text-darkWood">{t.dimensions}: </span>
                  <span className="text-charcoal/70 font-serifEn">{prod.details.dimensions[lang]}</span>
                </div>
              </div>

              {/* Color Finish Select */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-darkWood uppercase tracking-wider block mb-2">
                  {t.colors}
                </span>
                <div className="flex gap-2.5">
                  {prod.details.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-primary-gold scale-110 ring-2 ring-primary-gold/30'
                          : 'border-black/10 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Finish color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Qty + Cart Button */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {/* Qty Selector */}
              <div className="flex items-center justify-between border border-primary-gold/30 rounded px-3 py-2 w-full sm:w-28 bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={prod.availability === 'out-of-stock'}
                  className="text-charcoal/60 hover:text-darkWood transition-colors disabled:opacity-30"
                >
                  -
                </button>
                <span className="font-semibold text-darkWood text-sm font-serifEn">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  disabled={prod.availability === 'out-of-stock'}
                  className="text-charcoal/60 hover:text-darkWood transition-colors disabled:opacity-30"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                disabled={prod.availability === 'out-of-stock'}
                className="flex-1 bg-darkWood hover:bg-primary-gold text-white font-serifEn tracking-widest uppercase font-semibold py-3 px-6 rounded transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-charcoal/20 disabled:cursor-not-allowed text-center"
              >
                {prod.availability === 'out-of-stock' ? t.outOfStock : t.addToCart}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default QuickViewModal;
