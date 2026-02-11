import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import logo from '../../assets/logo.png';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // Debounced scroll handler
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const isActive = useCallback((path) => {
        if (path.includes('#')) {
            const [pathPart, hashPart] = path.split('#');
            return location.pathname === pathPart && location.hash === `#${hashPart}`;
        }
        return location.pathname === path && path !== '/' || (path !== '/' && location.pathname.startsWith(path));
    }, [location.pathname, location.hash]);

    const navLinkClass = useCallback((path) =>
        `text-sm font-medium transition-colors duration-200 ${isActive(path)
            ? 'text-primary-500'
            : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
        }`, [isActive]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0">
                    <img src={logo} alt="Crazydesign Logo" className="h-8 w-auto" />
                    <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">CRAZYDESIGN</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link className={navLinkClass('/#about')} to="/#about">{t.nav.about}</Link>
                    <Link className={navLinkClass('/projects')} to="/projects">{t.nav.work}</Link>
                    <Link className={navLinkClass('/#services')} to="/#services">{t.nav.services}</Link>
                    <Link className={navLinkClass('/blog')} to="/blog">{t.nav.journal}</Link>
                    <Link className="text-sm font-medium bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors shadow-sm" to="/#contact">
                        {t.nav.contact}
                    </Link>
                    <button
                        onClick={toggleLanguage}
                        className="px-2.5 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 transition-colors uppercase"
                    >
                        {language === 'en' ? 'VI' : 'EN'}
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        <span className="material-icons text-xl">{theme === 'light' ? 'brightness_4' : 'brightness_7'}</span>
                    </button>
                </nav>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={toggleLanguage}
                        className="px-2.5 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-bold text-gray-600 dark:text-gray-300"
                    >
                        {language === 'en' ? 'VI' : 'EN'}
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                        aria-label="Toggle dark mode"
                    >
                        <span className="material-icons text-lg">{theme === 'light' ? 'brightness_4' : 'brightness_7'}</span>
                    </button>
                    <button
                        className="text-gray-700 dark:text-gray-300 p-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="material-icons text-2xl">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu — Slide-in Animation */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen
                        ? 'max-h-80 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
                        <Link className={`${navLinkClass('/#about')} transform transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} to="/#about" style={{ transitionDelay: '50ms' }}>{t.nav.about}</Link>
                        <Link className={`${navLinkClass('/projects')} transform transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} to="/projects" style={{ transitionDelay: '100ms' }}>{t.nav.work}</Link>
                        <Link className={`${navLinkClass('/#services')} transform transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} to="/#services" style={{ transitionDelay: '150ms' }}>{t.nav.services}</Link>
                        <Link className={`${navLinkClass('/blog')} transform transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} to="/blog" style={{ transitionDelay: '200ms' }}>{t.nav.journal}</Link>
                        <Link className={`bg-primary-500 text-white px-4 py-2.5 rounded-lg text-center text-sm font-medium hover:bg-primary-600 transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} to="/#contact" style={{ transitionDelay: '250ms' }}>
                            {t.nav.contact}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
