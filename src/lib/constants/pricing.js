/**
 * Pricing Constants for Crazydesign
 * Units: VND / m2 (unless specified otherwise)
 */
export const PRICING_DATA = {
    // Base prices for different project types
    projectTypes: [
        { id: 'apartment', label: 'Apartment', multiplier: 1.0 },
        { id: 'villa', label: 'Villa / Townhouse', multiplier: 1.25 },
        { id: 'spa', label: 'Spa / Beauty Center', multiplier: 1.35 },
        { id: 'cafe', label: 'Cafe / Restaurant', multiplier: 1.3 },
    ],

    // Design style modifiers
    styles: [
        { id: 'modern', label: 'Modern Minimalism', basePrice: 250000, color: 'primary' },
        { id: 'luxury', label: 'Luxury / Neoclassic', basePrice: 450000, color: 'gold' },
        { id: 'indochine', label: 'Indochine / Tropical', basePrice: 350000, color: 'emerald' },
        { id: 'industrial', label: 'Industrial / Loft', basePrice: 300000, color: 'slate' },
    ],

    // Service packages
    packages: [
        {
            id: 'design_only',
            label: 'Design Concept',
            description: '3D designs, floor plans, material specs.',
            multiplier: 1.0
        },
        {
            id: 'design_build',
            label: 'Design & Build',
            description: 'Full design + Turnkey construction (estimate).',
            multiplier: 12.5 // Construction is typically much more expensive
        }
    ],

    // Minimum measurable area
    minArea: 10,
    maxArea: 1000,

    // Default values
    defaults: {
        area: 50,
        projectType: 'apartment',
        style: 'modern',
        package: 'design_only'
    }
};
