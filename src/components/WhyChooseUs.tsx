import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { IoDiamondOutline, IoShieldCheckmarkOutline, IoTrendingUpOutline, IoReceiptOutline, IoCallOutline, IoPaperPlaneOutline } from 'react-icons/io5';

export const WhyChooseUs: React.FC = () => {
  const { t } = useApp();

  const benefits = [
    {
      id: 1,
      icon: <IoDiamondOutline size={30} className="text-primary-gold" />,
      title: t.featureQuality,
      desc: t.featureQualityDesc,
    },
    {
      id: 2,
      icon: <IoPaperPlaneOutline size={30} className="text-primary-gold" />,
      title: t.featureDelivery,
      desc: t.featureDeliveryDesc,
    },
    {
      id: 3,
      icon: <IoShieldCheckmarkOutline size={30} className="text-primary-gold" />,
      title: t.featurePayment,
      desc: t.featurePaymentDesc,
    },
    {
      id: 4,
      icon: <IoTrendingUpOutline size={30} className="text-primary-gold" />,
      title: t.featureDesigns,
      desc: t.featureDesignsDesc,
    },
    {
      id: 5,
      icon: <IoReceiptOutline size={30} className="text-primary-gold" />,
      title: t.featureWarranty,
      desc: t.featureWarrantyDesc,
    },
    {
      id: 6,
      icon: <IoCallOutline size={30} className="text-primary-gold" />,
      title: t.featureSupport,
      desc: t.featureSupportDesc,
    },
  ];

  return (
    <section className="py-24 bg-darkWood text-white relative overflow-hidden">
      {/* Decorative vector meshes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-gold/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-gold uppercase">
            {t.whyChooseSubtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-serifEn font-bold text-white mt-2">
            {t.whyChooseTitle}
          </h2>
          <div className="w-16 h-[2px] bg-primary-gold mx-auto mt-4" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group p-8 rounded-lg bg-white/5 border border-white/10 hover:border-primary-gold/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary-gold/25 transition-all duration-300">
                  {item.icon}
                </div>
                {/* Title */}
                <h3 className="text-lg md:text-xl font-serifEn font-semibold tracking-wide text-white group-hover:text-primary-gold transition-colors duration-200">
                  {item.title}
                </h3>
                {/* Desc */}
                <p className="text-sm text-white/60 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Decorative accent corner line */}
              <div className="w-0 h-[1.5px] bg-primary-gold mt-6 group-hover:w-12 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default WhyChooseUs;
