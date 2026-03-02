// src/components/admin/ContentEditor.jsx
// Admin CMS editor for Hero, About, and Contact sections

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { upsertManySiteContent } from '../../lib/cms';
import ImageUploader from './ImageUploader';
import { useContent } from '../../contexts/ContentContext';

// ─── BilingualField: 2 columns (VI + EN) — dùng cho text dài ─────
function BilingualField({ label, sectionKey, fieldKey, type = 'text', viValue, enValue, onChange }) {
    const isTextarea = type === 'textarea';
    const InputTag = isTextarea ? 'textarea' : 'input';

    return (
        <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-4 h-4 text-xs bg-red-500 text-white rounded flex items-center justify-center font-bold">V</span>
                        Tiếng Việt
                    </label>
                    <InputTag
                        value={viValue}
                        onChange={(e) => onChange(sectionKey, fieldKey, 'vi', e.target.value)}
                        rows={isTextarea ? 4 : undefined}
                        className="w-full text-sm bg-gray-50 dark:bg-dark-900/50 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 outline-none focus:border-primary-400 dark:text-white resize-none transition-colors"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-4 h-4 text-xs bg-blue-600 text-white rounded flex items-center justify-center font-bold">E</span>
                        English
                    </label>
                    <InputTag
                        value={enValue}
                        onChange={(e) => onChange(sectionKey, fieldKey, 'en', e.target.value)}
                        rows={isTextarea ? 4 : undefined}
                        className="w-full text-sm bg-gray-50 dark:bg-dark-900/50 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 outline-none focus:border-primary-400 dark:text-white resize-none transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}

// ─── SingleField: 1 input — dùng cho URL, phone, email (không cần song ngữ) ─
function SingleField({ label, sectionKey, fieldKey, placeholder, type = 'text', icon, value, onChange }) {
    return (
        <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-dark-900/50 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 focus-within:border-primary-400 transition-colors">
                {icon && <span className="material-icons text-gray-400 text-lg shrink-0">{icon}</span>}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => {
                        onChange(sectionKey, fieldKey, 'vi', e.target.value);
                        onChange(sectionKey, fieldKey, 'en', e.target.value);
                    }}
                    placeholder={placeholder}
                    className="flex-1 text-sm bg-transparent outline-none dark:text-white"
                />
            </div>
        </div>
    );
}

// ─── Section accordion wrapper ────────────────────────────────
function SectionCard({ icon, title, children, onSave, saving, saved }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 dark:hover:bg-dark-800/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="material-icons text-primary-500">{icon}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{title}</span>
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
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-dark-800 space-y-6 pt-6">
                            {children}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
                                >
                                    {saving ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <span className="material-icons text-sm">save</span>
                                    )}
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

// ─── Main ContentEditor component ────────────────────────────────
export default function ContentEditor() {
    const { content } = useContent();
    const [fields, setFields] = useState({});
    const [saving, setSaving] = useState({});
    const [saved, setSaved] = useState({});

    // Initialize local state from DB content
    useEffect(() => {
        if (content) setFields(JSON.parse(JSON.stringify(content)));
    }, [content]);

    const handleChange = (section, key, lang, value) => {
        setFields(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: { ...prev[section]?.[key], [lang]: value },
            },
        }));
        // Clear saved indicator
        setSaved(prev => ({ ...prev, [section]: false }));
    };

    const handleImageChange = (section, key, url) => {
        setFields(prev => ({
            ...prev,
            [section]: { ...prev[section], [key]: { vi: url, en: url } },
        }));
        setSaved(prev => ({ ...prev, [section]: false }));
    };

    const saveSection = async (section) => {
        const sectionData = fields[section] || {};
        const items = Object.entries(sectionData).map(([key, values]) => ({
            section,
            key,
            value_vi: values.vi ?? '',
            value_en: values.en ?? '',
            type: values.type || 'text',
        }));

        setSaving(prev => ({ ...prev, [section]: true }));
        const { error } = await upsertManySiteContent(items);
        setSaving(prev => ({ ...prev, [section]: false }));

        if (!error) {
            setSaved(prev => ({ ...prev, [section]: true }));
            setTimeout(() => setSaved(prev => ({ ...prev, [section]: false })), 3000);
        }
    };

    const f = (section, key, lang) => fields[section]?.[key]?.[lang] ?? '';

    return (
        <div className="space-y-4">
            {/* HERO SECTION */}
            <SectionCard
                icon="home"
                title="🏠 Hero — Nội dung trang chủ"
                onSave={() => saveSection('hero')}
                saving={saving.hero}
                saved={saved.hero}
            >
                <BilingualField label="Badge text" sectionKey="hero" fieldKey="badge"
                    viValue={f('hero', 'badge', 'vi')} enValue={f('hero', 'badge', 'en')} onChange={handleChange} />
                <BilingualField label="Tiêu đề chính (Title)" sectionKey="hero" fieldKey="title"
                    viValue={f('hero', 'title', 'vi')} enValue={f('hero', 'title', 'en')} onChange={handleChange} />
                <BilingualField label="Mô tả (Subtitle)" sectionKey="hero" fieldKey="subtitle" type="textarea"
                    viValue={f('hero', 'subtitle', 'vi')} enValue={f('hero', 'subtitle', 'en')} onChange={handleChange} />
                <BilingualField label="Nút CTA (Button text)" sectionKey="hero" fieldKey="cta"
                    viValue={f('hero', 'cta', 'vi')} enValue={f('hero', 'cta', 'en')} onChange={handleChange} />
                <ImageUploader
                    label="Ảnh nền Hero (tuỳ chọn)"
                    folder="hero"
                    value={f('hero', 'image_url', 'vi')}
                    onChange={(url) => handleImageChange('hero', 'image_url', url)}
                />
            </SectionCard>

            {/* ABOUT SECTION */}
            <SectionCard
                icon="info"
                title="👤 About — Giới thiệu công ty"
                onSave={() => saveSection('about')}
                saving={saving.about}
                saved={saved.about}
            >
                <BilingualField label="Tiêu đề" sectionKey="about" fieldKey="title"
                    viValue={f('about', 'title', 'vi')} enValue={f('about', 'title', 'en')} onChange={handleChange} />
                <BilingualField label="Đoạn 1" sectionKey="about" fieldKey="p1" type="textarea"
                    viValue={f('about', 'p1', 'vi')} enValue={f('about', 'p1', 'en')} onChange={handleChange} />
                <BilingualField label="Đoạn 2" sectionKey="about" fieldKey="p2" type="textarea"
                    viValue={f('about', 'p2', 'vi')} enValue={f('about', 'p2', 'en')} onChange={handleChange} />
            </SectionCard>

            {/* CONTACT SECTION */}
            <SectionCard
                icon="contact_phone"
                title="📬 Contact — Thông tin liên hệ"
                onSave={() => saveSection('contact')}
                saving={saving.contact}
                saved={saved.contact}
            >
                {/* Divider: Contact info */}
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest -mb-2 pb-1 border-b border-gray-100 dark:border-dark-700">📞 Thông tin liên lạc</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SingleField label="Số điện thoại" sectionKey="contact" fieldKey="phone"
                        icon="phone" placeholder="+84 912 345 678"
                        value={f('contact', 'phone', 'vi')} onChange={handleChange} />
                    <SingleField label="Email" sectionKey="contact" fieldKey="email"
                        icon="email" type="email" placeholder="hello@crazydesign.vn"
                        value={f('contact', 'email', 'vi')} onChange={handleChange} />
                </div>

                <SingleField label="Địa chỉ" sectionKey="contact" fieldKey="address"
                    icon="location_on" placeholder="TP. Hồ Chí Minh, Việt Nam"
                    value={f('contact', 'address', 'vi')} onChange={handleChange} />

                {/* Divider: Social links */}
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest -mb-2 pb-1 border-b border-gray-100 dark:border-dark-700">🔗 Mạng xã hội</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SingleField label="Facebook — Tên hiển thị" sectionKey="contact" fieldKey="facebook_name"
                        icon="facebook" placeholder="Crazydesign"
                        value={f('contact', 'facebook_name', 'vi')} onChange={handleChange} />
                    <SingleField label="Facebook — Link URL" sectionKey="contact" fieldKey="facebook"
                        icon="link" placeholder="https://facebook.com/crazydesign"
                        value={f('contact', 'facebook', 'vi')} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SingleField label="Zalo — Tên / Số hiển thị" sectionKey="contact" fieldKey="zalo_name"
                        icon="chat" placeholder="+84 912 345 678"
                        value={f('contact', 'zalo_name', 'vi')} onChange={handleChange} />
                    <SingleField label="Zalo — Link URL" sectionKey="contact" fieldKey="zalo"
                        icon="link" placeholder="https://zalo.me/0912345678"
                        value={f('contact', 'zalo', 'vi')} onChange={handleChange} />
                </div>
            </SectionCard>
        </div>
    );
}
