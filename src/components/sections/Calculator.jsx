import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { PRICING_DATA } from '@/lib/constants/pricing';
import FadeIn from '../common/FadeIn';

export default function Calculator() {
    const { t, i18n } = useTranslation();
    const [area, setArea] = useState(PRICING_DATA.defaults.area);
    const [projectType, setProjectType] = useState(PRICING_DATA.defaults.projectType);
    const [style, setStyle] = useState(PRICING_DATA.defaults.style);
    const [servicePackage, setServicePackage] = useState(PRICING_DATA.defaults.package);
    const [total, setTotal] = useState(0);

    // Labels map for Vietnamese
    const styleLabels = {
        vi: {
            modern: 'Hiện Đại Tối Giản',
            luxury: 'Luxury / Tân Cổ Điển',
            indochine: 'Indochine / Nhiệt Đới',
            industrial: 'Industrial / Loft',
        },
        en: {
            modern: 'Modern Minimalism',
            luxury: 'Luxury / Neoclassic',
            indochine: 'Indochine / Tropical',
            industrial: 'Industrial / Loft',
        }
    };

    const typeLabels = {
        vi: {
            apartment: 'Chung Cư',
            villa: 'Nhà Phố',
            spa: 'Spa / Thẩm Mỹ',
            cafe: 'Cafe / Nhà Hàng',
        },
        en: {
            apartment: 'Apartment',
            villa: 'Villa / Townhouse',
            spa: 'Spa / Beauty Center',
            cafe: 'Cafe / Restaurant',
        }
    };

    const packageLabels = {
        vi: {
            design_only: 'Tư Vấn & Thiết Kế',
            design_build: 'Thiết Kế & Thi Công Trọn Gói',
        },
        en: {
            design_only: 'Design Concept Only',
            design_build: 'Design & Build (Turnkey)',
        }
    };

    const packageDescs = {
        vi: {
            design_only: 'Bản vẽ 3D, mặt bằng, thuyết minh vật liệu.',
            design_build: 'Thiết kế đầy đủ + ước tính thi công hoàn thiện.',
        },
        en: {
            design_only: '3D designs, floor plans, material specs.',
            design_build: 'Full design + Turnkey construction estimate.',
        }
    };

    const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';

    const getStyleLabel = (id) => styleLabels[lang]?.[id] || id;
    const getTypeLabel = (id) => typeLabels[lang]?.[id] || id;
    const getPackageLabel = (id) => packageLabels[lang]?.[id] || id;
    const getPackageDesc = (id) => packageDescs[lang]?.[id] || id;

    // Calculate total cost
    useEffect(() => {
        const typeData = PRICING_DATA.projectTypes.find(p => p.id === projectType);
        const styleData = PRICING_DATA.styles.find(s => s.id === style);
        const packageData = PRICING_DATA.packages.find(pkg => pkg.id === servicePackage);

        if (typeData && styleData && packageData) {
            const calculatedTotal = area * styleData.basePrice * typeData.multiplier * packageData.multiplier;
            setTotal(calculatedTotal);
        }
    }, [area, projectType, style, servicePackage]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN').format(Math.round(value));
    };

    return (
        <section className="py-20 md:py-28 bg-white dark:bg-dark-950 scroll-mt-20" id="calculator">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                            {t('calculator.title')}
                        </h2>
                        <div className="w-20 h-1.5 bg-primary-500 mx-auto mb-6"></div>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {t('calculator.subtitle')}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Input Controls */}
                    <FadeIn direction="left" delay={200}>
                        <div className="space-y-8 bg-gray-50 dark:bg-dark-900 p-8 rounded-2xl border border-gray-100 dark:border-dark-800 shadow-sm">
                            {/* Area Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                                    {t('calculator.area')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={area}
                                        onChange={(e) => setArea(Math.max(0, Number(e.target.value)))}
                                        className="w-full bg-white dark:bg-dark-800 border-2 border-gray-200 dark:border-dark-700 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-lg font-medium"
                                        placeholder={t('calculator.placeholder')}
                                    />
                                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">m²</span>
                                </div>
                            </div>

                            {/* Project Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                                    {t('calculator.projectType')}
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {PRICING_DATA.projectTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setProjectType(type.id)}
                                            className={`px-3 py-3 rounded-xl border-2 transition-all text-sm font-medium ${projectType === type.id
                                                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                                                    : 'border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:border-primary-300 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {getTypeLabel(type.id)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Styles */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                                    {t('calculator.style')}
                                </label>
                                <div className="space-y-3">
                                    {PRICING_DATA.styles.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => setStyle(s.id)}
                                            className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all ${style === s.id
                                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                    : 'border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:border-primary-300'
                                                }`}
                                        >
                                            <span className={`font-medium ${style === s.id ? 'text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                                {getStyleLabel(s.id)}
                                            </span>
                                            {style === s.id && (
                                                <span className="material-icons text-xl text-primary-500">check_circle</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Packages */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                                    {t('calculator.package')}
                                </label>
                                <div className="grid gap-4">
                                    {PRICING_DATA.packages.map((pkg) => (
                                        <button
                                            key={pkg.id}
                                            onClick={() => setServicePackage(pkg.id)}
                                            className={`text-left p-5 rounded-xl border-2 transition-all ${servicePackage === pkg.id
                                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                    : 'border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:border-primary-300'
                                                }`}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className={`font-bold ${servicePackage === pkg.id ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
                                                    {getPackageLabel(pkg.id)}
                                                </h4>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${servicePackage === pkg.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                                                    }`}>
                                                    {servicePackage === pkg.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                {getPackageDesc(pkg.id)}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Result Display */}
                    <FadeIn direction="right" delay={400}>
                        <div className="sticky top-28 bg-gray-900 dark:bg-primary-950 rounded-3xl p-10 text-white overflow-hidden shadow-2xl">
                            {/* Decorative element */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="material-icons text-primary-400">assessment</span>
                                {t('calculator.result')}
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex justify-between items-center py-4 border-b border-white/10">
                                    <span className="text-white/60">{t('calculator.area')}</span>
                                    <span className="font-display font-medium text-xl">{area} m²</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-white/10">
                                    <span className="text-white/60">{t('calculator.style')}</span>
                                    <span className="font-medium">{getStyleLabel(style)}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-white/10">
                                    <span className="text-white/60">{t('calculator.package')}</span>
                                    <span className="font-medium text-right max-w-[55%]">{getPackageLabel(servicePackage)}</span>
                                </div>

                                <div className="mt-8 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-2">
                                        {t('calculator.total')}
                                    </p>
                                    <div className="flex items-baseline gap-3">
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={total}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-4xl md:text-5xl font-display font-bold text-white"
                                            >
                                                {formatCurrency(total)}
                                            </motion.span>
                                        </AnimatePresence>
                                        <span className="text-2xl text-white/50">{t('calculator.unit')}</span>
                                    </div>
                                    <p className="mt-4 text-xs text-white/40 italic">
                                        * {lang === 'vi' ? 'Đây là ước tính sơ bộ dựa trên các thông số đã chọn.' : 'This is a preliminary estimation based on selected parameters.'}
                                    </p>
                                </div>

                                <button className="w-full mt-8 bg-primary-500 hover:bg-primary-600 text-white font-bold py-5 rounded-xl transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center gap-3 group">
                                    {t('calculator.sendRequest')}
                                    <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
