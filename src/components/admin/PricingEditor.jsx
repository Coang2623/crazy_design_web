// src/components/admin/PricingEditor.jsx
// Admin CMS editor for pricing configuration

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPricingConfig, upsertPricingConfig } from '../../lib/cms';

const COLOR_OPTIONS = ['primary', 'gold', 'emerald', 'slate', 'rose', 'sky'];

function PricingItemCard({ item, onChange, onDelete, lang }) {
    return (
        <div className="bg-gray-50 dark:bg-dark-950 rounded-xl border border-gray-100 dark:border-dark-700 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-xs text-gray-400">Tên (Tiếng Việt)</label>
                    <input value={item.label_vi || item.label || ''} onChange={e => onChange({ ...item, label_vi: e.target.value })}
                        className="w-full text-sm bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 outline-none focus:border-primary-400 dark:text-white" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-400">Name (English)</label>
                    <input value={item.label_en || item.label || ''} onChange={e => onChange({ ...item, label_en: e.target.value })}
                        className="w-full text-sm bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 outline-none focus:border-primary-400 dark:text-white" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {item.basePrice !== undefined && (
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">Giá cơ bản (VNĐ/m²)</label>
                        <input type="number" value={item.basePrice} onChange={e => onChange({ ...item, basePrice: parseInt(e.target.value) || 0 })}
                            className="w-full text-sm bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 outline-none focus:border-primary-400 dark:text-white" />
                    </div>
                )}
                {item.multiplier !== undefined && (
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">Hệ số nhân (multiplier)</label>
                        <input type="number" step="0.05" value={item.multiplier} onChange={e => onChange({ ...item, multiplier: parseFloat(e.target.value) || 1 })}
                            className="w-full text-sm bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 outline-none focus:border-primary-400 dark:text-white" />
                    </div>
                )}
            </div>

            {(item.description_vi !== undefined || item.description_en !== undefined) && (
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">Mô tả (VI)</label>
                        <textarea value={item.description_vi || ''} onChange={e => onChange({ ...item, description_vi: e.target.value })} rows={2}
                            className="w-full text-sm bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 outline-none focus:border-primary-400 dark:text-white resize-none" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">Description (EN)</label>
                        <textarea value={item.description_en || ''} onChange={e => onChange({ ...item, description_en: e.target.value })} rows={2}
                            className="w-full text-sm bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 outline-none focus:border-primary-400 dark:text-white resize-none" />
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <button type="button" onClick={onDelete}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                    <span className="material-icons text-sm">delete</span> Xóa
                </button>
            </div>
        </div>
    );
}

function PricingSection({ title, icon, items, onItemsChange, onSave, saving, saved, sampleItem }) {
    const [open, setOpen] = useState(false);

    const handleAdd = () => onItemsChange([...items, { ...sampleItem, id: `new_${Date.now()}` }]);
    const handleChange = (idx, updated) => onItemsChange(items.map((it, i) => i === idx ? updated : it));
    const handleDelete = (idx) => onItemsChange(items.filter((_, i) => i !== idx));

    return (
        <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 overflow-hidden">
            <button type="button" onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 dark:hover:bg-dark-800/50 transition-colors">
                <div className="flex items-center gap-3">
                    <span className="material-icons text-primary-500">{icon}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{title}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 dark:bg-dark-700 px-2 py-0.5 rounded-full">{items.length} mục</span>
                </div>
                <div className="flex items-center gap-3">
                    {saved && <span className="text-xs text-green-500 flex items-center gap-1 font-medium"><span className="material-icons text-sm">check_circle</span>Đã lưu</span>}
                    <span className={`material-icons text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }}>
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-dark-800 space-y-3 pt-6">
                            {items.map((item, idx) => (
                                <PricingItemCard key={item.id || idx} item={item}
                                    onChange={(updated) => handleChange(idx, updated)}
                                    onDelete={() => handleDelete(idx)} />
                            ))}
                            <button type="button" onClick={handleAdd}
                                className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-dark-700 text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-all text-sm flex items-center justify-center gap-2">
                                <span className="material-icons text-sm">add</span> Thêm mục mới
                            </button>
                            <div className="flex justify-end">
                                <button type="button" onClick={onSave} disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-50">
                                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span className="material-icons text-sm">save</span>}
                                    {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function PricingEditor() {
    const [projectTypes, setProjectTypes] = useState([]);
    const [styles, setStyles] = useState([]);
    const [packages, setPackages] = useState([]);
    const [saving, setSaving] = useState({});
    const [saved, setSaved] = useState({});

    useEffect(() => {
        getPricingConfig().then(({ data }) => {
            if (!data) return;
            for (const row of data) {
                if (row.config_key === 'project_types') setProjectTypes(row.config_value);
                if (row.config_key === 'styles') setStyles(row.config_value);
                if (row.config_key === 'packages') setPackages(row.config_value);
            }
        });
    }, []);

    const saveKey = async (key, value) => {
        setSaving(prev => ({ ...prev, [key]: true }));
        await upsertPricingConfig(key, value);
        setSaving(prev => ({ ...prev, [key]: false }));
        setSaved(prev => ({ ...prev, [key]: true }));
        setTimeout(() => setSaved(prev => ({ ...prev, [key]: false })), 3000);
    };

    return (
        <div className="space-y-4">
            <PricingSection
                title="💰 Loại dự án"
                icon="apartment"
                items={projectTypes}
                onItemsChange={setProjectTypes}
                onSave={() => saveKey('project_types', projectTypes)}
                saving={saving.project_types}
                saved={saved.project_types}
                sampleItem={{ id: `pt_${Date.now()}`, label_vi: 'Loại mới', label_en: 'New Type', multiplier: 1.0 }}
            />
            <PricingSection
                title="🎨 Phong cách thiết kế"
                icon="palette"
                items={styles}
                onItemsChange={setStyles}
                onSave={() => saveKey('styles', styles)}
                saving={saving.styles}
                saved={saved.styles}
                sampleItem={{ id: `st_${Date.now()}`, label_vi: 'Phong cách mới', label_en: 'New Style', basePrice: 300000, multiplier: 1.0, color: 'primary' }}
            />
            <PricingSection
                title="📦 Gói dịch vụ"
                icon="inventory_2"
                items={packages}
                onItemsChange={setPackages}
                onSave={() => saveKey('packages', packages)}
                saving={saving.packages}
                saved={saved.packages}
                sampleItem={{ id: `pkg_${Date.now()}`, label_vi: 'Gói mới', label_en: 'New Package', description_vi: '', description_en: '', multiplier: 1.0 }}
            />
        </div>
    );
}
