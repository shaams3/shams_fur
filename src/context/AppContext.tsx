import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/mockData';
import type { Product } from '../data/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

interface AppContextType {
  lang: 'en' | 'ar';
  dir: 'ltr' | 'rtl';
  t: typeof translations.en;
  toggleLang: () => void;
  
  cart: CartItem[];
  addToCart: (product: Product, color?: string, qty?: number) => void;
  removeFromCart: (productId: string, color: string) => void;
  updateCartQty: (productId: string, color: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lang state
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const t = translations[lang];

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);

  // Modals / Drawer toggles
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Effect to apply language and dir on HTML tag
  useEffect(() => {
    const documentElement = document.documentElement;
    documentElement.setAttribute('lang', lang);
    documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    setDir(lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  // Recalculate cart counts & totals
  useEffect(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setCartCount(count);
    setCartTotal(total);
  }, [cart]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const addToCart = (product: Product, color?: string, qty = 1) => {
    const selectedColor = color || product.details.colors[0] || '#C5A880';
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += qty;
        return newCart;
      } else {
        return [...prevCart, { product, quantity: qty, selectedColor }];
      }
    });
    // Open cart drawer on add
    setCartOpen(true);
  };

  const removeFromCart = (productId: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.selectedColor === color))
    );
  };

  const updateCartQty = (productId: string, color: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (item) => item.product.id === productId && item.selectedColor === color
      );
      if (index > -1) {
        const newCart = [...prevCart];
        newCart[index].quantity = qty;
        return newCart;
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <AppContext.Provider
      value={{
        lang,
        dir,
        t,
        toggleLang,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartCount,
        cartTotal,
        favorites,
        toggleFavorite,
        isFavorite,
        isCartOpen,
        setCartOpen,
        isSearchOpen,
        setSearchOpen,
        isMobileMenuOpen,
        setMobileMenuOpen,
        isCheckoutOpen,
        setCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
