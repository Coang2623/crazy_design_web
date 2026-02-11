import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '@content';
import FadeIn from '../common/FadeIn';

export default function Work() {
    const { t } = useTranslation();

    // Get 3 most recent projects
    const recentProjects = [...projects]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    return (
        <section className="py-20 md:py-28 scroll-mt-20" id="work">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('work.title')}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{t('work.subtitle')}</p>
                    </div>
                </FadeIn>
                <div className="grid md:grid-cols-3 gap-8">
                    {recentProjects.map((project, index) => (
                        <FadeIn key={project.slug} delay={index * 150}>
                            <Link to={`/projects/${project.slug}`} className="group block h-full">
                                <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                                    <div className="overflow-hidden relative aspect-video">
                                        {project.coverImage ? (
                                            <img
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                src={project.coverImage}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <span className="material-icons text-4xl text-gray-400">image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                                            {project.summary}
                                        </p>
                                        <span className="text-primary-500 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-auto">
                                            {t('common.viewProject')} <span className="material-icons text-sm">arrow_forward</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>

                {/* View All Button */}
                <FadeIn delay={400}>
                    <div className="text-center mt-12">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            {t('common.viewAllProjects')}
                            <span className="material-icons text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
