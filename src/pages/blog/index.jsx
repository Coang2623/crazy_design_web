import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { posts } from '@content';
import { Helmet } from 'react-helmet-async';
import FadeIn from '../../components/common/FadeIn';

export default function BlogIndex() {
    const { t, i18n } = useTranslation();

    const sortedPosts = [...posts]
        .filter(post => post.language === (i18n.language || 'en'))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <Helmet>
                <title>{t('nav.journal')} | Crazydesign</title>
                <meta name="description" content="Thoughts, ideas, and stories from the Crazydesign team." />
            </Helmet>

            <section className="pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                {t('nav.journal')}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                {t('blog.latest')}
                            </p>
                        </div>
                    </FadeIn>

                    {/* Post List */}
                    {sortedPosts.length > 0 ? (
                        <div className="space-y-0">
                            {sortedPosts.map((post, index) => (
                                <FadeIn key={post.slug} delay={index * 100}>
                                    <Link to={`/blog/${post.slug}`} className="group block">
                                        <article className="py-8 border-b border-gray-200 dark:border-gray-700 hover:border-primary-500/50 transition-colors">
                                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
                                                {/* Date */}
                                                <time className="text-sm text-gray-400 font-mono shrink-0 sm:w-32">
                                                    {new Date(post.date).toLocaleDateString(i18n.language, { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </time>

                                                {/* Content */}
                                                <div className="flex-grow min-w-0">
                                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                                                        {post.title}
                                                    </h2>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                                                        {post.summary}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {post.tags.map(tag => (
                                                            <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Arrow */}
                                                <span className="hidden sm:block text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all shrink-0">
                                                    <span className="material-icons">arrow_forward</span>
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400 items-center flex flex-col">
                            <span className="material-icons text-5xl mb-4 text-gray-300">article</span>
                            <p className="text-lg">{t('common.loading')}</p>
                            <p className="text-sm mt-2 opacity-60">(Or no articles found for this language)</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
