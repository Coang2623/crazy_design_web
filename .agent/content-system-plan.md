# Crazy Design - Content System Implementation Plan (MDX + Velite)

This plan outlines the steps to transform the Crazy Design single-page site into a multi-page portfolio and blog platform using modern MDX architecture.

## Phase 1: Foundation & Content Layer Setup (MDX + Velite)

**Goal:** Establish the content management system and basic routing structure.

### 1.1 Install Dependencies
- `velite` (Content loader & schema definition)
- `react-router-dom` (Client-side routing)
- `@mdx-js/react` (MDX component rendering)
- `rehype-slug`, `rehype-autolink-headings` (Markdown enhancements)
- `date-fns` (Date formatting)

### 1.2 Configure Velite
- Create `velite.config.js`
- Define `projects` collection schema:
    - `title`, `slug`, `date`, `coverImage`, `summary`, `tags`, `featured`
- Define `posts` collection schema:
    - `title`, `slug`, `date`, `author`, `tags`, `summary`
- Configure output directory (`.velite`) and assets handling

### 1.3 Update Vite Configuration
- Add Velite plugin to `vite.config.js`
- Ensure alias resolution works for content imports

### 1.4 Create Layout Components
- Refactor `App.jsx` to use `RouterProvider`
- Create `Layout.jsx` (Main wrapper with Header/Footer)
- Create `PageTransition.jsx` (Framer Motion wrapper)

### 1.5 Create Page Structures
- `src/pages/Home.jsx` (Existing landing page refactored)
- `src/pages/projects/index.jsx` (Project Listing)
- `src/pages/projects/[slug].jsx` (Project Detail)
- `src/pages/blog/index.jsx` (Blog Listing)
- `src/pages/blog/[slug].jsx` (Blog Detail)
- `src/pages/NotFound.jsx` (404 Page)

## Phase 2: UI Integration & MDX Components

**Goal:** Display content beautifully with custom components.

### 2.1 MDX Component Mapping
- Create `src/components/mdx/MDXComponents.jsx`
- Map standard HTML tags (`h1`, `p`, `img`, `pre`, `code`) to Tailwind-styled components
- Add custom "Crazy" components:
    - `<ParallaxImage />`
    - `<SectionHeading />`
    - `<InfoBlock />`
    - `<GalleryGrid />`

### 2.2 Content Templates
- **Project Detail Template:**
    - Hero header with full-width cover image
    - Sidebar for metadata (Client, Date, Role)
    - Main content area for ease of reading
    - "Next Project" navigation
- **Blog Detail Template:**
    - Focused reading layout (centered, typography-first)
    - Table of Contents sidebar
    - Author bio section

### 2.3 Listing Pages
- **Project Grid:** Filterable by tag/category
- **Blog List:** Clean list with excerpts and read times

## Phase 3: "Crazy" Interactions & Polish

**Goal:** Add the "wow" factor.

### 3.1 Page Transitions
- Implement `AnimatePresence` for smooth route changes
- Hero element transitions (layoutId)

### 3.2 Scroll Interactions
- Scroll progress bar for long posts
- Reveal animations for content blocks
- Sticky header behavior refinement

## Phase 4: Optimization & SEO

**Goal:** Production readiness.

### 4.1 SEO Setup
- Install `react-helmet-async`
- Create `<SEO />` component handling meta tags, OG images
- generate `sitemap.xml`

### 4.2 Performance
- Image optimization checks
- Bundle analysis
