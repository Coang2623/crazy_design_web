import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-dark-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
