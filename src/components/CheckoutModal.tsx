import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useApp } from '../context/AppContext';
import {
  IoCloseOutline,
  IoCheckmarkCircle,
  IoArrowBack,
  IoArrowForward,
  IoReceiptOutline,
  IoPersonOutline,
  IoCallOutline,
  IoLocationOutline,
  IoCreateOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5';

// ─── EmailJS Config ───────────────────────────────────────────────

const EMAILJS_SERVICE_ID  = '211009273';      // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_iehgqi2'; // Your Template ID
const EMAILJS_PUBLIC_KEY  = 'A7NovpRuik7lKSeRX';      // Your Public Key

// ─── Types ────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  address: string;
  note: string;
}
interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

type Step = 'receipt' | 'form' | 'success';

// ─── Component ────────────────────────────────────────────────────
export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setCheckoutOpen,
    cart,
    cartTotal,
    clearCart,
    lang,
    dir,
    t,
  } = useApp();

  const [step, setStep]           = useState<Step>('receipt');
  const [sending, setSending]     = useState(false);
  const [apiError, setApiError]   = useState('');
  const [form, setForm]           = useState<FormData>({
    name: '', phone: '', address: '', note: '',
  });
  const [errors, setErrors]       = useState<FormErrors>({});

  // ── Reset on close ──────────────────────────────────────────────
  const handleClose = () => {
    setCheckoutOpen(false);
    setTimeout(() => {
      setStep('receipt');
      setForm({ name: '', phone: '', address: '', note: '' });
      setErrors({});
      setApiError('');
    }, 400);
  };

  const handleSuccessClose = () => {
    clearCart();
    handleClose();
  };

  // ── Validation ──────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim())
      newErrors.name = t.checkoutErrorName;
    if (!form.phone.trim() || form.phone.trim().length < 7)
      newErrors.phone = t.checkoutErrorPhone;
    if (!form.address.trim())
      newErrors.address = t.checkoutErrorAddress;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Build receipt text for email ────────────────────────────────
  const buildReceiptText = (): string => {
    const lines = cart.map(
      (item, i) =>
        `${i + 1}. ${item.product.name.en}  ×${item.quantity}  =  $${(
          item.product.price * item.quantity
        ).toLocaleString()}`
    );
    lines.push('');
    lines.push(`ORDER TOTAL:  $${cartTotal.toLocaleString()}`);
    return lines.join('\n');
  };

  // ── Submit ───────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setApiError('');

    const orderTime = new Date().toLocaleString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    const templateParams = {
      customer_name:    form.name,
      customer_phone:   form.phone,
      customer_address: form.address,
      customer_note:    form.note || '—',
      order_receipt:    buildReceiptText(),
      order_total:      `$${cartTotal.toLocaleString()}`,
      order_time:       orderTime,
      to_email:         'alishamsaldyn@gmail.com',
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStep('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setApiError(t.checkoutEmailError);
    } finally {
      setSending(false);
    }
  };

  // ── Field change ────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Shared input style ──────────────────────────────────────────
  const inputBase =
    'w-full bg-white border rounded-lg px-4 py-3 text-sm text-darkWood placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold transition-all duration-200';
  const inputError = 'border-red-400 bg-red-50';
  const inputOk    = 'border-primary-gold/20 hover:border-primary-gold/40';

  // ─────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center p-4"
          dir={dir}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step !== 'success' ? handleClose : undefined}
            className="absolute inset-0 bg-darkWood/70 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-xl max-h-[90vh] bg-primary-lightBeige rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* ── Header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary-gold/10 bg-white/60 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-3">
                {step === 'form' && (
                  <button
                    onClick={() => setStep('receipt')}
                    className="text-charcoal/50 hover:text-primary-gold transition-colors mr-1"
                    aria-label="Go back"
                  >
                    {dir === 'rtl'
                      ? <IoArrowForward size={20} />
                      : <IoArrowBack size={20} />}
                  </button>
                )}
                <div>
                  <p className="text-xs font-medium text-primary-gold uppercase tracking-widest">
                    {t.brandName}
                  </p>
                  <h2 className="text-lg font-serifEn font-semibold text-darkWood leading-tight">
                    {step === 'receipt'
                      ? t.checkoutReceipt
                      : step === 'form'
                      ? t.checkoutFormTitle
                      : t.checkoutSuccessTitle}
                  </h2>
                </div>
              </div>

              {/* Step indicator pills */}
              {step !== 'success' && (
                <div className="flex items-center gap-1.5">
                  {(['receipt', 'form'] as Step[]).map((s, i) => (
                    <div
                      key={s}
                      className={`rounded-full transition-all duration-300 ${
                        step === s
                          ? 'w-6 h-2 bg-primary-gold'
                          : step === 'form' && i === 0
                          ? 'w-2 h-2 bg-primary-gold/40'
                          : 'w-2 h-2 bg-charcoal/20'
                      }`}
                    />
                  ))}
                </div>
              )}

              {step !== 'success' && (
                <button
                  onClick={handleClose}
                  className="text-charcoal/40 hover:text-darkWood transition-colors"
                  aria-label={t.close}
                >
                  <IoCloseOutline size={26} />
                </button>
              )}
            </div>

            {/* ── Body ─────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">

                {/* ══ STEP 1: RECEIPT ══════════════════════════════ */}
                {step === 'receipt' && (
                  <motion.div
                    key="receipt"
                    initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 space-y-5"
                  >
                    {/* Confirmation banner */}
                    <div className="flex items-start gap-3 p-4 bg-primary-gold/10 border border-primary-gold/30 rounded-xl">
                      <IoReceiptOutline
                        size={22}
                        className="text-primary-gold flex-shrink-0 mt-0.5"
                      />
                      <p className="text-sm text-darkWood/80 leading-relaxed">
                        {t.checkoutConfirmBanner}
                      </p>
                    </div>

                    {/* Product rows */}
                    <div className="space-y-3">
                      {/* Table header */}
                      <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-charcoal/40 uppercase tracking-wider px-1">
                        <span className="col-span-6">{t.checkoutItem}</span>
                        <span className="col-span-3 text-center">{t.checkoutQty}</span>
                        <span className="col-span-3 text-end">{t.checkoutPrice}</span>
                      </div>

                      <div className="divide-y divide-primary-gold/10 border border-primary-gold/10 rounded-xl overflow-hidden bg-white">
                        {cart.map((item) => (
                          <div
                            key={`${item.product.id}-${item.selectedColor}`}
                            className="grid grid-cols-12 gap-2 items-center px-4 py-3"
                          >
                            {/* Image + name */}
                            <div className="col-span-6 flex items-center gap-3 min-w-0">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary-beige flex-shrink-0 border border-primary-gold/10">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name[lang]}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-darkWood truncate leading-tight">
                                  {item.product.name[lang]}
                                </p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <span
                                    className="w-3 h-3 rounded-full border border-black/10 inline-block"
                                    style={{ backgroundColor: item.selectedColor }}
                                  />
                                  <span className="text-[10px] text-charcoal/40">
                                    {item.product.category}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Qty */}
                            <div className="col-span-3 text-center">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-gold/10 text-xs font-bold text-darkWood">
                                {item.quantity}
                              </span>
                            </div>

                            {/* Line total */}
                            <div className="col-span-3 text-end">
                              <span className="text-xs font-semibold text-darkWood">
                                ${(item.product.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total row */}
                    <div className="flex items-center justify-between bg-darkWood text-white rounded-xl px-5 py-4">
                      <span className="text-sm font-medium tracking-wide">
                        {t.checkoutTotal}
                      </span>
                      <span className="text-xl font-serifEn font-bold text-primary-gold">
                        ${cartTotal.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* ══ STEP 2: FORM ══════════════════════════════════ */}
                {step === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                    transition={{ duration: 0.25 }}
                    className="p-6"
                  >
                    <form id="checkout-form" onSubmit={handleSubmit} noValidate>
                      <div className="space-y-4">

                        {/* Full Name */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-darkWood uppercase tracking-wider mb-1.5">
                            <IoPersonOutline size={14} className="text-primary-gold" />
                            {t.checkoutName}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="checkout-name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder={t.checkoutNamePlaceholder}
                            className={`${inputBase} ${errors.name ? inputError : inputOk}`}
                          />
                          {errors.name && (
                            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                              <IoAlertCircleOutline size={12} />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-darkWood uppercase tracking-wider mb-1.5">
                            <IoCallOutline size={14} className="text-primary-gold" />
                            {t.checkoutPhone}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="checkout-phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder={t.checkoutPhonePlaceholder}
                            dir="ltr"
                            className={`${inputBase} ${errors.phone ? inputError : inputOk}`}
                          />
                          {errors.phone && (
                            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                              <IoAlertCircleOutline size={12} />
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* Address */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-darkWood uppercase tracking-wider mb-1.5">
                            <IoLocationOutline size={14} className="text-primary-gold" />
                            {t.checkoutAddress}
                            <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            name="address"
                            id="checkout-address"
                            rows={2}
                            value={form.address}
                            onChange={handleChange}
                            placeholder={t.checkoutAddressPlaceholder}
                            className={`${inputBase} resize-none ${errors.address ? inputError : inputOk}`}
                          />
                          {errors.address && (
                            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                              <IoAlertCircleOutline size={12} />
                              {errors.address}
                            </p>
                          )}
                        </div>

                        {/* Note (optional) */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-darkWood uppercase tracking-wider mb-1.5">
                            <IoCreateOutline size={14} className="text-primary-gold" />
                            {t.checkoutNote}
                            <span className="text-charcoal/30 text-[10px] normal-case tracking-normal font-normal ms-1">
                              ({lang === 'ar' ? 'اختياري' : 'optional'})
                            </span>
                          </label>
                          <textarea
                            name="note"
                            id="checkout-note"
                            rows={3}
                            value={form.note}
                            onChange={handleChange}
                            placeholder={t.checkoutNotePlaceholder}
                            className={`${inputBase} ${inputOk} resize-none`}
                          />
                        </div>

                        {/* API Error */}
                        {apiError && (
                          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <IoAlertCircleOutline
                              size={16}
                              className="text-red-500 flex-shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-red-600">{apiError}</p>
                          </div>
                        )}

                        {/* Order mini-summary */}
                        <div className="flex items-center justify-between bg-primary-gold/8 border border-primary-gold/20 rounded-xl px-4 py-3">
                          <span className="text-xs text-charcoal/60">
                            {cart.length} {lang === 'ar' ? 'منتجات' : 'items'}
                          </span>
                          <span className="text-sm font-bold text-darkWood font-serifEn">
                            {t.checkoutTotal}: ${cartTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ══ STEP 3: SUCCESS ═════════════════════════════ */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                    className="p-8 flex flex-col items-center text-center gap-5 py-12"
                  >
                    {/* Animated check */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 14, stiffness: 260, delay: 0.15 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-primary-gold/20 animate-ping" />
                      <div className="relative w-24 h-24 rounded-full bg-primary-gold/15 flex items-center justify-center border-2 border-primary-gold/30">
                        <IoCheckmarkCircle size={56} className="text-primary-gold" />
                      </div>
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-serifEn font-bold text-darkWood">
                        {t.checkoutSuccessTitle}
                      </h3>
                      <p className="text-sm text-charcoal/60 max-w-xs leading-relaxed">
                        {t.checkoutSuccessMessage}
                      </p>
                    </div>

                    {/* Order mini summary */}
                    <div className="w-full bg-white border border-primary-gold/15 rounded-xl p-4 space-y-2 text-sm">
                      {cart.map((item) => (
                        <div
                          key={`${item.product.id}-${item.selectedColor}`}
                          className="flex justify-between items-center text-xs"
                        >
                          <span className="text-charcoal/70 truncate max-w-[60%]">
                            {item.product.name[lang]} ×{item.quantity}
                          </span>
                          <span className="font-semibold text-darkWood">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-primary-gold/15 pt-2 flex justify-between font-bold">
                        <span className="text-darkWood">{t.checkoutTotal}</span>
                        <span className="text-primary-gold font-serifEn">
                          ${cartTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSuccessClose}
                      className="w-full bg-darkWood hover:bg-primary-gold text-white font-serifEn tracking-widest uppercase py-4 rounded-xl font-semibold transition-all duration-300 shadow-md"
                    >
                      {t.checkoutSuccessClose}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Footer Actions ──────────────────────────────────── */}
            {step !== 'success' && (
              <div className="border-t border-primary-gold/10 bg-white/60 backdrop-blur-sm px-6 py-4 flex-shrink-0">
                {step === 'receipt' ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep('form')}
                    className="w-full flex items-center justify-center gap-2 bg-darkWood hover:bg-primary-gold text-white font-serifEn tracking-widest uppercase py-4 rounded-xl font-semibold transition-all duration-300 shadow-md"
                  >
                    {t.checkoutProceed}
                    {dir === 'rtl'
                      ? <IoArrowBack size={18} />
                      : <IoArrowForward size={18} />}
                  </motion.button>
                ) : (
                  <motion.button
                    form="checkout-form"
                    type="submit"
                    whileHover={{ scale: sending ? 1 : 1.02 }}
                    whileTap={{ scale: sending ? 1 : 0.98 }}
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 bg-darkWood hover:bg-primary-gold disabled:opacity-60 disabled:cursor-not-allowed text-white font-serifEn tracking-widest uppercase py-4 rounded-xl font-semibold transition-all duration-300 shadow-md"
                  >
                    {sending ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        {t.checkoutSending}
                      </>
                    ) : (
                      <>
                        <IoCheckmarkCircle size={18} />
                        {t.checkoutSubmit}
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
