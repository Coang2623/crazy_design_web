import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();

    return (
        <section className="py-24" id="contact">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/50 rounded-lg shadow-xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t.contact.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            {t.contact.subtitle}
                        </p>
                    </div>
                    <form action="#" method="POST">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input
                                className="w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition"
                                placeholder={t.contact.namePlaceholder}
                                type="text"
                            />
                            <input
                                className="w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition"
                                placeholder={t.contact.emailPlaceholder}
                                type="email"
                            />
                        </div>
                        <div className="mb-6">
                            <textarea
                                className="w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition"
                                placeholder={t.contact.messagePlaceholder}
                                rows="5"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                type="submit"
                            >
                                {t.contact.submit}
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-t border-gray-200 dark:border-gray-700 pt-8">
                        <a href="#" className="flex items-center justify-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <span className="material-icons text-4xl text-blue-600 group-hover:scale-110 transition-transform">facebook</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Crazydesign</span>
                        </a>
                        <a href="#" className="flex items-center justify-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <span className="material-icons text-4xl text-blue-500 group-hover:scale-110 transition-transform">chat</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">0912 345 678</span>
                        </a>
                        <a href="mailto:hello@crazydesign.com" className="flex items-center justify-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <span className="material-icons text-4xl text-red-500 group-hover:scale-110 transition-transform">email</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">hello@crazydesign.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
