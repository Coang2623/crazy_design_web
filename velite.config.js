
import { defineConfig, defineCollection, s } from 'velite'

const projects = defineCollection({
    name: 'Project',
    pattern: 'projects/**/*.mdx',
    schema: s.object({
        title: s.string(),
        slug: s.slug('projects'),
        language: s.enum(['en', 'vi']).default('en'),
        translationKey: s.string().optional(), // Used to link translations
        date: s.isodate(),
        coverImage: s.string().optional(),
        summary: s.string(),
        tags: s.array(s.string()),
        featured: s.boolean().default(false),
        content: s.mdx(),
    })
        .transform(data => ({
            ...data,
            translationKey: data.translationKey || data.slug.replace(/-vi$/, '') // Auto-generate key or strip lang suffix
        }))
})

const posts = defineCollection({
    name: 'Post',
    pattern: 'blog/**/*.mdx',
    schema: s.object({
        title: s.string(),
        slug: s.slug('blog'),
        language: s.enum(['en', 'vi']).default('en'),
        translationKey: s.string().optional(),
        date: s.isodate(),
        author: s.string().default('Crazy Design'),
        coverImage: s.string().optional(),
        tags: s.array(s.string()),
        summary: s.string(),
        content: s.mdx(),
    })
        .transform(data => ({
            ...data,
            translationKey: data.translationKey || data.slug.replace(/-vi$/, '')
        }))
})

export default defineConfig({
    root: 'src/content',
    output: {
        data: '.velite',
        assets: 'public/static',
        base: '/static/',
        name: '[name]-[hash:6].[ext]',
        clean: true
    },
    collections: {
        projects,
        posts
    },
    mdx: {
        rehypePlugins: [],
        remarkPlugins: [],
    }
})
