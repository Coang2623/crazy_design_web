
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Work from '../components/sections/Work';
import Services from '../components/sections/Services';
import Contact from '../components/sections/Contact';

export default function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <>
            <Hero />
            <About />
            <Work />
            <Services />
            <Contact />
        </>
    );
}
