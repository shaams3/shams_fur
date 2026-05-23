import React from 'react';
import { useApp } from '../context/AppContext';
import { IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp, IoMailOpenOutline } from 'react-icons/io5';

export const Footer: React.FC = () => {
  const { lang, t } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === 'ar' ? 'تم اشتراكك في النشرة البريدية لـ شمس بنجاح! ترقب عروضنا الحصرية.' : 'Successfully subscribed to the Shams newsletter! Stay tuned for exclusive offers.');
  };

  return (
    <footer className="bg-darkWood text-white pt-20 pb-8 border-t border-primary-gold/15 relative overflow-hidden">
      {/* Mesh decoration background */}
      <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-primary-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-6">
            <a href="#home" className="flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.1" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <span className="text-xl font-serifEn tracking-[0.25em] font-bold text-white uppercase">
                {t.brandName}
              </span>
            </a>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              {lang === 'ar'
                ? 'دار تصميم وتصنيع المفروشات الراقية. نحن نبتكر قطع أثاث فريدة توازن بين البساطة الهندسية والمواد الفاخرة لتنعم بمنزل استثنائي.'
                : 'House of luxury furniture and decor. We manufacture bespoke architectural items balancing clean symmetry and organic finishes to inspire daily living.'}
            </p>
            {/* Social Icons list */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary-gold text-white hover:text-darkWood flex items-center justify-center transition-all duration-300"
                aria-label="Facebook link"
              >
                <IoLogoFacebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary-gold text-white hover:text-darkWood flex items-center justify-center transition-all duration-300"
                aria-label="Instagram link"
              >
                <IoLogoInstagram size={18} />
              </a>
              <a
                href="https://wa.me/201060754575"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary-gold text-white hover:text-darkWood flex items-center justify-center transition-all duration-300"
                aria-label="WhatsApp link"
              >
                <IoLogoWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-gold">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a href="#home" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {t.navHome}
                </a>
              </li>
              <li>
                <a href="#collections" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {t.navCollections}
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {t.navBestSellers}
                </a>
              </li>
              <li>
                <a href="#about" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {t.navAbout}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {t.navContact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Collections */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-gold">
              {lang === 'ar' ? 'أبرز المجموعات' : 'Featured Ranges'}
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a href="#products" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {lang === 'ar' ? 'غرف النوم' : 'Bedrooms'}
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {lang === 'ar' ? 'الكنب الفاخر' : 'Sofas & Sectionals'}
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {lang === 'ar' ? 'غرف الطعام' : 'Dining Rooms'}
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {lang === 'ar' ? 'وحدات التلفزيون' : 'TV Units'}
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs text-white/70 hover:text-primary-gold transition-colors duration-250">
                  {lang === 'ar' ? 'الأثاث المكتبي' : 'Office Furniture'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-gold">
              Newsletter
            </h4>
            <p className="text-xs text-white/50 leading-relaxed">
              {lang === 'ar'
                ? 'اشترك في قائمتنا البريدية لتصلك أحدث تصاميم شمس ومجموعات الأثاث الحصرية مباشرة.'
                : 'Subscribe to receive notifications about Shams seasonal releases and luxury sales.'}
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                placeholder={lang === 'ar' ? 'البريد الإلكتروني...' : 'Your Email Address...'}
                className={`w-full bg-white/5 border border-white/10 focus:border-primary-gold focus:outline-none rounded py-3 px-4 text-xs text-white ${
                  lang === 'ar' ? 'text-right pl-12 pr-4' : 'text-left pr-12 pl-4'
                }`}
              />
              <button
                type="submit"
                className={`absolute top-1/2 -translate-y-1/2 text-primary-gold hover:text-white transition-colors duration-200 ${
                  lang === 'ar' ? 'left-3.5' : 'right-3.5'
                }`}
                aria-label="Subscribe"
              >
                <IoMailOpenOutline size={20} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright & payment icons */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-[10px] text-white/40 tracking-wider">
            &copy; {new Date().getFullYear()} {t.brandName} Furniture. All Rights Reserved. Designed with love and premium craftsmanship.
          </p>

          {/* Luxury Payment Icons mockups */}
          <div className="flex gap-3 text-white/30 text-[10px] tracking-widest font-mono">
            <span>VISA</span>
            <span>MC</span>
            <span>AMEX</span>
            <span>APPLE PAY</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
