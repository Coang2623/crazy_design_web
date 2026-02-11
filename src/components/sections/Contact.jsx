import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import FadeIn from '../common/FadeIn';

export default function Contact() {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 scroll-mt-20" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800/50 rounded-xl shadow-xl p-6 sm:p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t.contact.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">{t.contact.subtitle}</p>
                        </div>
                        <form action="#" method="POST">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <input
                                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                                    placeholder={t.contact.namePlaceholder}
                                    type="text"
                                />
                                <input
                                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                                    placeholder={t.contact.emailPlaceholder}
                                    type="email"
                                />
                            </div>
                            <div className="mb-6">
                                <textarea
                                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition resize-none"
                                    placeholder={t.contact.messagePlaceholder}
                                    rows="5"
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
                                    type="submit"
                                >
                                    {t.contact.submit}
                                </button>
                            </div>
                        </form>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-gray-200 dark:border-gray-700 pt-8">
                            <a href="#" className="flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                <span className="material-icons text-2xl text-blue-600 group-hover:scale-110 transition-transform">facebook</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Crazydesign</span>
                            </a>
                            <a href="#" className="flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                <span className="material-icons text-2xl text-blue-500 group-hover:scale-110 transition-transform">chat</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">0912 345 678</span>
                            </a>
                            <a href="mailto:hello@crazydesign.com" className="flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                <span className="material-icons text-2xl text-red-500 group-hover:scale-110 transition-transform">email</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">hello@crazydesign.com</span>
                            </a>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
