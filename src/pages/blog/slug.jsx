import React, { useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { posts } from '@content';
import { useMDX } from '../../hooks/useMDX';
import { Helmet } from 'react-helmet-async';
import FadeIn from '../../components/common/FadeIn';

export default function BlogDetail() {
    const { slug } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const post = posts.find(p => p.slug === slug);

    // Redirect to correct language version
    useEffect(() => {
        if (post && post.language !== i18n.language) {
            const translatedPost = posts.find(p =>
                p.translationKey === post.translationKey &&
                p.language === i18n.language
            );

            if (translatedPost) {
                navigate(`/blog/${translatedPost.slug}`, { replace: true });
            }
        }
    }, [i18n.language, post, navigate]);

    if (!post) return <Navigate to="/blog" replace />;

    const MDXContent = useMDX(post.content);

    const readTime = Math.ceil(post.content.length / 1000) || 5;

    return (
        <>
            <Helmet>
                <title>{post.title} | Crazydesign Journal</title>
                <meta name="description" content={post.summary} />
            </Helmet>

            <article className="min-h-screen pt-32 pb-32 md:pt-40 md:pb-40 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-[720px] mx-auto px-5 sm:px-6">

                    {/* Header */}
                    <header className="mb-12">
                        <FadeIn>
                            <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.1] tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                                {post.title}
                            </h1>

                            <p className="font-article text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                                {post.summary}
                            </p>

                            {/* Author Row */}
                            <div className="flex items-center justify-between border-t border-b border-gray-100 dark:border-gray-800 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-tr from-gray-800 to-gray-600 flex items-center justify-center text-white font-bold text-lg font-serif italic">
                                            {post.author ? post.author[0] : 'C'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-sans font-semibold text-sm text-gray-900 dark:text-white">{post.author}</div>
                                        <div className="font-sans text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(post.date).toLocaleDateString(i18n.language, { month: 'short', day: 'numeric', year: 'numeric' })} · {readTime} min read
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-gray-400 dark:text-gray-500">
                                    <button className="material-icons text-xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors">bookmark_border</button>
                                    <button className="material-icons text-xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors">share</button>
                                </div>
                            </div>
                        </FadeIn>
                    </header>

                    {/* Content - using custom CSS class article-prose */}
                    <FadeIn delay={200}>
                        <div className="article-prose font-article">
                            {/* Feature Image */}
                            {post.coverImage && (
                                <figure className="-mx-5 sm:-mx-8 md:-mx-20 mb-10">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-auto object-cover sm:rounded-md"
                                    />
                                    <figcaption className="text-center font-sans text-sm text-gray-400 mt-3 italic">
                                        Image via Unsplash
                                    </figcaption>
                                </figure>
                            )}

                            {MDXContent ? <MDXContent /> : (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                                </div>
                            )}
                        </div>
                    </FadeIn>

                    {/* Tags */}
                    <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex flex-wrap gap-2 mb-10">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Back */}
                    <div className="flex justify-center">
                        <Link
                            to="/blog"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors font-sans font-medium text-sm"
                        >
                            <span className="material-icons text-sm">west</span>
                            {t('common.backToJournal')}
                        </Link>
                    </div>
                </div>
            </article>
        </>
    );
}
