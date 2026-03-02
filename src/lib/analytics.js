/**
 * Analytics module — ready for Google Analytics, Plausible, or similar.
 * All analytics calls are gated by the config.features.analytics flag.
 */
import { config } from './config';

export const analytics = {
    /** Track a page view */
    pageView(url) {
        if (!config.features.analytics) return;
        if (typeof window.gtag === 'function') {
            window.gtag('config', 'GA_MEASUREMENT_ID', { page_path: url });
        }
        // Plausible
        if (typeof window.plausible === 'function') {
            window.plausible('pageview', { u: url });
        }
    },

    /** Track a custom event */
    event(name, params = {}) {
        if (!config.features.analytics) return;
        if (typeof window.gtag === 'function') {
            window.gtag('event', name, params);
        }
        if (typeof window.plausible === 'function') {
            window.plausible(name, { props: params });
        }
    },

    // — Convenience methods —

    /** Contact form submitted */
    contactFormSubmit() {
        this.event('contact_form_submit', { category: 'engagement' });
    },

    /** Portfolio item viewed */
    portfolioItemView(item) {
        this.event('portfolio_view', {
            item_id: item.slug,
            item_name: item.title,
            category: 'content',
        });
    },

    /** Blog post viewed */
    blogPostView(post) {
        this.event('blog_view', {
            post_id: post.slug,
            post_title: post.title,
            category: 'content',
        });
    },

    /** Language toggled */
    languageToggle(fromLang, toLang) {
        this.event('language_toggle', {
            from: fromLang,
            to: toLang,
            category: 'ui',
        });
    },

    /** Theme toggled */
    themeToggle(theme) {
        this.event('theme_toggle', {
            theme,
            category: 'ui',
        });
    },
};
