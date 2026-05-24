import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { products, collections } from '../data/mockData';
import { IoHeart, IoHeartOutline, IoStar, IoSearchOutline, IoEyeOutline, IoBagAddOutline, IoArrowBack } from 'react-icons/io5';

export const CollectionDetail: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const {
    lang,
    addToCart,
    toggleFavorite,
    isFavorite,
    setQuickViewProduct,
    t,
    dir,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Get the collection details
  const collection = collections.find((c) => c.id === collectionId);

  // Filter and sort products for this collection
  const filteredProducts = useMemo(() => {
    let items = products.filter((p) => p.category === collectionId);

    if (searchTerm.trim() !== '') {
      items = items.filter(
        (p) =>
          p.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'low-high') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items = [...items].sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [collectionId, searchTerm, sortBy, lang]);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-lightBeige">
        <div className="text-center">
          <h1 className="text-2xl font-serifEn font-bold text-darkWood mb-4">
            {lang === 'ar' ? 'المجموعة غير موجودة' : 'Collection not found'}
          </h1>
          <Link
            to="/"
            className="text-primary-gold hover:text-primary-gold/80 transition-colors"
          >
            {lang === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-primary-lightBeige ${dir === 'rtl' ? 'font-sansAr' : 'font-sansEn'}`}>
      {/* Hero Banner for Collection */}
      <div className="relative h-64 md:h-80 bg-darkWood overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name[lang]}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkWood to-darkWood/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <Link
            to="/"
            className="absolute top-8 left-8 flex items-center gap-2 text-primary-gold hover:text-white transition-colors"
          >
            <IoArrowBack size={20} />
            <span className="text-sm font-semibold">{lang === 'ar' ? 'رجوع' : 'Back'}</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-serifEn font-bold text-center mb-2">
            {collection.name[lang]}
          </h1>
          <p className="text-white/80 max-w-2xl text-center text-sm md:text-base">
            {collection.description[lang]}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Filters Bar: Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-primary-gold/10 mb-8">
            {/* Search */}
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

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-primary-gold/15 hover:border-primary-gold focus:border-primary-gold focus:outline-none rounded px-4 py-2 text-sm text-charcoal cursor-pointer transition-colors"
            >
              <option value="default">{lang === 'ar' ? 'ترتيب' : 'Sort by'}</option>
              <option value="low-high">{lang === 'ar' ? 'السعر: الأقل إلى الأعلى' : 'Price: Low to High'}</option>
              <option value="high-low">{lang === 'ar' ? 'السعر: الأعلى إلى الأقل' : 'Price: High to Low'}</option>
              <option value="rating">{lang === 'ar' ? 'التقييم' : 'Rating'}</option>
            </select>

            {/* Results count */}
            <span className="text-sm font-semibold text-charcoal/60">
              {filteredProducts.length} {lang === 'ar' ? 'منتج' : 'products'}
            </span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => {
                  const isFav = isFavorite(product.id);

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-primary-gold/10 flex flex-col"
                    >
                      {/* Product Image Container */}
                      <div className="relative h-64 bg-primary-beige overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name[lang]}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {product.saleBadge && (
                            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">
                              {product.saleBadge[lang]}
                            </span>
                          )}
                          {product.isNew && (
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">
                              {lang === 'ar' ? 'جديد' : 'NEW'}
                            </span>
                          )}
                          {product.isPopular && (
                            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">
                              {lang === 'ar' ? 'مشهور' : 'POPULAR'}
                            </span>
                          )}
                        </div>

                        {/* Availability Badge */}
                        <div className="absolute top-3 right-3">
                          <span
                            className={`text-[10px] uppercase font-semibold px-2 py-1 rounded ${
                              product.availability === 'in-stock'
                                ? 'bg-emerald-100 text-emerald-800'
                                : product.availability === 'low-stock'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.availability === 'in-stock'
                              ? t.inStock
                              : product.availability === 'low-stock'
                              ? t.lowStock
                              : t.outOfStock}
                          </span>
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-darkWood/0 group-hover:bg-darkWood/40 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="bg-white hover:bg-primary-gold text-darkWood hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                            title={t.quickView}
                          >
                            <IoEyeOutline size={20} />
                          </button>
                          <button
                            onClick={() => addToCart(product, product.details.colors[0] || '#C5A880', 1)}
                            className="bg-primary-gold hover:bg-white text-white hover:text-primary-gold p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                            title={t.addToCart}
                          >
                            <IoBagAddOutline size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <span className="text-[10px] font-semibold text-primary-gold uppercase tracking-wider block mb-1">
                              {product.category.replace('-', ' ')}
                            </span>
                            <h3 className="text-sm font-semibold text-darkWood line-clamp-2 group-hover:text-primary-gold transition-colors">
                              {product.name[lang]}
                            </h3>
                          </div>
                          <button
                            onClick={() => toggleFavorite(product.id)}
                            className="flex-shrink-0 text-primary-gold hover:scale-110 transition-transform duration-200 mt-1"
                          >
                            {isFav ? (
                              <IoHeart size={18} className="text-red-500" />
                            ) : (
                              <IoHeartOutline size={18} />
                            )}
                          </button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex text-amber-500 text-xs">
                            {[...Array(5)].map((_, i) => (
                              <IoStar
                                key={i}
                                size={12}
                                className={i < Math.floor(product.rating) ? 'fill-current' : 'text-charcoal/10'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-charcoal/60 font-semibold">
                            {product.rating}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-charcoal/60 line-clamp-2 mb-3 flex-grow">
                          {product.description[lang]}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-primary-gold/10">
                          <span className="text-lg font-serifEn font-bold text-darkWood">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs font-serifEn text-charcoal/40 line-through">
                              ${product.oldPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-charcoal/60 font-serifEn">
                {lang === 'ar' ? 'لم يتم العثور على منتجات' : 'No products found'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CollectionDetail;
