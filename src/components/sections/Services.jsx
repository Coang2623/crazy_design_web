import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useContent } from '../../contexts/ContentContext';
import FadeIn from '../common/FadeIn';

export default function Services() {
    const { language } = useLanguage();
    const { content, get } = useContent();
    const lang = language || 'en';

    // Build services array dynamically from CMS (item1, item2, ..., itemN)
    const services = [];
    const s = content?.services || {};
    let i = 1;
    while (s[`item${i}_icon`] || s[`item${i}_title`]) {
        services.push({
            icon: s[`item${i}_icon`]?.[lang] || s[`item${i}_icon`]?.vi || 'design_services',
            title: s[`item${i}_title`]?.[lang] || s[`item${i}_title`]?.vi || '',
            desc: s[`item${i}_desc`]?.[lang] || s[`item${i}_desc`]?.vi || '',
        });
        i++;
    }

    // Fallback to translation.json if CMS empty
    if (services.length === 0) {
        services.push(
            { icon: 'space_dashboard', title: lang === 'vi' ? 'Thiết Kế Nội Thất' : 'Interior Design', desc: lang === 'vi' ? 'Thiết kế không gian toàn diện.' : 'Holistic space planning and design.' },
            { icon: 'chair', title: lang === 'vi' ? 'Nội Thất Theo Yêu Cầu' : 'Custom Furniture', desc: lang === 'vi' ? 'Nội thất đặt riêng phù hợp với không gian.' : 'Bespoke furniture pieces crafted to fit your space.' },
            { icon: 'construction', title: lang === 'vi' ? 'Quản Lý Dự Án' : 'Project Management', desc: lang === 'vi' ? 'Giám sát toàn diện, đúng tiến độ và ngân sách.' : 'End-to-end oversight, on time and on budget.' },
        );
    }

    return (
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50 scroll-mt-20" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {get('services', 'title', lang)}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {get('services', 'subtitle', lang)}
                        </p>
                    </div>
                </FadeIn>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
                    {services.map((service, index) => (
                        <FadeIn key={index} delay={index * 150}>
                            <div className={`bg-white dark:bg-dark-900 p-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${index === services.length - 1 && services.length % 3 === 1 ? 'sm:col-span-2 md:col-span-1' : ''}`}>
                                <div className="bg-primary-500/10 text-primary-500 w-14 h-14 rounded-full inline-flex items-center justify-center mb-5">
                                    <span className="material-icons text-2xl">{service.icon}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
