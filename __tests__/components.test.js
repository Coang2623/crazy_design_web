import { describe, it, expect } from 'vitest';
import { Button, Card, Input, Lightbox } from '../src/components/common';
import { Hero, About, Work, Services, Contact, Testimonials } from '../src/components/sections';
import { Header, Footer } from '../src/components/layout';

describe('Component Exports', () => {
    it('should export Common components correctly', () => {
        expect(Button).toBeDefined();
        expect(Card).toBeDefined();
        expect(Input).toBeDefined();
        expect(Lightbox).toBeDefined();
    });

    it('should export Section components correctly', () => {
        expect(Hero).toBeDefined();
        expect(About).toBeDefined();
        expect(Work).toBeDefined();
        expect(Services).toBeDefined();
        expect(Contact).toBeDefined();
        expect(Testimonials).toBeDefined();
    });

    it('should export Layout components correctly', () => {
        expect(Header).toBeDefined();
        expect(Footer).toBeDefined();
    });
});
