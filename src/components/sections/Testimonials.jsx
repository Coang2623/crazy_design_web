import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import FadeIn from '../common/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        quote: {
            en: "Crazydesign transformed our coffee shop into something truly extraordinary. Their attention to detail and creative vision exceeded all expectations.",
            vi: "Crazydesign đã biến quán cà phê của chúng tôi thành một không gian phi thường. Sự chú ý đến chi tiết và tầm nhìn sáng tạo vượt xa mọi kỳ vọng."
        },
        name: 'Nguyen Minh Tuan',
        role: { en: 'Owner, District 1 Coffee', vi: 'Chủ quán, District 1 Coffee' },
        avatar: 'T',
    },
    {
        quote: {
            en: "Working with Crazydesign was an incredible experience. They understood our brand and delivered a spa interior that our clients absolutely love.",
            vi: "Làm việc với Crazydesign là trải nghiệm tuyệt vời. Họ hiểu thương hiệu của chúng tôi và mang đến không gian spa mà khách hàng yêu thích."
        },
        name: 'Tran Le Anh',
        role: { en: 'Director, Serenity Spa', vi: 'Giám đốc, Serenity Spa' },
        avatar: 'A',
    },
    {
        quote: {
            en: "The furniture quality is outstanding. Every piece was custom-made to perfection. Crazydesign is our go-to partner for all design projects.",
            vi: "Chất lượng nội thất xuất sắc. Mỗi sản phẩm đều được đo ni đóng giày hoàn hảo. Crazydesign là đối tác thiết kế hàng đầu của chúng tôi."
        },
        name: 'Pham Hoang Long',
        role: { en: 'CEO, Studio Workshop', vi: 'CEO, Studio Workshop' },
        avatar: 'L',
    },
];

const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

export default function Testimonials() {
    const { language } = useLanguage();
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const testimonialIndex = Math.abs(page % testimonials.length);
    const t = testimonials[testimonialIndex];
    const lang = language || 'en';

    const paginate = useCallback((newDirection) => {
        setPage(prev => prev + newDirection);
        setDirection(newDirection);
        setIsAutoPlaying(false);
        // Resume auto-play after 10s interaction
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    // Auto-rotate
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

                <div className="relative max-w-4xl mx-auto h-[400px] sm:h-[350px] flex items-center justify-center">
                    {/* Left Arrow (Desktop) */}
                    <button
                        className="hidden md:flex absolute -left-12 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg items-center justify-center text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 group"
                        onClick={() => paginate(-1)}
                        aria-label="Previous testimonial"
                    >
                        <span className="material-icons text-3xl group-hover:-translate-x-1 transition-transform">chevron_left</span>
                    </button>

                    {/* Right Arrow (Desktop) */}
                    <button
                        className="hidden md:flex absolute -right-12 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg items-center justify-center text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 group"
                        onClick={() => paginate(1)}
                        aria-label="Next testimonial"
                    >
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
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);
                                    // iOS-like feel:
                                    // 1. Fast flick (velocity * distance > threshold)
                                    // 2. OR Dragged significantly (> 100px)
                                    const isFlick = Math.abs(swipe) > 20000;
                                    const isSignificantDrag = Math.abs(offset.x) > 100;

                                    if ((isFlick || isSignificantDrag) && offset.x < 0) {
                                        paginate(1);
                                    } else if ((isFlick || isSignificantDrag) && offset.x > 0) {
                                        paginate(-1);
                                    }
                                }}
                                className="absolute w-full"
                            >
                                <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8 md:p-12 text-center relative mx-4 cursor-grab active:cursor-grabbing select-none">
                                    {/* Quote Icon */}
                                    <div className="text-primary-500/20 text-7xl font-serif leading-none mb-4 select-none">"</div>

                                    {/* Quote Text */}
                                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-article italic min-h-[80px]">
                                        {t.quote[lang] || t.quote.en}
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                            {t.avatar}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{t.role[lang] || t.role.en}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Dots Navigation */}
                <div className="flex items-center justify-center gap-3 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > testimonialIndex ? 1 : -1);
                                setPage(page + (i - testimonialIndex));
                                setIsAutoPlaying(false);
                            }}
                            className={`transition-all duration-300 rounded-full ${i === testimonialIndex
                                ? 'w-8 h-3 bg-primary-500'
                                : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
