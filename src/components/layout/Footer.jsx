import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/logo.png';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Crazydesign Logo" className="h-8 w-auto" />
                        <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">CRAZYDESIGN</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {t.footer.copyright}
                    </div>
                </div>
            </div>
        </footer>
    );
}
