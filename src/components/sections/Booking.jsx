import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeIn from '../common/FadeIn';
import DatePicker from '../common/DatePicker';
import { submitBooking } from '@/lib/supabase';

export default function Booking() {
    const { t, i18n } = useTranslation();
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
    const [timeSlot, setTimeSlot] = useState('morning');
    const [selectedDate, setSelectedDate] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', note: '' });
    const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';

    const steps = {
        vi: [
            { icon: 'event', text: 'Chọn ngày tư vấn phù hợp' },
            { icon: 'schedule', text: 'Chọn khung giờ bạn muốn' },
            { icon: 'chat', text: 'Thảo luận chi tiết dự án cùng kiến trúc sư' },
        ],
        en: [
            { icon: 'event', text: 'Choose a preferred consultation date' },
            { icon: 'schedule', text: 'Select your preferred time slot' },
            { icon: 'chat', text: 'Discuss your project details with our architect' },
        ]
    };

    const handleInput = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate) {
            setErrorMsg(lang === 'vi' ? 'Vui lòng chọn ngày hẹn.' : 'Please select a date.');
            return;
        }
        setStatus('loading');
        setErrorMsg('');

        // Format date to YYYY-MM-DD
        const d = new Date(selectedDate);
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        const { error } = await submitBooking({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            date: dateStr,
            timeSlot: timeSlot,
            note: formData.note,
        });

        if (error) {
            console.error('[Booking] Supabase error:', error);
            setStatus('error');
            setErrorMsg(lang === 'vi'
                ? 'Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp.'
                : 'Something went wrong. Please try again or contact us directly.');
        } else {
            setStatus('success');
            setFormData({ name: '', phone: '', email: '', note: '' });
            setSelectedDate(null);
            setTimeSlot('morning');
        }
    };

    return (
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-dark-900 scroll-mt-20 overflow-hidden" id="booking">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary-100 dark:bg-primary-950/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-100 dark:bg-blue-950/10 rounded-full blur-3xl opacity-30"></div>

                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <FadeIn direction="left">
                        <div className="relative z-10">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold text-sm tracking-widest uppercase mb-6">
                                {t('booking.cta', 'Book Now')}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                {t('booking.title')}
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-lg leading-relaxed">
                                {t('booking.subtitle')}
                            </p>

                            <div className="space-y-6">
                                {(steps[lang] || steps.en).map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-100 dark:border-dark-700 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
                                            <span className="material-icons">{step.icon}</span>
                                        </div>
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            {step.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="right" delay={300}>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white dark:bg-dark-950/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-dark-800 shadow-2xl relative z-10"
                        >
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest px-1">
                                        {t('booking.name')}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInput}
                                        placeholder={t('contact.namePlaceholder')}
                                        className="w-full bg-gray-50 dark:bg-dark-900/50 border-2 border-transparent focus:border-primary-500/50 rounded-xl px-5 py-4 outline-none transition-all dark:text-white"
                                    />
                                </div>
                                {/* Phone Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest px-1">
                                        {t('booking.phone')}
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInput}
                                        placeholder="+84 ..."
                                        className="w-full bg-gray-50 dark:bg-dark-900/50 border-2 border-transparent focus:border-primary-500/50 rounded-xl px-5 py-4 outline-none transition-all dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {/* Date Input - Custom DatePicker */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest px-1">
                                        {t('booking.date')}
                                    </label>
                                    <DatePicker
                                        value={selectedDate}
                                        onChange={setSelectedDate}
                                        lang={lang}
                                        placeholder={lang === 'vi' ? 'Chọn ngày hẹn' : 'Pick a date'}
                                    />
                                </div>
                                {/* Time Slot - Custom Toggle */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest px-1">
                                        {t('booking.time')}
                                    </label>
                                    <div className="grid grid-cols-2 gap-3 h-[60px]">
                                        {[
                                            { id: 'morning', icon: 'wb_sunny', labelVI: 'Buổi Sáng', timeVI: '9h – 11h', labelEN: 'Morning', timeEN: '9–11 AM' },
                                            { id: 'afternoon', icon: 'nights_stay', labelVI: 'Buổi Chiều', timeVI: '14h – 17h', labelEN: 'Afternoon', timeEN: '2–5 PM' },
                                        ].map((slot) => (
                                            <button
                                                key={slot.id}
                                                type="button"
                                                onClick={() => setTimeSlot(slot.id)}
                                                className={`flex flex-col items-center justify-center gap-0.5 rounded-xl border-2 transition-all h-full px-2 ${timeSlot === slot.id
                                                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                                                    : 'border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900/50 text-gray-600 dark:text-gray-400 hover:border-primary-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-icons text-sm">{slot.icon}</span>
                                                    <span className="font-semibold text-sm">{lang === 'vi' ? slot.labelVI : slot.labelEN}</span>
                                                </div>
                                                <span className="text-xs opacity-60 font-normal">{lang === 'vi' ? slot.timeVI : slot.timeEN}</span>
                                            </button>
                                        ))}
                                    </div>
                                    {/* Hidden input to carry value */}
                                    <input type="hidden" name="timeSlot" value={timeSlot} />
                                </div>
                            </div>

                            {/* Note Input */}
                            <div className="space-y-2 mb-8">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest px-1">
                                    {t('booking.note')}
                                </label>
                                <textarea
                                    rows="3"
                                    name="note"
                                    value={formData.note}
                                    onChange={handleInput}
                                    placeholder={t('contact.messagePlaceholder')}
                                    className="w-full bg-gray-50 dark:bg-dark-900/50 border-2 border-transparent focus:border-primary-500/50 rounded-xl px-5 py-4 outline-none transition-all dark:text-white resize-none"
                                ></textarea>
                            </div>

                            {/* Error Message */}
                            {errorMsg && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm flex items-center gap-2 mb-4"
                                >
                                    <span className="material-icons text-base">error_outline</span>
                                    {errorMsg}
                                </motion.p>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                onClick={() => status === 'error' && setStatus(null)}
                                className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${status === 'success'
                                        ? 'bg-green-500 text-white cursor-default'
                                        : status === 'error'
                                            ? 'bg-red-500 hover:bg-red-600 text-white'
                                            : 'bg-primary-500 hover:bg-primary-600 text-white shadow-xl shadow-primary-500/20'
                                    }`}
                            >
                                {status === 'loading' ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : status === 'success' ? (
                                    <>
                                        <span className="material-icons">check_circle</span>
                                        {t('booking.success')}
                                    </>
                                ) : status === 'error' ? (
                                    <>
                                        <span className="material-icons">refresh</span>
                                        {lang === 'vi' ? 'Thử lại' : 'Try Again'}
                                    </>
                                ) : (
                                    <>
                                        <span className="material-icons">send</span>
                                        {t('booking.submit')}
                                    </>
                                )}
                            </button>
                        </form>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
