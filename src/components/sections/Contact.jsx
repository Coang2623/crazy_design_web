import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { config } from '../../lib/config';
import FadeIn from '../common/FadeIn';

export default function Contact() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = true;
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = true;
        if (!formData.message.trim()) errs.message = true;
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('loading');
        try {
            const response = await fetch(config.api.formspree, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const inputClass = (field) =>
        `w-full bg-gray-100 dark:bg-gray-900 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition ${errors[field] ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'
        }`;

    return (
        <section className="py-20 md:py-28 scroll-mt-20" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800/50 rounded-xl shadow-xl p-6 sm:p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t.contact.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">{t.contact.subtitle}</p>
                        </div>

                        {/* Success Message */}
                        {status === 'success' && (
                            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                                <span className="material-icons text-green-500 text-2xl mb-1 block">check_circle</span>
                                <p className="text-green-700 dark:text-green-300 font-medium text-sm">
                                    {t.contact?.successMessage || 'Message sent successfully! We\'ll get back to you soon.'}
                                </p>
                            </div>
                        )}

                        {/* Error Message */}
                        {status === 'error' && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
                                <span className="material-icons text-red-500 text-2xl mb-1 block">error_outline</span>
                                <p className="text-red-700 dark:text-red-300 font-medium text-sm">
                                    {t.contact?.errorMessage || 'Something went wrong. Please try again later.'}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                            {/* Honeypot anti-spam */}
                            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <input
                                        className={inputClass('name')}
                                        placeholder={t.contact.namePlaceholder}
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.name && <p className="text-red-400 text-xs mt-1">Required</p>}
                                </div>
                                <div>
                                    <input
                                        className={inputClass('email')}
                                        placeholder={t.contact.emailPlaceholder}
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-1">Invalid email</p>}
                                </div>
                            </div>
                            <div className="mb-6">
                                <textarea
                                    className={inputClass('message')}
                                    placeholder={t.contact.messagePlaceholder}
                                    rows="5"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    style={{ resize: 'none' }}
                                />
                                {errors.message && <p className="text-red-400 text-xs mt-1">Required</p>}
                            </div>
                            <div className="text-center">
                                <button
                                    className="btn-gradient px-8 py-3 rounded-lg text-base inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="submit"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-icons text-lg">send</span>
                                            {t.contact.submit}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-gray-200 dark:border-gray-700 pt-8">
                            <a href={config.contact.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                <span className="material-icons text-2xl text-blue-600 group-hover:scale-110 transition-transform">facebook</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Crazydesign</span>
                            </a>
                            <a href={config.contact.zalo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                <span className="material-icons text-2xl text-blue-500 group-hover:scale-110 transition-transform">chat</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{config.contact.phone}</span>
                            </a>
                            <a href={`mailto:${config.contact.email}`} className="flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                <span className="material-icons text-2xl text-red-500 group-hover:scale-110 transition-transform">email</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{config.contact.email}</span>
                            </a>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
