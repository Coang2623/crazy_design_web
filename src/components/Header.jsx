import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../assets/logo.png';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, language, toggleLanguage } = useLanguage();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a className="flex items-center space-x-2" href="#">
                    <img src={logo} alt="Crazydesign Logo" className="h-10 w-auto" />
                    <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">CRAZYDESIGN</span>
                </a>
                <nav className="hidden md:flex items-center space-x-8">
                    <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#about">{t.nav.about}</a>
                    <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#work">{t.nav.work}</a>
                    <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#services">{t.nav.services}</a>
                    <a className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" href="#contact">{t.nav.contact}</a>
                    <button
                        onClick={toggleLanguage}
                        className="ml-4 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                    >
                        {language === 'en' ? 'VI' : 'EN'}
                    </button>
                </nav>
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                    >
                        {language === 'en' ? 'VI' : 'EN'}
                    </button>
                    <button
                        className="text-gray-700 dark:text-gray-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="material-icons text-3xl">menu</span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                        <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#about" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</a>
                        <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#work" onClick={() => setIsMenuOpen(false)}>{t.nav.work}</a>
                        <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#services" onClick={() => setIsMenuOpen(false)}>{t.nav.services}</a>
                        <a className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity inline-block text-center" href="#contact" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</a>
                    </div>
                </div>
            )}
        </header>
    );
}
