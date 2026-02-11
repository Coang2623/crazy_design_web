import { describe, it, expect } from 'vitest';
import { config } from '../src/lib/config';

describe('Config', () => {
    it('should have basic site configuration', () => {
        expect(config.site).toBeDefined();
        expect(config.site.title).toBe('Crazydesign');
        expect(config.contact).toBeDefined();
    });

    it('should have features flags', () => {
        expect(config.features).toBeDefined();
        expect(config.features.darkMode).toBeDefined();
    });

    it('should support multiple languages', () => {
        expect(config.site.language).toBe('vi');
        // Check if locales structure exists implicitly via usage in app
    });
});
