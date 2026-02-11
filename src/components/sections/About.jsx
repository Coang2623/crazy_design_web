import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import aboutImage from '../../assets/about-image.jpg';
import FadeIn from '../common/FadeIn';

export default function About() {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50 scroll-mt-20" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <FadeIn direction="left">
                    <img
                        alt="A modern, minimalist spa reception area with a curved white desk"
                        className="rounded-xl shadow-xl w-full h-auto object-cover"
                        src={aboutImage}
                    />
                </FadeIn>
                <FadeIn direction="right" delay={200}>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.about.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                            {t.about.p1}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {t.about.p2}
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
