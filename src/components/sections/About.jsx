import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import aboutImage from '../../assets/about-image.jpg';

export default function About() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-800" id="about">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img
                        alt="A modern, minimalist spa reception area with a curved white desk"
                        className="rounded-lg shadow-xl w-full h-full object-cover"
                        src={aboutImage}
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.about.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {t.about.p1}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t.about.p2}
                    </p>
                </div>
            </div>
        </section>
    );
}
