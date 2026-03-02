// src/contexts/ContentContext.jsx
// Provides live CMS content to the entire app, with Supabase realtime sync

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSiteContent, getTestimonials, getPricingConfig, subscribeToContentChanges } from '../lib/cms';

// ─── Default content fallback (from translation.json / original hardcode) ───
const DEFAULTS = {
    hero: {
        badge: { vi: 'Thiết Kế Nội Thất Cao Cấp', en: 'Premium Interior Design' },
        title: { vi: 'Kiến Tạo Không Gian, Truyền Cảm Hứng Cuộc Sống.', en: 'Crafting Spaces, Inspiring Life.' },
        subtitle: { vi: 'Chúng tôi chuyên thiết kế nội thất và đồ nội thất tùy chỉnh cho workshop, spa và quán cà phê.', en: 'We specialize in bespoke furniture and interior design for workshops, spas, and coffee shops.' },
        cta: { vi: 'Xem Portfolio', en: 'View Our Portfolio' },
        image_url: { vi: '', en: '' },
    },
    about: {
        title: { vi: 'Về Chúng Tôi', en: 'Who We Are' },
        p1: { vi: 'Crazydesign không chỉ là một công ty thiết kế...', en: 'Crazydesign is more than just a design firm...' },
        p2: { vi: 'Niềm đam mê của chúng tôi nằm ở những chi tiết...', en: 'Our passion lies in the details...' },
    },
    contact: {
        phone: { vi: '+84 912 345 678', en: '+84 912 345 678' },
        email: { vi: 'hello@crazydesign.vn', en: 'hello@crazydesign.vn' },
        facebook: { vi: 'https://facebook.com/crazydesign', en: 'https://facebook.com/crazydesign' },
        zalo: { vi: 'https://zalo.me/0912345678', en: 'https://zalo.me/0912345678' },
        address: { vi: 'TP. Hồ Chí Minh, Việt Nam', en: 'Ho Chi Minh City, Vietnam' },
    },
};

const ContentContext = createContext(null);

/** Transform flat DB rows into nested { section: { key: { vi, en } } } */
function rowsToMap(rows) {
    const map = {};
    for (const row of rows) {
        if (!map[row.section]) map[row.section] = {};
        map[row.section][row.key] = { vi: row.value_vi ?? '', en: row.value_en ?? '', type: row.type };
    }
    return map;
}

export function ContentProvider({ children }) {
    const [content, setContent] = useState(DEFAULTS);       // { section: { key: { vi, en } } }
    const [testimonials, setTestimonials] = useState([]);
    const [pricingConfig, setPricingConfig] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchAll = useCallback(async () => {
        const [contentRes, testiRes, pricingRes] = await Promise.all([
            getSiteContent(),
            getTestimonials({ adminMode: false }),
            getPricingConfig(),
        ]);

        if (contentRes.data) {
            setContent(prev => ({ ...DEFAULTS, ...rowsToMap(contentRes.data) }));
        }
        if (testiRes.data) {
            setTestimonials(testiRes.data);
        }
        if (pricingRes.data) {
            const pMap = {};
            for (const row of pricingRes.data) pMap[row.config_key] = row.config_value;
            setPricingConfig(pMap);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAll();
        // Subscribe to real-time changes
        const unsubscribe = subscribeToContentChanges(fetchAll);
        return unsubscribe;
    }, [fetchAll]);

    /**
     * Helper: get translated value for a section/key
     * @param {string} section
     * @param {string} key
     * @param {'vi'|'en'} lang
     * @returns {string}
     */
    const get = useCallback((section, key, lang = 'en') => {
        return content[section]?.[key]?.[lang]
            ?? DEFAULTS[section]?.[key]?.[lang]
            ?? '';
    }, [content]);

    return (
        <ContentContext.Provider value={{ content, testimonials, pricingConfig, loading, get, refetch: fetchAll }}>
            {children}
        </ContentContext.Provider>
    );
}

export const useContent = () => {
    const ctx = useContext(ContentContext);
    if (!ctx) throw new Error('useContent must be used inside ContentProvider');
    return ctx;
};
