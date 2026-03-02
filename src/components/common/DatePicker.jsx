import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DAYS_VI = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const DAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS_VI = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export default function DatePicker({ value, onChange, placeholder = 'Select a date', lang = 'en' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const containerRef = useRef(null);
    const isVI = lang?.startsWith('vi');

    const DAYS = isVI ? DAYS_VI : DAYS_EN;
    const MONTHS = isVI ? MONTHS_VI : MONTHS_EN;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => {
        setDirection(-1);
        setViewDate(new Date(year, month - 1, 1));
    };
    const nextMonth = () => {
        setDirection(1);
        setViewDate(new Date(year, month + 1, 1));
    };

    const selectDay = (day) => {
        const selected = new Date(year, month, day);
        if (selected < today) return; // block past dates
        onChange(selected);
        setIsOpen(false);
    };

    const isSelected = (day) => {
        if (!value) return false;
        const d = new Date(value);
        return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    };

    const isToday = (day) => {
        const d = new Date(year, month, day);
        return d.toDateString() === today.toDateString();
    };

    const isPast = (day) => {
        const d = new Date(year, month, day);
        return d < today;
    };

    const formatDisplay = (date) => {
        if (!date) return null;
        const d = new Date(date);
        if (isVI) return `${d.getDate()} ${MONTHS_VI[d.getMonth()]} ${d.getFullYear()}`;
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // Build grid: empty cells + day cells
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div ref={containerRef} className="relative">
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between bg-gray-50 dark:bg-dark-900/50 border-2 rounded-xl px-5 py-4 transition-all outline-none text-left ${isOpen
                        ? 'border-primary-500/50'
                        : 'border-transparent hover:border-gray-300 dark:hover:border-dark-600'
                    }`}
            >
                <span className={value ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-400'}>
                    {value ? formatDisplay(value) : placeholder}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="material-icons text-gray-400 text-xl shrink-0 ml-2"
                >
                    calendar_today
                </motion.span>
            </button>

            {/* Calendar Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute z-50 mt-2 w-full min-w-[300px] bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-dark-800 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-dark-800">
                            <button
                                type="button"
                                onClick={prevMonth}
                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-500 dark:text-gray-400 transition-colors"
                            >
                                <span className="material-icons text-lg">chevron_left</span>
                            </button>

                            <span className="font-bold text-gray-900 dark:text-white text-sm">
                                {MONTHS[month]} {year}
                            </span>

                            <button
                                type="button"
                                onClick={nextMonth}
                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-500 dark:text-gray-400 transition-colors"
                            >
                                <span className="material-icons text-lg">chevron_right</span>
                            </button>
                        </div>

                        {/* Day Labels */}
                        <div className="grid grid-cols-7 px-3 pt-3 pb-1">
                            {DAYS.map((d) => (
                                <div key={d} className="text-center text-xs font-semibold text-gray-400 dark:text-gray-600 py-1">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Day Grid */}
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={`${year}-${month}`}
                                custom={direction}
                                initial={{ opacity: 0, x: direction * 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -20 }}
                                transition={{ duration: 0.18 }}
                                className="grid grid-cols-7 px-3 pb-4 gap-y-1"
                            >
                                {cells.map((day, idx) => {
                                    if (!day) return <div key={`empty-${idx}`} />;

                                    const past = isPast(day);
                                    const selected = isSelected(day);
                                    const todayFlag = isToday(day);

                                    return (
                                        <button
                                            key={day}
                                            type="button"
                                            disabled={past}
                                            onClick={() => selectDay(day)}
                                            className={`relative h-9 w-full rounded-lg text-sm font-medium transition-all flex items-center justify-center
                                                ${selected
                                                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                                                    : todayFlag && !past
                                                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 font-bold'
                                                        : past
                                                            ? 'text-gray-300 dark:text-dark-700 cursor-not-allowed'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                                                }
                                            `}
                                        >
                                            {day}
                                            {todayFlag && !selected && (
                                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
                                            )}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>

                        {/* Footer */}
                        <div className="flex justify-between items-center px-5 py-3 border-t border-gray-100 dark:border-dark-800">
                            <button
                                type="button"
                                onClick={() => { onChange(null); setIsOpen(false); }}
                                className="text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                {isVI ? 'Xóa' : 'Clear'}
                            </button>
                            <button
                                type="button"
                                onClick={() => { selectDay(today.getDate()); setViewDate(new Date()); }}
                                className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                            >
                                {isVI ? 'Hôm nay' : 'Today'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
