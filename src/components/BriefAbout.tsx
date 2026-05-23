import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { IoDiamondOutline, IoRibbonOutline, IoTimeOutline, IoAirplaneOutline } from 'react-icons/io5';

export const BriefAbout: React.FC = () => {
  const { lang, t } = useApp();

  const stats = [
    {
      id: 1,
      icon: <IoRibbonOutline className="text-primary-gold" size={24} />,
      value: "15+",
      label: t.statsYears,
    },
    {
      id: 2,
      icon: <IoDiamondOutline className="text-primary-gold" size={24} />,
      value: "10K+",
      label: t.statsCustomers,
    },
    {
      id: 3,
      icon: <IoTimeOutline className="text-primary-gold" size={24} />,
      value: "10",
      label: t.statsCollections,
    },
    {
      id: 4,
      icon: <IoAirplaneOutline className="text-primary-gold" size={24} />,
      value: "48h",
      label: t.statsDelivery,
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-primary-lightBeige relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary-beige rounded-full filter blur-[100px] opacity-60 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-beige rounded-full filter blur-[120px] opacity-60 -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Premium Image Column with double frame */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div className="absolute -top-6 -left-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] rounded-2xl border border-primary-gold/20 pointer-events-none" />
            {/* Inner gold frame */}
            <div className="absolute -top-3 -left-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] rounded-xl border border-primary-gold/40 pointer-events-none" />

            {/* Shams Brand Logo Image — fills the panel */}
            <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl bg-[#FFF0B3] flex items-center justify-center">
              <img
                src="/shams-logo.jpg"
                alt="Shams Furniture — للأثاث المنزلي والمكتبي"
                className="w-full h-full object-contain p-6 transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Gold badge pinned to bottom-right corner */}
            <div className="absolute -bottom-5 -right-5 bg-darkWood border-2 border-primary-gold text-primary-gold text-[10px] tracking-widest font-serifEn uppercase px-5 py-2.5 rounded-lg shadow-xl">
              Est. 2010
            </div>
          </motion.div>

          {/* Right: Narrative Text & Stats Grid Column */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-primary-gold uppercase">
              {t.aboutSubtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-serifEn font-bold text-darkWood leading-tight">
              {t.aboutTitle}
            </h2>
            <p className="text-charcoal/80 leading-relaxed text-sm md:text-base">
              {t.aboutDesc1}
            </p>
            <p className="text-charcoal/70 text-sm leading-relaxed border-l-2 border-primary-gold pl-4 italic">
              {t.aboutDesc2}
            </p>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white border border-primary-gold/15 hover:border-primary-gold/50 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center gap-4"
                >
                  <div className="bg-primary-beige p-2.5 rounded-md flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-serifEn font-bold text-darkWood">
                      {stat.value}
                    </h4>
                    <p className="text-xs text-charcoal/60 mt-0.5 font-medium leading-none">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default BriefAbout;
