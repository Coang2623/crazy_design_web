import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import FadeIn from '../common/FadeIn';

export default function Services() {
    const { t } = useLanguage();

    const services = [
        { icon: 'space_dashboard', title: t.services.interior.title, desc: t.services.interior.desc },
        { icon: 'chair', title: t.services.furniture.title, desc: t.services.furniture.desc },
        { icon: 'construction', title: t.services.management.title, desc: t.services.management.desc },
    ];

    return (
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50 scroll-mt-20" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.services.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{t.services.subtitle}</p>
                    </div>
                </FadeIn>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
                    {services.map((service, index) => (
                        <FadeIn key={index} delay={index * 150}>
                            <div className={`bg-white dark:bg-dark-900 p-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${index === 2 ? 'sm:col-span-2 md:col-span-1' : ''}`}>
                                <div className="bg-primary-500/10 text-primary-500 w-14 h-14 rounded-full inline-flex items-center justify-center mb-5">
                                    <span className="material-icons text-2xl">{service.icon}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
