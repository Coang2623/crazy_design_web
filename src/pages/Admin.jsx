import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, getBookings, updateBookingStatus, signOut } from '@/lib/supabase';

// ─── Hằng số ────────────────────────────────────────────────────
const STATUS_STYLES = {
    pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' },
    confirmed: { label: 'Đã xác nhận', color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' },
};

const TIME_LABELS = {
    morning: '☀️ Sáng (9h – 11h)',
    afternoon: '🌙 Chiều (14h – 17h)',
};

// ─── Sub-components ──────────────────────────────────────────────
function StatusBadge({ status }) {
    const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${s.color}`}>
            {s.label}
        </span>
    );
}

function StatCard({ icon, label, value, color }) {
    return (
        <div className={`bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-100 dark:border-dark-800 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <span className="material-icons text-white">{icon}</span>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────
export default function Admin() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'confirmed' | 'cancelled'
    const [adminEmail, setAdminEmail] = useState('');

    // Kiểm tra đăng nhập khi mount
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                navigate('/admin/login');
            } else {
                setAdminEmail(session.user.email || '');
            }
        });

        // Lắng nghe thay đổi auth state
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') navigate('/admin/login');
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    // Load danh sách bookings
    const loadBookings = useCallback(async () => {
        setLoading(true);
        const { data, error } = await getBookings({ status: filter });
        if (!error && data) setBookings(data);
        setLoading(false);
    }, [filter]);

    useEffect(() => {
        loadBookings();
    }, [loadBookings]);

    // Real-time updates
    useEffect(() => {
        const channel = supabase
            .channel('bookings-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'bookings' },
                () => loadBookings()
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [loadBookings]);

    const handleStatusChange = async (id, newStatus) => {
        await updateBookingStatus(id, newStatus);
        // Real-time subscription sẽ tự reload
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/admin/login');
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Thống kê nhanh
    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-950 font-sans">
            {/* Header */}
            <header className="bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <span className="material-icons text-white text-sm">architecture</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white">Crazydesign</span>
                            <span className="ml-2 text-xs text-gray-400">Admin</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                            {adminEmail}
                        </span>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <span className="material-icons text-base">logout</span>
                            <span className="hidden sm:inline">Đăng xuất</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Quản lý lịch hẹn
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Xem và cập nhật tất cả lịch tư vấn từ khách hàng
                        </p>
                    </div>
                    <button
                        onClick={loadBookings}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl text-sm font-medium hover:border-primary-300 transition-all"
                    >
                        <span className={`material-icons text-base ${loading ? 'animate-spin' : ''}`}>refresh</span>
                        Làm mới
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard icon="calendar_month" label="Tổng lịch hẹn" value={stats.total} color="bg-blue-500" />
                    <StatCard icon="hourglass_empty" label="Chờ xác nhận" value={stats.pending} color="bg-yellow-500" />
                    <StatCard icon="check_circle" label="Đã xác nhận" value={stats.confirmed} color="bg-green-500" />
                    <StatCard icon="cancel" label="Đã hủy" value={stats.cancelled} color="bg-red-500" />
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6 bg-white dark:bg-dark-900 p-1.5 rounded-xl border border-gray-200 dark:border-dark-800 w-fit">
                    {[
                        { id: 'all', label: 'Tất cả' },
                        { id: 'pending', label: 'Chờ xác nhận' },
                        { id: 'confirmed', label: 'Đã xác nhận' },
                        { id: 'cancelled', label: 'Đã hủy' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === tab.id
                                    ? 'bg-primary-500 text-white shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-dark-800 overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <span className="material-icons text-5xl mb-3">event_busy</span>
                            <p className="font-medium">Không có lịch hẹn nào</p>
                            <p className="text-sm mt-1">Khi khách hàng đặt lịch, thông tin sẽ xuất hiện ở đây</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-dark-800 bg-gray-50 dark:bg-dark-950/50">
                                        <th className="text-left px-6 py-4 font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs">Khách hàng</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs">Ngày hẹn</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs">Khung giờ</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs">Ghi chú</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs">Trạng thái</th>
                                        <th className="text-left px-6 py-4 font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-dark-800">
                                    <AnimatePresence>
                                        {bookings.map((booking) => (
                                            <motion.tr
                                                key={booking.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="hover:bg-gray-50 dark:hover:bg-dark-800/50 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900 dark:text-white">{booking.name}</div>
                                                    <div className="text-gray-500 dark:text-gray-400">{booking.phone}</div>
                                                    {booking.email && (
                                                        <div className="text-gray-400 text-xs">{booking.email}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                                                    {formatDate(booking.date)}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                    {TIME_LABELS[booking.time_slot] || booking.time_slot}
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-[200px] truncate">
                                                    {booking.note || <span className="italic text-gray-300">Không có</span>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={booking.status} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        {booking.status !== 'confirmed' && (
                                                            <button
                                                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                                                title="Xác nhận"
                                                                className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 transition-colors flex items-center justify-center"
                                                            >
                                                                <span className="material-icons text-base">check</span>
                                                            </button>
                                                        )}
                                                        {booking.status !== 'cancelled' && (
                                                            <button
                                                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                                                title="Hủy lịch"
                                                                className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors flex items-center justify-center"
                                                            >
                                                                <span className="material-icons text-base">close</span>
                                                            </button>
                                                        )}
                                                        {booking.status !== 'pending' && (
                                                            <button
                                                                onClick={() => handleStatusChange(booking.id, 'pending')}
                                                                title="Đặt lại về chờ"
                                                                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-500 hover:bg-gray-200 transition-colors flex items-center justify-center"
                                                            >
                                                                <span className="material-icons text-base">undo</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer note */}
                <p className="text-xs text-gray-400 text-center mt-6">
                    Dữ liệu được cập nhật theo thời gian thực từ Supabase •{' '}
                    {bookings.length} lịch hẹn đang hiển thị
                </p>
            </main>
        </div>
    );
}
