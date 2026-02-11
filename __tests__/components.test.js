import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: vi.fn(),
    })));
});

describe('FadeIn Component', () => {
    it('should be importable', async () => {
        const module = await import('../src/components/common/FadeIn');
        expect(module.default).toBeDefined();
        expect(typeof module.default).toBe('function');
    });
});

describe('Lightbox Component', () => {
    it('should be importable', async () => {
        const module = await import('../src/components/common/Lightbox');
        expect(module.default).toBeDefined();
        expect(typeof module.default).toBe('function');
    });
});

describe('BeforeAfterSlider Component', () => {
    it('should be importable', async () => {
        const module = await import('../src/components/common/BeforeAfterSlider');
        expect(module.default).toBeDefined();
        expect(typeof module.default).toBe('function');
    });
});

describe('Barrel Exports', () => {
    it('should export common components', async () => {
        const common = await import('../src/components/common/index');
        expect(common.FadeIn).toBeDefined();
        expect(common.Lightbox).toBeDefined();
        expect(common.BeforeAfterSlider).toBeDefined();
    });
});
