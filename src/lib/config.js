/**
 * Centralized site configuration
 * Import this wherever you need site info, contact details, or API endpoints.
 */
export const config = {
    site: {
        name: 'Crazydesign',
        tagline: 'Premium Interior Design',
        url: 'https://crazydesign.vn',
        defaultLocale: 'en',
        locales: ['en', 'vi'],
    },
    contact: {
        email: 'hello@crazydesign.com',
        phone: '+84 912 345 678',
        facebook: 'https://facebook.com/crazydesign',
        zalo: 'https://zalo.me/0912345678',
    },
    api: {
        formspree: 'https://formspree.io/f/xyzexample', // Replace with your real Formspree ID
    },
    features: {
        darkMode: true,
        animations: true,
        analytics: false,
    },
};
