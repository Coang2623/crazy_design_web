// src/lib/cms.js
// CMS helper functions for Phase 3 — Content Management

import { supabase } from './supabase';

// ─── Site Content ─────────────────────────────────────────────

/** Lấy toàn bộ nội dung của một section, hoặc tất cả sections */
export async function getSiteContent(section = null) {
    let query = supabase.from('site_content').select('*').order('section').order('key');
    if (section) query = query.eq('section', section);
    return query;
}

/** Upsert một field nội dung */
export async function upsertSiteContent({ section, key, value_vi, value_en, type = 'text' }) {
    return supabase
        .from('site_content')
        .upsert({ section, key, value_vi, value_en, type, updated_at: new Date().toISOString() },
            { onConflict: 'section,key' })
        .select()
        .single();
}

/** Upsert nhiều fields cùng lúc */
export async function upsertManySiteContent(items) {
    return supabase
        .from('site_content')
        .upsert(items.map(i => ({ ...i, updated_at: new Date().toISOString() })),
            { onConflict: 'section,key' })
        .select();
}

// ─── Testimonials ──────────────────────────────────────────────

/** Lấy danh sách testimonials (admin: tất cả, public: chỉ active) */
export async function getTestimonials({ adminMode = false } = {}) {
    let query = supabase.from('testimonials').select('*').order('sort_order').order('created_at');
    if (!adminMode) query = query.eq('is_active', true);
    return query;
}

/** Tạo testimonial mới */
export async function createTestimonial(data) {
    return supabase.from('testimonials').insert([data]).select().single();
}

/** Cập nhật testimonial */
export async function updateTestimonial(id, data) {
    return supabase.from('testimonials').update(data).eq('id', id).select().single();
}

/** Xóa testimonial */
export async function deleteTestimonial(id) {
    return supabase.from('testimonials').delete().eq('id', id);
}

// ─── Pricing Config ────────────────────────────────────────────

/** Lấy toàn bộ pricing config */
export async function getPricingConfig() {
    return supabase.from('pricing_config').select('*');
}

/** Cập nhật một pricing config key */
export async function upsertPricingConfig(configKey, configValue) {
    return supabase
        .from('pricing_config')
        .upsert({ config_key: configKey, config_value: configValue, updated_at: new Date().toISOString() },
            { onConflict: 'config_key' })
        .select()
        .single();
}

// ─── Image Upload ──────────────────────────────────────────────

/**
 * Upload ảnh lên Supabase Storage bucket 'cms-media'
 * @param {File} file - File ảnh từ input
 * @param {string} folder - Thư mục con: 'hero' | 'avatars' | ...
 * @returns {{ url: string, error: Error | null }}
 */
export async function uploadCmsImage(file, folder = 'general') {
    const ext = file.name.split('.').pop();
    const filename = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
        .from('cms-media')
        .upload(filename, file, { upsert: true, cacheControl: '3600' });

    if (uploadError) return { url: null, error: uploadError };

    const { data } = supabase.storage.from('cms-media').getPublicUrl(filename);
    return { url: data.publicUrl, error: null };
}

/** Xóa ảnh khỏi Storage */
export async function deleteCmsImage(url) {
    // Extract path from full public URL
    const marker = '/cms-media/';
    const idx = url.indexOf(marker);
    if (idx === -1) return { error: new Error('Invalid URL') };
    const path = url.slice(idx + marker.length);
    return supabase.storage.from('cms-media').remove([path]);
}

// ─── Realtime subscription ─────────────────────────────────────

/**
 * Subscribe to real-time changes on site_content table
 * @param {Function} callback - Called when any change happens
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToContentChanges(callback) {
    const channel = supabase
        .channel('cms-content-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, callback)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, callback)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'pricing_config' }, callback)
        .subscribe();
    return () => supabase.removeChannel(channel);
}
