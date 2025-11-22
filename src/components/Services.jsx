import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-800" id="services">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.services.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t.services.subtitle}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white dark:bg-background-dark p-8 rounded-lg shadow-md">
                        <div className="bg-primary/10 text-primary w-16 h-16 rounded-full inline-flex items-center justify-center mb-6">
                            <span className="material-icons text-3xl">space_dashboard</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.services.interior.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t.services.interior.desc}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-background-dark p-8 rounded-lg shadow-md">
                        <div className="bg-primary/10 text-primary w-16 h-16 rounded-full inline-flex items-center justify-center mb-6">
                            <span className="material-icons text-3xl">chair</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.services.furniture.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t.services.furniture.desc}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-background-dark p-8 rounded-lg shadow-md">
                        <div className="bg-primary/10 text-primary w-16 h-16 rounded-full inline-flex items-center justify-center mb-6">
                            <span className="material-icons text-3xl">construction</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.services.management.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t.services.management.desc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
