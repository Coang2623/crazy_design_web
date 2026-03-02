import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import FadeIn from '../common/FadeIn';

export default function Hero() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const shape1Ref = useRef(null);
    const shape2Ref = useRef(null);
    const shape3Ref = useRef(null);

    // Parallax effect on floating shapes
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (shape1Ref.current) shape1Ref.current.style.transform = `translate(0, ${scrollY * 0.15}px) scale(1)`;
            if (shape2Ref.current) shape2Ref.current.style.transform = `translate(0, ${scrollY * -0.1}px) scale(1)`;
            if (shape3Ref.current) shape3Ref.current.style.transform = `translate(0, ${scrollY * 0.08}px) scale(1)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden hero-gradient-mesh">
            {/* Floating Decorative Shapes with Parallax */}
            <div ref={shape1Ref} className="floating-shape floating-shape-1 will-change-transform" aria-hidden="true" />
            <div ref={shape2Ref} className="floating-shape floating-shape-2 will-change-transform" aria-hidden="true" />
            <div ref={shape3Ref} className="floating-shape floating-shape-3 will-change-transform" aria-hidden="true" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                {/* Eyebrow */}
                <FadeIn delay={0} duration={600}>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary-500 mb-6 px-4 py-1.5 rounded-full border border-primary-500/20 bg-primary-500/5">
                        {t.hero?.badge || 'Premium Interior Design'}
                    </span>
                </FadeIn>

                {/* Main Heading — Gradient Text */}
                <FadeIn delay={150} duration={800}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight tracking-tight mb-8 pb-4 bg-gradient-to-r from-gray-900 via-primary-700 to-primary-500 dark:from-white dark:via-primary-300 dark:to-primary-500 bg-clip-text text-transparent">
                        {t.hero.title}
                    </h1>
                </FadeIn>

                {/* Subtitle */}
                <FadeIn delay={350} duration={800}>
                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        {t.hero.subtitle}
                    </p>
                </FadeIn>

                {/* CTA Buttons */}
                <FadeIn delay={550} duration={800}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/projects"
                            className="btn-gradient inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold group"
                        >
                            {t.hero.cta}
                            <span className="material-icons ml-2 text-xl group-hover:translate-x-1 group-hover:scale-110 transition-transform">arrow_forward</span>
                        </Link>
                        <a
                            href="#about"
                            className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 group"
                        >
                            {t.about?.title || 'Learn More'}
                            <span className="material-icons ml-2 text-xl group-hover:translate-y-0.5 transition-transform">south</span>
                        </a>
                    </div>
                </FadeIn>
            </div>

            {/* Scroll Indicator */}
            <FadeIn delay={1000} duration={600}>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
                    <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center pt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
