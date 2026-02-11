import { describe, it, expect } from 'vitest';
import { config } from '../src/lib/config';

describe('config', () => {
    it('should export a valid config object', () => {
        expect(config).toBeDefined();
        expect(config.site).toBeDefined();
        expect(config.contact).toBeDefined();
        expect(config.api).toBeDefined();
        expect(config.features).toBeDefined();
    });

    it('should have correct site properties', () => {
        expect(config.site.name).toBe('Crazydesign');
        expect(config.site.locales).toContain('en');
        expect(config.site.locales).toContain('vi');
        expect(config.site.defaultLocale).toBe('en');
    });

    it('should have valid contact info', () => {
        expect(config.contact.email).toMatch(/@/);
        expect(config.contact.phone).toBeTruthy();
        expect(config.contact.facebook).toMatch(/^https?:\/\//);
        expect(config.contact.zalo).toMatch(/^https?:\/\//);
    });

    it('should have Formspree API endpoint', () => {
        expect(config.api.formspree).toMatch(/formspree\.io/);
    });

    it('should have feature flags as booleans', () => {
        expect(typeof config.features.darkMode).toBe('boolean');
        expect(typeof config.features.animations).toBe('boolean');
        expect(typeof config.features.analytics).toBe('boolean');
    });
});
