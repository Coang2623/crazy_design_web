// src/components/sections/Testimonials.jsx — Phase 3: reads from Supabase via ContentContext

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useContent } from '../../contexts/ContentContext';
import FadeIn from '../common/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
};

const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export default function Testimonials() {
    const { language } = useLanguage();
    const { testimonials: dbTestimonials } = useContent();
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Fallback to hardcoded data if DB is empty
    const FALLBACK = [
        {
            content_vi: 'Crazydesign đã biến quán cà phê của chúng tôi thành một không gian phi thường. Sự chú ý đến chi tiết và tầm nhìn sáng tạo vượt xa mọi kỳ vọng.',
            content_en: 'Crazydesign transformed our coffee shop into something truly extraordinary. Their attention to detail and creative vision exceeded all expectations.',
            name: 'Nguyễn Minh Tuấn', role_vi: 'Chủ quán, District 1 Coffee', role_en: 'Owner, District 1 Coffee',
            avatar_initials: 'T', rating: 5,
        },
        {
            content_vi: 'Làm việc với Crazydesign là trải nghiệm tuyệt vời. Họ hiểu thương hiệu của chúng tôi và mang đến không gian spa mà khách hàng yêu thích.',
            content_en: 'Working with Crazydesign was an incredible experience. They understood our brand and delivered a spa interior that our clients absolutely love.',
            name: 'Trần Lê Anh', role_vi: 'Giám đốc, Serenity Spa', role_en: 'Director, Serenity Spa',
            avatar_initials: 'A', rating: 5,
        },
    ];

    const list = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : FALLBACK;
    const lang = language || 'en';
    const idx = Math.abs(page % list.length);
    const t = list[idx];

    const paginate = useCallback((newDirection) => {
        setPage(prev => prev + newDirection);
        setDirection(newDirection);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            setPage(prev => prev + 1);
            setDirection(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    return (
        <section className="py-20 md:py-28 scroll-mt-20 overflow-hidden" id="testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {lang === 'vi' ? 'Khách hàng nói gì' : 'What Our Clients Say'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {lang === 'vi' ? 'Niềm tin từ những đối tác đã đồng hành cùng chúng tôi' : 'Trusted by businesses who share our passion for exceptional design'}
                        </p>
                    </div>
                </FadeIn>

                <div className="relative max-w-4xl mx-auto h-[420px] sm:h-[370px] flex items-center justify-center">
                    {/* Left Arrow */}
                    <button className="hidden md:flex absolute -left-12 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg items-center justify-center text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 group"
                        onClick={() => paginate(-1)} aria-label="Previous testimonial">
                        <span className="material-icons text-3xl group-hover:-translate-x-1 transition-transform">chevron_left</span>
                    </button>

                    {/* Right Arrow */}
                    <button className="hidden md:flex absolute -right-12 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg items-center justify-center text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 group"
                        onClick={() => paginate(1)} aria-label="Next testimonial">
                        <span className="material-icons text-3xl group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>

                    <div className="w-full h-full relative flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);
                                    const isFlick = Math.abs(swipe) > 20000;
                                    const isSignificantDrag = Math.abs(offset.x) > 100;
                                    if ((isFlick || isSignificantDrag) && offset.x < 0) paginate(1);
                                    else if ((isFlick || isSignificantDrag) && offset.x > 0) paginate(-1);
                                }}
                                className="absolute w-full"
                            >
                                <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8 md:p-12 text-center relative mx-4 cursor-grab active:cursor-grabbing select-none">
                                    <div className="text-primary-500/20 text-7xl font-serif leading-none mb-4 select-none">"</div>

                                    {/* Rating stars */}
                                    {t.rating && (
                                        <div className="flex justify-center gap-0.5 mb-4">
                                            {Array.from({ length: t.rating }, (_, i) => (
                                                <span key={i} className="text-yellow-400 text-xl">★</span>
                                            ))}
                                        </div>
                                    )}

                                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-article italic min-h-[80px]">
                                        {lang === 'vi' ? t.content_vi : t.content_en}
                                    </p>

                                    <div className="flex items-center justify-center gap-4">
                                        {t.avatar_url ? (
                                            <img src={t.avatar_url} alt={t.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                                {t.avatar_initials || t.name?.[0] || '?'}
                                            </div>
                                        )}
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {lang === 'vi' ? t.role_vi : t.role_en}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-3 mt-8">
                    {list.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setDirection(i > idx ? 1 : -1); setPage(page + (i - idx)); setIsAutoPlaying(false); }}
                            className={`transition-all duration-300 rounded-full ${i === idx ? 'w-8 h-3 bg-primary-500' : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
