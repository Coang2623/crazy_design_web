// src/lib/supabase.js
// Supabase client — singleton instance dùng chung toàn app

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '[Supabase] Missing environment variables.\n' +
        'Create a .env.local file with:\n' +
        '  VITE_SUPABASE_URL=...\n' +
        '  VITE_SUPABASE_ANON_KEY=...'
    );
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);

// ─── Booking Helpers ──────────────────────────────────────────
/**
 * Gửi một lịch hẹn mới vào database.
 * Không yêu cầu xác thực (anon access được phép bởi RLS).
 */
export async function submitBooking(bookingData) {
    const { data, error } = await supabase
        .from('bookings')
        .insert([{
            name: bookingData.name,
            phone: bookingData.phone,
            email: bookingData.email || null,
            date: bookingData.date,      // format: 'YYYY-MM-DD'
            time_slot: bookingData.timeSlot,  // 'morning' | 'afternoon'
            note: bookingData.note || null,
            status: 'pending',
        }])
        .select()
        .single();

    return { data, error };
}

// ─── Admin Helpers ─────────────────────────────────────────────
/**
 * Lấy danh sách lịch hẹn (yêu cầu đã đăng nhập).
 * @param {Object} options - { status, from, to }
 */
export async function getBookings({ status, from, to } = {}) {
    let query = supabase
        .from('bookings')
        .select('*')
        .order('date', { ascending: true })
        .order('time_slot', { ascending: true });

    if (status && status !== 'all') {
        query = query.eq('status', status);
    }
    if (from) query = query.gte('date', from);
    if (to) query = query.lte('date', to);

    return query;
}

/**
 * Cập nhật trạng thái một lịch hẹn (yêu cầu đã đăng nhập).
 * @param {string} id - UUID của booking
 * @param {'pending'|'confirmed'|'cancelled'} status
 */
export async function updateBookingStatus(id, status) {
    return supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
}

// ─── Auth Helpers ──────────────────────────────────────────────
/**
 * Đăng nhập bằng email + password (cho Admin).
 */
export async function signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
}

/**
 * Đăng xuất.
 */
export async function signOut() {
    return supabase.auth.signOut();
}

/**
 * Lấy session hiện tại.
 */
export async function getSession() {
    return supabase.auth.getSession();
}
