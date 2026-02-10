# Crazydesign Website Refactoring Plan

**Created:** 2026-01-29  
**Version:** 1.0  
**Status:** Draft - Pending Approval

---

## 📋 Executive Summary

This document outlines a comprehensive refactoring plan for the Crazydesign website, addressing five key dimensions:

1. **Visual Refresh** — Modern, premium aesthetic with dynamic animations
2. **Code Organization** — Clean, maintainable, scalable codebase
3. **Performance** — Optimized loading and rendering
4. **New Features** — Enhanced functionality and user experience
5. **Scalability** — Future-proof architecture

---

## 🎯 Understanding Summary

### What We're Building
A complete overhaul of the Crazydesign interior design portfolio website, transforming it from a basic React site into a premium, performant, and scalable web application.

### Current State Analysis

| Aspect | Current | Issues |
|--------|---------|--------|
| **Framework** | React 18 + Vite 5 | ✅ Good foundation |
| **Styling** | TailwindCSS 3.4 | Inline classes create maintenance overhead |
| **Structure** | Flat component folder | No organization, hard to scale |
| **Routing** | None (scroll-based) | Limits SEO and deep-linking |
| **Animations** | Basic hover only | Feels static and dated |
| **Images** | Static imports | No optimization, large bundle |
| **State** | Context API | Simple but sufficient |
| **i18n** | Custom implementation | Works but not standard |
| **Forms** | No validation/backend | Non-functional contact form |

### Target Users
- Potential clients (businesses needing interior design)
- Design enthusiasts browsing portfolio
- Partners and collaborators

### Success Criteria
- [ ] Lighthouse Performance score ≥ 90
- [ ] First Contentful Paint < 1.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Modern, premium visual aesthetic
- [ ] Clear component architecture
- [ ] Functional contact form
- [ ] SEO-friendly structure

---

## 🎨 A) Visual Refresh

### Goals
Transform the current basic design into a premium, state-of-the-art aesthetic that immediately impresses visitors.

### Design System Updates

#### 1. Color Palette Enhancement

**Current:**
```javascript
primary: "#F59E0B"  // Amber - too generic
```

**Proposed:**
```javascript
colors: {
  // Primary gradient palette
  primary: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FFC107',  // Main accent
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
  },
  // Rich dark palette for premium feel
  dark: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
  // Accent colors for visual interest
  accent: {
    copper: '#B87333',
    bronze: '#CD7F32',
    champagne: '#F7E7CE',
  }
}
```

#### 2. Typography System

**Current:** Roboto Mono (monospace) - not ideal for design portfolio

**Proposed:**
```javascript
fontFamily: {
  display: ['Playfair Display', 'serif'],     // Headings - elegant, premium
  body: ['Inter', 'sans-serif'],               // Body text - clean, readable
  accent: ['Space Grotesk', 'sans-serif'],     // UI elements - modern
}
```

#### 3. Visual Effects & Animations

| Effect | Implementation | Usage |
|--------|---------------|-------|
| **Glassmorphism** | `backdrop-blur-xl bg-white/10` | Header, cards |
| **Gradient text** | `bg-gradient-to-r bg-clip-text text-transparent` | Headlines |
| **Smooth scrolling** | CSS `scroll-behavior: smooth` | Navigation |
| **Micro-animations** | Framer Motion / CSS keyframes | Buttons, cards, sections |
| **Parallax** | CSS `transform: translateY()` on scroll | Hero, backgrounds |
| **Reveal animations** | Intersection Observer + CSS | Section entries |

#### 4. Component Visual Upgrades

##### Hero Section
- [ ] Add gradient mesh background or animated shapes
- [ ] Implement text reveal animation on load
- [ ] Add floating decorative elements
- [ ] Create depth with layered parallax

##### Cards (Work, Services)
- [ ] Add hover lift effect with shadow scaling
- [ ] Implement border gradient on hover
- [ ] Add subtle inner glow
- [ ] Image zoom on hover with overlay

##### Navigation
- [ ] Glassmorphic header with blur
- [ ] Active state indicator animation
- [ ] Mobile menu slide-in animation
- [ ] Scroll-triggered background change

##### Buttons
- [ ] Gradient backgrounds
- [ ] Hover ripple effect
- [ ] Loading state animations
- [ ] Icon transformations on hover

### Implementation Priority
1. Design system tokens (colors, typography, spacing)
2. Hero section redesign
3. Navigation enhancement
4. Card components
5. Form styling
6. Micro-interactions

---

## 🏗️ B) Code Organization

### Goals
Create a maintainable, scalable codebase with clear separation of concerns and consistent patterns.

### Proposed Directory Structure

```
src/
├── app/                      # App-level configuration
│   ├── App.jsx
│   ├── routes.jsx            # Route definitions
│   └── providers.jsx         # Context providers wrapper
│
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── portfolio/
│   │   └── icons/
│   └── fonts/
│
├── components/
│   ├── common/               # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── index.js          # Barrel export
│   │
│   ├── layout/               # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Container/
│   │   └── Section/
│   │
│   └── sections/             # Page sections
│       ├── Hero/
│       ├── About/
│       ├── Portfolio/
│       ├── Services/
│       └── Contact/
│
├── hooks/                    # Custom React hooks
│   ├── useScrollPosition.js
│   ├── useIntersectionObserver.js
│   ├── useMediaQuery.js
│   └── index.js
│
├── contexts/                 # React contexts
│   ├── LanguageContext/
│   │   ├── LanguageContext.jsx
│   │   ├── LanguageProvider.jsx
│   │   └── index.js
│   └── ThemeContext/
│
├── lib/                      # Utilities & helpers
│   ├── utils.js
│   ├── constants.js
│   └── api.js
│
├── styles/                   # Global styles
│   ├── globals.css
│   ├── variables.css
│   ├── animations.css
│   └── typography.css
│
├── data/                     # Static data
│   ├── translations/
│   │   ├── en.json
│   │   └── vi.json
│   ├── portfolio.js
│   └── services.js
│
└── pages/                    # Page components (if adding routing)
    ├── Home/
    ├── Portfolio/
    ├── PortfolioDetail/
    └── Contact/
```

### Component Architecture Pattern

Each component folder should follow this structure:
```
ComponentName/
├── ComponentName.jsx         # Main component
├── ComponentName.module.css  # Scoped styles (if needed)
├── ComponentName.test.jsx    # Unit tests
├── useComponentName.js       # Component-specific hook (if needed)
└── index.js                  # Barrel export
```

### Coding Standards

#### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HeroSection.jsx` |
| Hooks | camelCase with `use` prefix | `useScrollPosition.js` |
| Utilities | camelCase | `formatDate.js` |
| Constants | SCREAMING_SNAKE_CASE | `API_ENDPOINTS` |
| CSS Modules | camelCase | `styles.heroContainer` |

#### Component Structure Template
```jsx
// 1. Imports (grouped and ordered)
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Hooks
import { useLanguage } from '@/hooks';

// Components
import { Button, Card } from '@/components/common';

// Styles
import styles from './ComponentName.module.css';

// Constants
import { ANIMATION_DURATION } from '@/lib/constants';

// 2. Component Definition
export function ComponentName({ prop1, prop2 }) {
  // Hooks
  const { t } = useLanguage();
  
  // State
  const [state, setState] = useState(null);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // Handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}

// 3. PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// 4. Default Props
ComponentName.defaultProps = {
  prop2: 0,
};
```

### Path Aliases
Add to `vite.config.js`:
```javascript
resolve: {
  alias: {
    '@': '/src',
    '@components': '/src/components',
    '@hooks': '/src/hooks',
    '@lib': '/src/lib',
    '@assets': '/src/assets',
    '@styles': '/src/styles',
  }
}
```

---

## ⚡ C) Performance Optimization

### Goals
Achieve Lighthouse score ≥ 90, FCP < 1.5s, and smooth 60fps interactions.

### Image Optimization

#### Current Issues
- Large unoptimized JPG files (300-475KB each)
- No lazy loading
- No responsive images
- Images bundled with JavaScript

#### Solutions

| Strategy | Implementation |
|----------|---------------|
| **Format conversion** | Convert to WebP/AVIF with fallbacks |
| **Lazy loading** | `loading="lazy"` + Intersection Observer |
| **Responsive images** | `srcset` with multiple sizes |
| **Image compression** | Sharp/ImageOptim during build |
| **CDN** | Consider Cloudinary or similar |

##### Responsive Image Component
```jsx
function OptimizedImage({ src, alt, sizes }) {
  return (
    <picture>
      <source 
        srcSet={`${src}-400.webp 400w, ${src}-800.webp 800w, ${src}-1200.webp 1200w`}
        type="image/webp"
      />
      <source 
        srcSet={`${src}-400.jpg 400w, ${src}-800.jpg 800w, ${src}-1200.jpg 1200w`}
        type="image/jpeg"
      />
      <img 
        src={`${src}-800.jpg`} 
        alt={alt}
        loading="lazy"
        decoding="async"
        sizes={sizes}
      />
    </picture>
  );
}
```

### Code Splitting

| Technique | Application |
|-----------|-------------|
| **Route-based splitting** | Lazy load pages with `React.lazy()` |
| **Component-based splitting** | Heavy components (modals, galleries) |
| **Dynamic imports** | Load features on demand |

```jsx
// Route-based code splitting
const PortfolioDetail = React.lazy(() => import('./pages/PortfolioDetail'));

// With loading boundary
<Suspense fallback={<LoadingSpinner />}>
  <PortfolioDetail />
</Suspense>
```

### Bundle Optimization

#### Current Analysis Needs
- Run `npx vite-bundle-visualizer` to analyze bundle
- Identify large dependencies

#### Optimization Strategies
1. **Tree shaking** - Ensure no unused exports
2. **Dependency audit** - Remove unused packages
3. **Chunk optimization** - Configure Vite's `manualChunks`
4. **Minification** - Already handled by Vite

#### Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
        }
      }
    },
    cssCodeSplit: true,
    minify: 'terser',
  }
});
```

### Runtime Performance

| Optimization | Implementation |
|--------------|---------------|
| **Debounce scroll handlers** | `lodash.debounce` or custom |
| **Memoize expensive renders** | `React.memo`, `useMemo`, `useCallback` |
| **Virtual scrolling** | For long lists (if needed) |
| **Reduce re-renders** | Proper state management |

### Loading Strategy

```
1. Critical CSS inline in <head>
2. Preload key fonts
3. Preconnect to external origins
4. Defer non-critical scripts
5. Progressive image loading (blur → full)
```

#### HTML Head Optimization
```html
<head>
  <!-- Preconnect to fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preload critical font -->
  <link rel="preload" as="font" type="font/woff2" 
        href="/fonts/playfair-display.woff2" crossorigin>
  
  <!-- Critical CSS inline -->
  <style>/* Above-fold critical styles */</style>
</head>
```

---

## 🚀 D) New Features

### Goals
Add functionality that enhances user experience and business value.

### Feature List

#### 1. Multi-Page Routing (Priority: High)

**Why:** Better SEO, deep-linking, cleaner navigation

**Implementation:**
```jsx
// Using React Router v6
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/:id', element: <PortfolioDetail /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ]
  }
]);
```

**New Pages:**
- `/` - Home (scrollable landing)
- `/portfolio` - Full portfolio gallery
- `/portfolio/:slug` - Individual project details
- `/services` - Detailed services page
- `/about` - Team and company story
- `/contact` - Dedicated contact page

#### 2. Enhanced Portfolio Section (Priority: High)

**Features:**
- [ ] Filter by category (Coffee Shops, Spas, Studios)
- [ ] Lightbox image gallery
- [ ] Project detail pages with multiple images
- [ ] Before/after comparisons (slider)
- [ ] Video integration support

**Data Structure:**
```javascript
const projects = [
  {
    id: 'modern-cafe-district-1',
    slug: 'modern-cafe-district-1',
    title: { en: 'Modern Café', vi: 'Quán Cà Phê Hiện Đại' },
    category: 'coffee-shop',
    description: { en: '...', vi: '...' },
    thumbnail: '/images/portfolio/cafe-1-thumb.webp',
    images: [
      '/images/portfolio/cafe-1-1.webp',
      '/images/portfolio/cafe-1-2.webp',
    ],
    client: 'ABC Coffee Co.',
    location: 'District 1, HCMC',
    completedDate: '2025-08',
    services: ['interior-design', 'custom-furniture'],
  }
];
```

#### 3. Functional Contact Form (Priority: High)

**Implementation Options:**

| Option | Pros | Cons |
|--------|------|------|
| **Formspree** | Easy setup, free tier | Third-party dependency |
| **EmailJS** | No backend needed | Limited free tier |
| **Netlify Forms** | If deploying to Netlify | Platform lock-in |
| **Custom backend** | Full control | Requires server |

**Recommended: Formspree** (easiest for static site)

**Form Features:**
- [ ] Client-side validation
- [ ] Loading states
- [ ] Success/error feedback
- [ ] Anti-spam (honeypot + reCAPTCHA)
- [ ] Auto-reply email

```jsx
function ContactForm() {
  const [status, setStatus] = useState('idle');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const response = await fetch('https://formspree.io/f/YOUR_ID', {
      method: 'POST',
      body: new FormData(e.target),
      headers: { Accept: 'application/json' }
    });
    
    setStatus(response.ok ? 'success' : 'error');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

#### 4. Dark/Light Theme Toggle (Priority: Medium)

**Current:** Dark mode classes exist but no toggle

**Implementation:**
```jsx
// ThemeContext.jsx
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

#### 5. Scroll Animations (Priority: Medium)

**Library:** Framer Motion or vanilla Intersection Observer

**Animation Types:**
- Fade in on scroll
- Slide up on scroll
- Staggered children animations
- Parallax effects

```jsx
// Using Framer Motion
import { motion } from 'framer-motion';

function AnimatedSection({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
```

#### 6. Image Gallery/Lightbox (Priority: Medium)

**Library Options:** 
- `react-image-lightbox`
- `yet-another-react-lightbox`
- Custom with Framer Motion

**Features:**
- Keyboard navigation
- Touch gestures (swipe)
- Zoom capability
- Thumbnail strip

#### 7. Testimonials Section (Priority: Low)

**Features:**
- Auto-rotating carousel
- Client logos
- Video testimonials support

#### 8. Blog/News Section (Priority: Low)

**Options:**
- Markdown files with frontmatter
- Headless CMS (Sanity, Contentful, Strapi)
- Simple JSON data

---

## 📈 E) Scalability

### Goals
Build architecture that supports future growth without major rewrites.

### Architectural Decisions

#### 1. Component Library Foundation

Create reusable, documented components that can grow:

```
components/common/
├── Button/           # Multiple variants
├── Card/             # Composable card system
├── Input/            # Form inputs
├── Typography/       # Consistent text components
├── Icon/             # Icon system
├── Modal/            # Accessible modals
├── Tooltip/          # Information tooltips
└── Loading/          # Loading states
```

**Component API Design:**
```jsx
// Design for extensibility
<Button 
  variant="primary" | "secondary" | "ghost" | "outline"
  size="sm" | "md" | "lg"
  loading={boolean}
  disabled={boolean}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
>
  Click me
</Button>
```

#### 2. Data Layer Abstraction

Prepare for future CMS or API integration:

```javascript
// lib/api.js
export const portfolioService = {
  async getAll() {
    // Currently: return static data
    return portfolioData;
    
    // Future: fetch from API
    // return fetch('/api/portfolio').then(r => r.json());
  },
  
  async getById(id) {
    return portfolioData.find(p => p.id === id);
  },
  
  async getByCategory(category) {
    return portfolioData.filter(p => p.category === category);
  }
};
```

#### 3. Internationalization Upgrade

**Current:** Custom context with hardcoded translations

**Upgrade to:** `react-i18next` for industry-standard i18n

Benefits:
- Pluralization support
- Date/number formatting
- Namespace organization
- Dynamic loading
- Translation management tools integration

```javascript
// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    vi: { translation: viTranslations },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});
```

#### 4. Configuration Management

```javascript
// lib/config.js
export const config = {
  site: {
    name: 'Crazydesign',
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
    formspree: 'https://formspree.io/f/YOUR_ID',
  },
  features: {
    darkMode: true,
    animations: true,
    analytics: false,
  }
};
```

#### 5. SEO & Meta Management

```jsx
// components/common/SEO/SEO.jsx
import { Helmet } from 'react-helmet-async';

export function SEO({ title, description, image, article }) {
  const siteTitle = 'Crazydesign';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
```

#### 6. Analytics Ready

```javascript
// lib/analytics.js
export const analytics = {
  pageView(url) {
    if (config.features.analytics) {
      // Google Analytics, Plausible, etc.
      gtag('config', 'GA_ID', { page_path: url });
    }
  },
  
  event(name, params) {
    if (config.features.analytics) {
      gtag('event', name, params);
    }
  },
  
  // Specific events
  contactFormSubmit() {
    this.event('contact_form_submit');
  },
  
  portfolioItemView(item) {
    this.event('portfolio_view', { item_id: item.id });
  }
};
```

---

## 📅 Implementation Phases

### Phase 1: Foundation (Week 1)
**Focus:** Code organization & build setup

- [ ] Restructure directory layout
- [ ] Set up path aliases
- [ ] Configure ESLint & Prettier
- [ ] Update Tailwind config with new design tokens
- [ ] Create base component library structure
- [ ] Set up CSS variables for theming

**Deliverables:**
- New folder structure
- Updated configuration files
- Base design tokens

---

### Phase 2: Core Components (Week 2)
**Focus:** Reusable component library

- [ ] Build Button component with variants
- [ ] Build Card component system
- [ ] Build Input/Form components
- [ ] Build Section/Container layouts
- [ ] Build Typography components
- [ ] Create animation utilities

**Deliverables:**
- `/components/common/` fully populated
- Component documentation

---

### Phase 3: Visual Upgrade (Week 3)
**Focus:** Design implementation

- [ ] Implement new typography (Google Fonts)
- [ ] Apply new color palette
- [ ] Redesign Hero section
- [ ] Upgrade Header with glassmorphism
- [ ] Add scroll animations
- [ ] Implement dark/light theme toggle

**Deliverables:**
- Visually upgraded homepage
- Theme switching functionality

---

### Phase 4: Sections Rebuild (Week 4)
**Focus:** Section-by-section upgrade

- [ ] Rebuild About section
- [ ] Rebuild Portfolio/Work section with filtering
- [ ] Rebuild Services section
- [ ] Rebuild Contact section with working form
- [ ] Rebuild Footer

**Deliverables:**
- All sections upgraded
- Functional contact form

---

### Phase 5: Routing & Pages (Week 5)
**Focus:** Multi-page architecture

- [ ] Install and configure React Router
- [ ] Create page components
- [ ] Implement portfolio detail pages
- [ ] Add route-based code splitting
- [ ] Implement SEO component

**Deliverables:**
- Multi-page navigation
- Portfolio detail pages
- SEO meta tags

---

### Phase 6: Performance & Polish (Week 6)
**Focus:** Optimization & finishing touches

- [ ] Optimize images (WebP conversion)
- [ ] Implement lazy loading
- [ ] Bundle analysis and optimization
- [ ] Lighthouse audit and fixes
- [ ] Cross-browser testing
- [ ] Mobile responsiveness audit
- [ ] Accessibility audit (a11y)

**Deliverables:**
- Lighthouse score ≥ 90
- Production-ready build

---

## 📦 New Dependencies

| Package | Purpose | Priority |
|---------|---------|----------|
| `react-router-dom` | Client-side routing | High |
| `framer-motion` | Animations | High |
| `react-helmet-async` | SEO management | High |
| `react-i18next` + `i18next` | Internationalization | Medium |
| `react-hook-form` | Form handling | Medium |
| `zod` or `yup` | Form validation | Medium |
| `yet-another-react-lightbox` | Image gallery | Medium |
| `sharp` | Image optimization (build) | Medium |
| `@tanstack/react-query` | Data fetching (future) | Low |

---

## 🔧 Configuration Updates

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx",
    "lint:fix": "eslint . --ext js,jsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,css}\"",
    "analyze": "npx vite-bundle-visualizer",
    "optimize-images": "node scripts/optimize-images.js",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### Vite Config Updates
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
        },
      },
    },
  },
});
```

---

## ⚠️ Assumptions

1. **Deployment remains on GitHub Pages** - No server-side rendering needed
2. **Static content** - No CMS in initial phase, data stored as JSON/JS
3. **Form handling via Formspree** - No custom backend
4. **Bilingual only** - English and Vietnamese
5. **Modern browser support** - No IE11 polyfills needed
6. **Budget allows new dependencies** - Can add required packages

---

## ❓ Open Questions

Before proceeding to implementation, please confirm:

1. **Form backend:** Is Formspree acceptable, or do you have another preference?
2. **Analytics:** Do you need Google Analytics or another analytics tool?
3. **Hosting:** Will you continue with GitHub Pages, or consider Vercel/Netlify?
4. **Portfolio content:** How many projects should we plan for? 10? 50? 100+?
5. **Blog/News:** Is this a future requirement we should architect for now?
6. **Timeline:** Is the 6-week phased approach acceptable?
7. **Design preferences:** Any specific websites you'd like to draw inspiration from?

---

## 📝 Decision Log

| # | Decision | Alternatives | Rationale |
|---|----------|--------------|-----------|
| 1 | Keep React + Vite | Next.js, Remix | Simpler for static site, already in place |
| 2 | Use React Router for routing | Wouter, TanStack Router | Industry standard, large community |
| 3 | Use Framer Motion for animations | GSAP, anime.js | Excellent React integration |
| 4 | Use Formspree for forms | EmailJS, custom backend | Easy setup, no backend needed |
| 5 | Upgrade i18n to react-i18next | Keep custom | Industry standard, better tooling |
| 6 | CSS Modules for component styles | Styled Components, Emotion | Works well with Tailwind, no runtime |
| 7 | Playfair Display + Inter fonts | Other combinations | Premium feel, great readability |

---

## ✅ Next Steps

1. **Review this plan** and provide feedback
2. **Answer open questions** above
3. **Confirm or adjust timeline**
4. **Approve to proceed** with Phase 1

---

> **"Does this accurately reflect your intent? Please confirm or correct anything before we move to implementation."**
