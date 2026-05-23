import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { IoLogoWhatsapp, IoLogoFacebook, IoMapOutline, IoCallOutline, IoTimeOutline, IoLocationOutline } from 'react-icons/io5';

export const Contact: React.FC = () => {
  const { lang, t } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === 'ar' ? 'تم إرسال رسالتك بنجاح! سيتواصل معك مستشار التصميم قريباً.' : 'Your message has been sent successfully! A design consultant will contact you shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-primary-lightBeige relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-gold uppercase">
            {t.contactSubtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-serifEn font-bold text-darkWood mt-2">
            {t.contactTitle}
          </h2>
          <div className="w-16 h-[2px] bg-primary-gold mx-auto mt-4" />
        </div>

        {/* Contact split panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form & Socials (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white p-8 md:p-10 rounded-lg shadow-sm border border-primary-gold/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-darkWood uppercase tracking-wider mb-2">
                    {t.contactName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-primary-lightBeige border border-primary-gold/15 focus:border-primary-gold focus:outline-none rounded px-4 py-3 text-sm text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-darkWood uppercase tracking-wider mb-2">
                    {t.contactPhone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-primary-lightBeige border border-primary-gold/15 focus:border-primary-gold focus:outline-none rounded px-4 py-3 text-sm text-charcoal font-serifEn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-darkWood uppercase tracking-wider mb-2">
                  {t.contactEmail}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-primary-lightBeige border border-primary-gold/15 focus:border-primary-gold focus:outline-none rounded px-4 py-3 text-sm text-charcoal font-serifEn"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-darkWood uppercase tracking-wider mb-2">
                  {t.contactMessage}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-primary-lightBeige border border-primary-gold/15 focus:border-primary-gold focus:outline-none rounded px-4 py-3 text-sm text-charcoal"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-darkWood hover:bg-primary-gold text-white font-serifEn tracking-widest uppercase font-semibold py-4 rounded transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {t.contactSend}
              </button>
            </form>

            {/* Premium quick-chat social buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-primary-gold/10">
              <a
                href="https://wa.me/201060754575"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-6 rounded font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <IoLogoWhatsapp size={20} />
                <span className="text-xs uppercase tracking-wider font-serifEn">WhatsApp Chat</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1565cd] text-white py-3.5 px-6 rounded font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <IoLogoFacebook size={20} />
                <span className="text-xs uppercase tracking-wider font-serifEn">Facebook Page</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Showroom details & Maps placeholder (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Elegant Map Slate Placeholder */}
            <div className="relative h-[250px] bg-darkWood rounded-lg overflow-hidden border border-primary-gold/25 shadow-md flex items-center justify-center group">
              {/* Compass grid lines */}
              <div className="absolute inset-0 border border-white/5 grid grid-cols-6 grid-rows-6 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary-gold/10 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary-gold/15 rounded-full pointer-events-none animate-ping" />

              {/* Pin Icon */}
              <div className="relative flex flex-col items-center z-10">
                <div className="w-12 h-12 bg-primary-gold text-darkWood rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <IoLocationOutline size={28} />
                </div>
                <span className="mt-2 text-[10px] text-primary-beige uppercase tracking-[0.25em] font-semibold bg-darkWood/80 px-3 py-1 rounded border border-primary-gold/20">
                  Shams Showroom
                </span>
              </div>
            </div>

            {/* Info details */}
            <div className="space-y-6 bg-white p-8 rounded-lg border border-primary-gold/10 shadow-sm">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded bg-primary-beige text-primary-gold flex items-center justify-center flex-shrink-0">
                  <IoMapOutline size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-darkWood uppercase tracking-wider">
                    {t.contactLocation}
                  </h4>
                  <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                    {t.contactLocationDesc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded bg-primary-beige text-primary-gold flex items-center justify-center flex-shrink-0">
                  <IoTimeOutline size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-darkWood uppercase tracking-wider">
                    {t.contactHours}
                  </h4>
                  <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                    {t.contactHoursDesc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded bg-primary-beige text-primary-gold flex items-center justify-center flex-shrink-0">
                  <IoCallOutline size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-darkWood uppercase tracking-wider">
                    {lang === 'ar' ? 'اتصل بنا مباشرة' : 'Direct Line'}
                  </h4>
                  <p className="text-xs text-charcoal/70 mt-1 font-serifEn">
                    +20 106 075 4575
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
export default Contact;
