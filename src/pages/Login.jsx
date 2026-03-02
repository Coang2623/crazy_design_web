import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signIn } from '@/lib/supabase';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null); // null | 'loading' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        const { error } = await signIn(email, password);

        if (error) {
            setStatus('error');
            setErrorMsg('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        } else {
            setStatus(null);
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                            <span className="material-icons text-white text-xl">architecture</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                            Crazydesign
                        </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Admin Dashboard</p>
                </div>

                {/* Card */}
                <div className="bg-white dark:bg-dark-900 rounded-3xl shadow-2xl p-10 border border-gray-100 dark:border-dark-800">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Đăng nhập
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                        Quản lý lịch hẹn tư vấn của khách hàng
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                                Email
                            </label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@crazydesign.vn"
                                className="w-full bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-primary-500/50 rounded-xl px-5 py-4 outline-none transition-all dark:text-white"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                                Mật khẩu
                            </label>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-primary-500/50 rounded-xl px-5 py-4 outline-none transition-all dark:text-white"
                            />
                        </div>

                        {/* Error */}
                        {errorMsg && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-sm flex items-center gap-2"
                            >
                                <span className="material-icons text-base">error_outline</span>
                                {errorMsg}
                            </motion.p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-500/20 mt-2"
                        >
                            {status === 'loading' ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="material-icons">login</span>
                                    Đăng nhập
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    © {new Date().getFullYear()} Crazydesign. Trang quản trị nội bộ.
                </p>
            </motion.div>
        </div>
    );
}
