import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/logo.png';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
                <div className="md:flex md:justify-between items-center">
                    <div className="flex items-center space-x-2 mb-6 md:mb-0">
                        <img src={logo} alt="Crazydesign Logo" className="h-10 w-auto" />
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">CRAZYDESIGN</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                        {t.footer.copyright}
                    </div>
                </div>
            </div>
        </footer>
    );
}
