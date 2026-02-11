import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import FadeIn from '../common/FadeIn';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <FadeIn delay={100} duration={800}>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                        {t.hero.title}
                    </h1>
                </FadeIn>
                <FadeIn delay={300} duration={800}>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
                        {t.hero.subtitle}
                    </p>
                </FadeIn>
                <FadeIn delay={500} duration={800}>
                    <Link
                        to="/projects"
                        className="inline-flex items-center bg-primary-500 text-white px-8 py-3.5 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20"
                    >
                        {t.hero.cta}
                        <span className="material-icons ml-2">arrow_forward</span>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
