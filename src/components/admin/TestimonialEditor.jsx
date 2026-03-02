// src/components/admin/TestimonialEditor.jsx
// Admin CRUD interface for managing testimonials

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../lib/cms';
import ImageUploader from './ImageUploader';

const EMPTY_FORM = {
    name: '', role_vi: '', role_en: '',
    content_vi: '', content_en: '',
    rating: 5, avatar_url: '', avatar_initials: '',
    is_active: true, sort_order: 0,
};

function StarRating({ value, onChange }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(s => (
                <button key={s} type="button" onClick={() => onChange(s)} className="text-xl transition-transform hover:scale-110">
                    <span className={s <= value ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                </button>
            ))}
        </div>
    );
}

function TestimonialForm({ initial, onSave, onCancel, saving }) {
    const [form, setForm] = useState(initial || EMPTY_FORM);
    const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

    const inputClass = "w-full text-sm bg-gray-50 dark:bg-dark-900/50 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 outline-none focus:border-primary-400 dark:text-white resize-none transition-colors";

    return (
        <div className="bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-200 dark:border-primary-800 p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tên khách hàng *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Nguyễn Văn A" className={inputClass} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Chữ viết tắt avatar</label>
                    <input value={form.avatar_initials} onChange={e => set('avatar_initials', e.target.value.toUpperCase().slice(0, 2))}
                        placeholder="A" maxLength={2} className={inputClass} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Vai trò (Tiếng Việt)</label>
                    <input value={form.role_vi} onChange={e => set('role_vi', e.target.value)} placeholder="Chủ quán, Coffee XYZ" className={inputClass} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Role (English)</label>
                    <input value={form.role_en} onChange={e => set('role_en', e.target.value)} placeholder="Owner, Coffee XYZ" className={inputClass} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nội dung đánh giá (VI) *</label>
                    <textarea value={form.content_vi} onChange={e => set('content_vi', e.target.value)} rows={4}
                        placeholder="Nội dung đánh giá tiếng Việt..." className={inputClass} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Review content (EN) *</label>
                    <textarea value={form.content_en} onChange={e => set('content_en', e.target.value)} rows={4}
                        placeholder="Review content in English..." className={inputClass} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Đánh giá sao</label>
                    <StarRating value={form.rating} onChange={v => set('rating', v)} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Thứ tự hiển thị</label>
                    <input type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value) || 0)}
                        min={0} className={inputClass} />
                </div>
                <div className="space-y-1 flex flex-col justify-end">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div
                            onClick={() => set('is_active', !form.is_active)}
                            className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${form.is_active ? 'bg-primary-500' : 'bg-gray-300 dark:bg-dark-600'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_active ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {form.is_active ? 'Hiển thị' : 'Ẩn'}
                        </span>
                    </label>
                </div>
            </div>

            <ImageUploader
                label="Ảnh avatar (tuỳ chọn)"
                folder="avatars"
                value={form.avatar_url}
                onChange={(url) => set('avatar_url', url)}
            />

            <div className="flex gap-3 pt-2">
                <button type="button" onClick={onCancel}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-dark-700 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                    Hủy
                </button>
                <button type="button" onClick={() => onSave(form)} disabled={saving || !form.name || !form.content_vi || !form.content_en}
                    className="flex-1 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span className="material-icons text-sm">save</span>}
                    {saving ? 'Đang lưu...' : 'Lưu'}
                </button>
            </div>
        </div>
    );
}

function TestimonialCard({ item, onEdit, onDelete, onToggle }) {
    const [deleting, setDeleting] = useState(false);
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${item.is_active
                ? 'bg-white dark:bg-dark-900 border-gray-100 dark:border-dark-800'
                : 'bg-gray-50 dark:bg-dark-950 border-gray-100 dark:border-dark-800 opacity-60'
                }`}
        >
            {/* Avatar */}
            <div className="shrink-0">
                {item.avatar_url ? (
                    <img src={item.avatar_url} alt={item.name} className="w-11 h-11 rounded-full object-cover" />
                ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                        {item.avatar_initials || item.name?.[0] || '?'}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{item.name}</span>
                    <span className="text-gray-400 text-xs">{item.role_vi}</span>
                    <span className="text-yellow-400 text-xs">{'★'.repeat(item.rating)}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 line-clamp-2">{item.content_vi}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => onToggle(item)} title={item.is_active ? 'Ẩn' : 'Hiện'}
                    className={`w-8 h-8 rounded-lg transition-colors flex items-center justify-center text-sm ${item.is_active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    <span className="material-icons text-sm">{item.is_active ? 'visibility' : 'visibility_off'}</span>
                </button>
                <button onClick={() => onEdit(item)} title="Sửa"
                    className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center">
                    <span className="material-icons text-sm">edit</span>
                </button>
                <button onClick={async () => { setDeleting(true); await onDelete(item.id); setDeleting(false); }}
                    disabled={deleting} title="Xóa"
                    className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors flex items-center justify-center">
                    {deleting ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                        : <span className="material-icons text-sm">delete</span>}
                </button>
            </div>
        </motion.div>
    );
}

export default function TestimonialEditor() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [saving, setSaving] = useState(false);

    const load = async () => {
        setLoading(true);
        const { data } = await getTestimonials({ adminMode: true });
        if (data) setTestimonials(data);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const handleSave = async (form) => {
        setSaving(true);
        if (editItem) {
            await updateTestimonial(editItem.id, form);
        } else {
            await createTestimonial(form);
        }
        setSaving(false);
        setShowForm(false);
        setEditItem(null);
        load();
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Xóa đánh giá này?')) return;
        await deleteTestimonial(id);
        load();
    };

    const handleToggle = async (item) => {
        await updateTestimonial(item.id, { is_active: !item.is_active });
        load();
    };

    return (
        <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-dark-800">
                <div className="flex items-center gap-3">
                    <span className="material-icons text-primary-500">star</span>
                    <div>
                        <span className="font-semibold text-gray-900 dark:text-white">⭐ Testimonials — Đánh giá khách hàng</span>
                        <span className="ml-2 text-xs text-gray-400">{testimonials.length} đánh giá</span>
                    </div>
                </div>
                <button
                    onClick={() => { setEditItem(null); setShowForm(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                    <span className="material-icons text-sm">add</span>
                    Thêm mới
                </button>
            </div>

            <div className="p-6 space-y-3">
                <AnimatePresence>
                    {showForm && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <TestimonialForm
                                initial={editItem}
                                onSave={handleSave}
                                onCancel={() => { setShowForm(false); setEditItem(null); }}
                                saving={saving}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <span className="material-icons text-4xl mb-3 block">star_border</span>
                        <p>Chưa có đánh giá nào. Nhấn "Thêm mới" để bắt đầu.</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {testimonials.map(item => (
                            <TestimonialCard
                                key={item.id}
                                item={item}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onToggle={handleToggle}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
