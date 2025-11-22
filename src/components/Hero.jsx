import React from 'react';

export default function Hero() {
    return (
        <section className="container mx-auto px-6 py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Crafting Spaces, Inspiring Life.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                We specialize in bespoke furniture and interior design for workshops, spas, and coffee shops, turning your vision into a tangible, beautiful reality.
            </p>
            <a className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center" href="#work">
                View Our Portfolio
                <span className="material-icons ml-2">arrow_forward</span>
            </a>
        </section>
    );
}
