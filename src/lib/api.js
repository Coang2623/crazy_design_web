/**
 * Data layer abstraction for portfolio and blog services.
 * Currently uses static Velite data, but designed for easy migration to API/CMS.
 */
import { projects, posts } from '@content';

export const portfolioService = {
    /** Get all projects, optionally filtered by language */
    getAll(language) {
        if (language) {
            return projects.filter(p => p.language === language);
        }
        return projects;
    },

    /** Get a single project by slug */
    getBySlug(slug) {
        return projects.find(p => p.slug === slug) || null;
    },

    /** Get projects by category/tag */
    getByCategory(category, language) {
        return projects
            .filter(p => (!language || p.language === language))
            .filter(p => p.tags?.includes(category));
    },

    /** Get unique categories/tags */
    getCategories(language) {
        const filtered = language ? projects.filter(p => p.language === language) : projects;
        const tags = new Set();
        filtered.forEach(p => p.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    },

    /** Get related projects (same tags, different slug) */
    getRelated(slug, limit = 3) {
        const project = this.getBySlug(slug);
        if (!project) return [];
        return projects
            .filter(p => p.slug !== slug && p.language === project.language)
            .filter(p => p.tags?.some(tag => project.tags?.includes(tag)))
            .slice(0, limit);
    },
};

export const blogService = {
    /** Get all posts, optionally filtered by language, sorted by date desc */
    getAll(language) {
        let result = [...posts];
        if (language) {
            result = result.filter(p => p.language === language);
        }
        return result.sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    /** Get a single post by slug */
    getBySlug(slug) {
        return posts.find(p => p.slug === slug) || null;
    },

    /** Get posts by tag */
    getByTag(tag, language) {
        return this.getAll(language).filter(p => p.tags?.includes(tag));
    },

    /** Get unique tags */
    getTags(language) {
        const filtered = language ? posts.filter(p => p.language === language) : posts;
        const tags = new Set();
        filtered.forEach(p => p.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    },
};
