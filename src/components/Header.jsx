import React, { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a className="flex items-center space-x-2" href="#">
                    {/*<svg className="h-8 w-auto text-primary" fill="none" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*    <path d="M0 100V0H80L80 20L20 20V100H0Z" fill="#F59E0B"></path>*/}
                    {/*    <path className="text-gray-800 dark:text-gray-200" d="M40 80L40 40H60V80H40Z" fill="currentColor"></path>*/}
                    {/*    <path className="text-gray-800 dark:text-gray-200" d="M70 80L80 40L90 80L100 40L110 80H95L90 60L85 80H70Z" fill="currentColor"></path>*/}
                    {/*    <path className="text-gray-800 dark:text-gray-200" d="M120 40H160V60H140V80H160V100H120V40Z" fill="currentColor"></path>*/}
                    {/*</svg>*/}
                    <img className="h-8 w-auto" src="/src/assets/logo.png" alt="logo" />
                    <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">CRAZYDESIGN</span>
                </a>
                <nav className="hidden md:flex items-center space-x-8">
                    <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#about">About Us</a>
                    <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#work">Our Work</a>
                    <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#services">Services</a>
                    <a className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" href="#contact">Contact Us</a>
                </nav>
                <button
                    className="md:hidden text-gray-700 dark:text-gray-300"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="material-icons text-3xl">menu</span>
                </button>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                        <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a>
                        <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#work" onClick={() => setIsMenuOpen(false)}>Our Work</a>
                        <a className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
                        <a className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity inline-block text-center" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
                    </div>
                </div>
            )}
        </header>
    );
}
