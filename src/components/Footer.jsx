import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
                <div className="md:flex md:justify-between items-center">
                    <div className="flex items-center space-x-2 mb-6 md:mb-0">
                        <img className="h-8 w-auto" src="/src/assets/logo.png" alt="logo" />
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">CRAZYDESIGN</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                        © 2025 Crazydesign. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
