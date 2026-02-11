import React, { useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '@content';
import { useMDX } from '../../hooks/useMDX';
import { Helmet } from 'react-helmet-async';
import FadeIn from '../../components/common/FadeIn';

export default function ProjectDetail() {
    const { slug } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const project = projects.find(p => p.slug === slug);

    // Redirect to correct language version if available
    useEffect(() => {
        if (project && project.language !== i18n.language) {
            const translatedProject = projects.find(p =>
                p.translationKey === project.translationKey &&
                p.language === i18n.language
            );

            if (translatedProject) {
                navigate(`/projects/${translatedProject.slug}`, { replace: true });
            }
        }
    }, [i18n.language, project, navigate]);

    if (!project) return <Navigate to="/projects" replace />;

    const MDXContent = useMDX(project.content);

    const readTime = Math.ceil(project.content.length / 1000) || 4;

    return (
        <>
            <Helmet>
                <title>{project.title} | Crazydesign</title>
                <meta name="description" content={project.summary} />
            </Helmet>

            <article className="min-h-screen pt-32 pb-32 md:pt-40 md:pb-40 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-[720px] mx-auto px-5 sm:px-6">

                    {/* Header */}
                    <header className="mb-12">
                        <FadeIn>
                            {/* Breadcrumb & Tags */}
                            <div className="flex items-center gap-3 mb-6">
                                <Link
                                    to="/projects"
                                    className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                >
                                    {t('common.backToProjects')}
                                </Link>
                                <span className="text-gray-300 dark:text-gray-700">·</span>
                                {project.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.1] tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                                {project.title}
                            </h1>

                            {/* Summary */}
                            <p className="font-article text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                                {project.summary}
                            </p>

                            {/* Meta Row */}
                            <div className="flex items-center justify-between border-t border-b border-gray-100 dark:border-gray-800 py-5">
                                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1.5 font-medium">
                                        <span className="material-icons text-base">calendar_today</span>
                                        {new Date(project.date).toLocaleDateString(i18n.language, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1.5 font-medium">
                                        <span className="material-icons text-base">schedule</span>
                                        {readTime} min read
                                    </span>
                                </div>
                                <div className="flex gap-3 text-gray-400 dark:text-gray-500">
                                    <button className="material-icons text-xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors">bookmark_border</button>
                                    <button className="material-icons text-xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors">share</button>
                                </div>
                            </div>
                        </FadeIn>
                    </header>

                    {/* Content */}
                    <FadeIn delay={200}>
                        <div className="article-prose font-article">
                            {/* Feature Image */}
                            {project.coverImage && (
                                <figure className="-mx-5 sm:-mx-8 md:-mx-20 mb-10">
                                    <img
                                        src={project.coverImage}
                                        alt={project.title}
                                        className="w-full h-auto object-cover sm:rounded-md"
                                    />
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
                            {project.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Back */}
                    <div className="flex justify-center">
                        <Link
                            to="/projects"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors font-sans font-medium text-sm"
                        >
                            <span className="material-icons text-sm">west</span>
                            {t('common.backToProjects')}
                        </Link>
                    </div>
                </div>
            </article>
        </>
    );
}
