import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '@content';
import { Helmet } from 'react-helmet-async';
import FadeIn from '../../components/common/FadeIn';

export default function ProjectsIndex() {
    const { t, i18n } = useTranslation();

    // Filter by language and sort by date
    const sortedProjects = [...projects]
        .filter(p => p.language === (i18n.language || 'en'))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <Helmet>
                <title>{t('work.title')} | Crazydesign</title>
                <meta name="description" content={t('work.subtitle')} />
            </Helmet>

            <section className="pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <FadeIn>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                {t('work.title')}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                {t('work.subtitle')}
                            </p>
                        </div>
                    </FadeIn>

                    {/* Project Grid */}
                    {sortedProjects.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {sortedProjects.map((project, index) => (
                                <FadeIn key={project.slug} delay={index * 100}>
                                    <Link
                                        to={`/projects/${project.slug}`}
                                        className="group block h-full"
                                    >
                                        <article className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                            {/* Image */}
                                            <div className="aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                                                {project.coverImage ? (
                                                    <img
                                                        src={project.coverImage}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <span className="material-icons text-4xl">image</span>
                                                    </div>
                                                )}
                                                {project.featured && (
                                                    <span className="absolute top-3 right-3 text-xs font-bold bg-primary-500 text-white px-2.5 py-1 rounded-full">
                                                        {t('projects.featured')}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 flex flex-col flex-grow">
                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {project.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                                                    {project.title}
                                                </h2>

                                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                                                    {project.summary}
                                                </p>

                                                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                                    <time className="text-xs text-gray-400 font-mono">
                                                        {new Date(project.date).toLocaleDateString(i18n.language, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </time>
                                                    <span className="text-xs text-primary-500 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                                        {t('common.viewProject')} <span className="material-icons text-sm">arrow_forward</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400 items-center flex flex-col">
                            <span className="material-icons text-5xl mb-4 text-gray-300">folder_open</span>
                            <p className="text-lg">{t('common.loading')}</p>
                            <p className="text-sm mt-2 opacity-60">(Or no projects found for this language)</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
