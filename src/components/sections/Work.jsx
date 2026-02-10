import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import workCoffee from '../../assets/work-coffee.jpg';
import workSpas from '../../assets/work-spas.jpg';
import workStudios from '../../assets/work-studios.jpg';

export default function Work() {
    const { t } = useLanguage();

    return (
        <section className="py-24" id="work">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.work.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t.work.subtitle}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden group">
                        <img
                            alt="The exterior of a modern coffee shop with large windows and outdoor seating"
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            src={workCoffee}
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.work.coffee.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {t.work.coffee.desc}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden group">
                        <img
                            alt="Minimalist coffee shop interior with light-colored walls and built-in shelving"
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            src={workSpas}
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.work.spas.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {t.work.spas.desc}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden group">
                        <img
                            alt="Cozy coffee shop interior with wooden furniture and shelving"
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            src={workStudios}
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.work.studios.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {t.work.studios.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
