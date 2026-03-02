// src/components/admin/ServicesEditor.jsx
// Admin CMS editor for Services section — title, subtitle + CRUD for each service item

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { upsertManySiteContent } from '../../lib/cms';
import { useContent } from '../../contexts/ContentContext';

// Popular Material Icons for interior/design services
const ICON_SUGGESTIONS = [
    'space_dashboard', 'chair', 'construction', 'design_services',
    'home', 'architecture', 'palette', 'light_mode', 'weekend',
    'bed', 'bathtub', 'kitchen', 'living', 'dining', 'deck',
    'storefront', 'spa', 'local_cafe', 'restaurant', 'factory',
    'carpenter', 'hardware', 'handyman', 'build', 'brush',
    'straighten', 'draw', 'square_foot', 'grid_view', 'layers',
];

function IconPicker({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filtered = search
        ? ICON_SUGGESTIONS.filter(i => i.includes(search.toLowerCase().replace(/\s/g, '_')))
        : ICON_SUGGESTIONS;

    return (
        <div className="space-y-2 relative">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Icon (Material Icons)</span>
            <div className="flex gap-2 items-center">
                {/* Preview */}
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                    <span className="material-icons text-primary-500">{value || 'help_outline'}</span>
                </div>
                {/* Text input */}
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setOpen(true)}
                    placeholder="Tên icon, vd: chair"
                    className="flex-1 text-sm bg-gray-50 dark:bg-dark-900/50 border border-gray-200 dark:border-dark-700 rounded-xl px-3 py-2 outline-none focus:border-primary-400 dark:text-white"
                />
                <button type="button" onClick={() => setOpen(o => !o)}
                    className="px-3 py-2 text-xs bg-gray-100 dark:bg-dark-700 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                    Chọn
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl shadow-xl p-3 space-y-2"
                    >
                        <input
                            autoFocus
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Tìm icon..."
                            className="w-full text-xs bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 outline-none focus:border-primary-400 dark:text-white"
                        />
                        <div className="grid grid-cols-8 gap-1 max-h-36 overflow-y-auto">
                            {filtered.map(icon => (
                                <button
                                    key={icon}
                                    type="button"
                                    title={icon}
                                    onClick={() => { onChange(icon); setOpen(false); setSearch(''); }}
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${value === icon ? 'bg-primary-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-400'}`}
                                >
                                    <span className="material-icons text-lg">{icon}</span>
                                </button>
                            ))}
                        </div>
                        <button type="button" onClick={() => setOpen(false)}
                            className="w-full text-xs text-gray-400 hover:text-gray-600 py-1">
                            Đóng
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ServiceItemCard({ num, data, onChange, onRemove }) {
    const inputClass = "w-full text-sm bg-gray-50 dark:bg-dark-900/50 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 outline-none focus:border-primary-400 dark:text-white resize-none transition-colors";

    return (
        <div className="bg-gray-50 dark:bg-dark-950 rounded-2xl border border-gray-100 dark:border-dark-700 p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">{num}</div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Dịch vụ {num}</span>
                </div>
                <button type="button" onClick={onRemove}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <span className="material-icons text-sm">delete</span> Xóa
                </button>
            </div>

            <IconPicker value={data.icon} onChange={(v) => onChange('icon', v)} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-4 h-4 text-xs bg-red-500 text-white rounded flex items-center justify-center font-bold">V</span>
                        Tên dịch vụ (VI)
                    </label>
                    <input value={data.title_vi} onChange={e => onChange('title_vi', e.target.value)}
                        placeholder="VD: Thiết Kế Nội Thất" className={inputClass} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-4 h-4 text-xs bg-blue-600 text-white rounded flex items-center justify-center font-bold">E</span>
                        Service name (EN)
                    </label>
                    <input value={data.title_en} onChange={e => onChange('title_en', e.target.value)}
                        placeholder="e.g. Interior Design" className={inputClass} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-4 h-4 text-xs bg-red-500 text-white rounded flex items-center justify-center font-bold">V</span>
                        Mô tả (VI)
                    </label>
                    <textarea value={data.desc_vi} onChange={e => onChange('desc_vi', e.target.value)}
                        rows={3} placeholder="Mô tả dịch vụ tiếng Việt..." className={inputClass} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-4 h-4 text-xs bg-blue-600 text-white rounded flex items-center justify-center font-bold">E</span>
                        Description (EN)
                    </label>
                    <textarea value={data.desc_en} onChange={e => onChange('desc_en', e.target.value)}
                        rows={3} placeholder="Service description in English..." className={inputClass} />
                </div>
            </div>
        </div>
    );
}

const EMPTY_ITEM = { icon: 'design_services', title_vi: '', title_en: '', desc_vi: '', desc_en: '' };

// Convert flat CMS fields → structured items array
function fieldsToItems(content) {
    const section = content?.services || {};
    const items = [];
    let i = 1;
    while (section[`item${i}_icon`] || section[`item${i}_title`]) {
        items.push({
            icon: section[`item${i}_icon`]?.vi || '',
            title_vi: section[`item${i}_title`]?.vi || '',
            title_en: section[`item${i}_title`]?.en || '',
            desc_vi: section[`item${i}_desc`]?.vi || '',
            desc_en: section[`item${i}_desc`]?.en || '',
        });
        i++;
    }
    // Default 3 items if empty
    if (items.length === 0) {
        return [
            { icon: 'space_dashboard', title_vi: 'Thiết Kế Nội Thất', title_en: 'Interior Design', desc_vi: '', desc_en: '' },
            { icon: 'chair', title_vi: 'Nội Thất Theo Yêu Cầu', title_en: 'Custom Furniture', desc_vi: '', desc_en: '' },
            { icon: 'construction', title_vi: 'Quản Lý Dự Án', title_en: 'Project Management', desc_vi: '', desc_en: '' },
        ];
    }
    return items;
}

// Convert items array → flat CMS rows to upsert
function itemsToRows(items, headerVi, headerEn, subtitleVi, subtitleEn) {
    const rows = [
        { section: 'services', key: 'title', value_vi: headerVi, value_en: headerEn, type: 'text' },
        { section: 'services', key: 'subtitle', value_vi: subtitleVi, value_en: subtitleEn, type: 'textarea' },
    ];
    items.forEach((item, i) => {
        const n = i + 1;
        rows.push(
            { section: 'services', key: `item${n}_icon`, value_vi: item.icon, value_en: item.icon, type: 'text' },
            { section: 'services', key: `item${n}_title`, value_vi: item.title_vi, value_en: item.title_en, type: 'text' },
            { section: 'services', key: `item${n}_desc`, value_vi: item.desc_vi, value_en: item.desc_en, type: 'textarea' },
        );
    });
    return rows;
}

export default function ServicesEditor() {
    const { content } = useContent();
    const [items, setItems] = useState([]);
    const [titleVi, setTitleVi] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [subtitleVi, setSubtitleVi] = useState('');
    const [subtitleEn, setSubtitleEn] = useState('');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!content) return;
        const s = content.services || {};
        setTitleVi(s.title?.vi || 'Dịch Vụ Của Chúng Tôi');
        setTitleEn(s.title?.en || 'Our Services');
        setSubtitleVi(s.subtitle?.vi || '');
        setSubtitleEn(s.subtitle?.en || '');
        setItems(fieldsToItems(content));
    }, [content]);

    const handleItemChange = (idx, field, value) => {
        setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: value } : it));
        setSaved(false);
    };

    const handleAddItem = () => {
        setItems(prev => [...prev, { ...EMPTY_ITEM }]);
        setSaved(false);
    };

    const handleRemoveItem = (idx) => {
        if (items.length <= 1) return;
        setItems(prev => prev.filter((_, i) => i !== idx));
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const rows = itemsToRows(items, titleVi, titleEn, subtitleVi, subtitleEn);
        await upsertManySiteContent(rows);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const inputClass = "w-full text-sm bg-gray-50 dark:bg-dark-900/50 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 outline-none focus:border-primary-400 dark:text-white resize-none transition-colors";

    return (
        <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 overflow-hidden">
            {/* Header */}
            <button type="button" onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 dark:hover:bg-dark-800/50 transition-colors">
                <div className="flex items-center gap-3">
                    <span className="material-icons text-primary-500">design_services</span>
                    <span className="font-semibold text-gray-900 dark:text-white">⚙️ Services — Dịch vụ</span>
                    <span className="text-xs text-gray-400 bg-gray-100 dark:bg-dark-700 px-2 py-0.5 rounded-full">{items.length} dịch vụ</span>
                </div>
                <div className="flex items-center gap-3">
                    {saved && (
                        <span className="text-xs text-green-500 flex items-center gap-1 font-medium">
                            <span className="material-icons text-sm">check_circle</span> Đã lưu
                        </span>
                    )}
                    <span className={`material-icons text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-dark-800 pt-6 space-y-6">
                            {/* Section header fields */}
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3 pb-1 border-b border-gray-100 dark:border-dark-700">📋 Tiêu đề section</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400">Tiêu đề (VI)</label>
                                        <input value={titleVi} onChange={e => { setTitleVi(e.target.value); setSaved(false); }}
                                            placeholder="VD: Dịch Vụ Của Chúng Tôi" className={inputClass} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400">Title (EN)</label>
                                        <input value={titleEn} onChange={e => { setTitleEn(e.target.value); setSaved(false); }}
                                            placeholder="e.g. Our Services" className={inputClass} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400">Mô tả phụ (VI)</label>
                                        <textarea value={subtitleVi} onChange={e => { setSubtitleVi(e.target.value); setSaved(false); }}
                                            rows={2} className={inputClass} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400">Subtitle (EN)</label>
                                        <textarea value={subtitleEn} onChange={e => { setSubtitleEn(e.target.value); setSaved(false); }}
                                            rows={2} className={inputClass} />
                                    </div>
                                </div>
                            </div>

                            {/* Service items */}
                            <div className="space-y-4">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest pb-1 border-b border-gray-100 dark:border-dark-700">🔧 Danh sách dịch vụ</p>
                                <AnimatePresence>
                                    {items.map((item, idx) => (
                                        <motion.div key={idx}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, height: 0 }}>
                                            <ServiceItemCard
                                                num={idx + 1}
                                                data={item}
                                                onChange={(field, val) => handleItemChange(idx, field, val)}
                                                onRemove={() => handleRemoveItem(idx)}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                <button type="button" onClick={handleAddItem}
                                    className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-dark-700 text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-all text-sm flex items-center justify-center gap-2">
                                    <span className="material-icons text-sm">add</span> Thêm dịch vụ mới
                                </button>
                            </div>

                            {/* Save button */}
                            <div className="flex justify-end">
                                <button type="button" onClick={handleSave} disabled={saving}
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
