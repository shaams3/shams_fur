import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { IoCloseOutline, IoTrashOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setCartOpen,
    cart,
    removeFromCart,
    updateCartQty,
    cartTotal,
    lang,
    dir,
    t,
    setCheckoutOpen,
  } = useApp();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-darkWood/60 backdrop-blur-sm"
          />

          {/* Slider Drawer Panel */}
          <motion.div
            initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className={`relative w-full max-w-md h-full bg-primary-lightBeige shadow-2xl flex flex-col z-10 border-primary-gold/10 ${
              dir === 'rtl' ? 'border-r' : 'border-l'
            }`}
          >
            {/* Header Area */}
            <div className="flex items-center justify-between border-b border-primary-gold/10 px-6 py-5">
              <h2 className="text-xl font-serifEn tracking-wider text-darkWood font-semibold uppercase">
                {t.cartTitle}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-darkWood hover:text-primary-gold transition-colors duration-200"
                aria-label={t.close}
              >
                <IoCloseOutline size={28} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-charcoal/50">
                  <svg className="w-16 h-16 text-primary-gold/40 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <p className="text-lg font-serifEn tracking-wide">{t.cartEmpty}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={`${item.product.id}-${item.selectedColor}`}
                      className="flex gap-4 p-3 bg-white border border-primary-gold/10 rounded-lg shadow-sm"
                    >
                      <div className="w-20 h-20 overflow-hidden rounded bg-primary-beige flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name[lang]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-sm font-semibold text-darkWood truncate">
                              {item.product.name[lang]}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                              className="text-charcoal/40 hover:text-red-500 transition-colors duration-200"
                              aria-label="Remove item"
                            >
                              <IoTrashOutline size={16} />
                            </button>
                          </div>
                          {/* Selected color circle preview */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs text-charcoal/60">{t.colors}:</span>
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                          </div>
                        </div>

                        {/* Price and Quantity Adjuster */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-primary-gold/20 rounded">
                            <button
                              onClick={() => updateCartQty(item.product.id, item.selectedColor, item.quantity - 1)}
                              className="p-1 text-charcoal/60 hover:text-darkWood transition-colors"
                            >
                              <IoRemoveOutline size={14} />
                            </button>
                            <span className="px-2.5 text-sm font-semibold text-darkWood">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQty(item.product.id, item.selectedColor, item.quantity + 1)}
                              className="p-1 text-charcoal/60 hover:text-darkWood transition-colors"
                            >
                              <IoAddOutline size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-serifEn text-darkWood font-bold">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-primary-gold/15 bg-white p-6 space-y-4 shadow-inner">
                <div className="flex justify-between items-center text-darkWood">
                  <span className="text-base font-medium">{t.cartSubtotal}</span>
                  <span className="text-xl font-serifEn font-bold">${cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setTimeout(() => setCheckoutOpen(true), 350);
                  }}
                  className="w-full bg-darkWood hover:bg-primary-gold text-white font-serifEn tracking-widest uppercase py-4 rounded font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  {t.cartCheckout}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
