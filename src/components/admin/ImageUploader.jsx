// src/components/admin/ImageUploader.jsx
// Reusable image uploader with drag-and-drop, preview, and Supabase Storage

import React, { useState, useRef } from 'react';
import { uploadCmsImage } from '../../lib/cms';

export default function ImageUploader({ value, onChange, folder = 'general', label = 'Ảnh', accept = 'image/*' }) {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef();

    const handleFile = async (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) { setError('Chỉ hỗ trợ file ảnh.'); return; }
        if (file.size > 5 * 1024 * 1024) { setError('File phải nhỏ hơn 5MB.'); return; }

        setError('');
        setUploading(true);
        const { url, error: uploadErr } = await uploadCmsImage(file, folder);
        setUploading(false);

        if (uploadErr) { setError('Upload thất bại: ' + uploadErr.message); return; }
        onChange(url);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</label>

            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer group overflow-hidden
                    ${dragging
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                        : 'border-gray-200 dark:border-dark-700 hover:border-primary-400 bg-gray-50 dark:bg-dark-900/50'
                    }`}
                style={{ minHeight: 120 }}
            >
                {value ? (
                    <div className="relative w-full h-32">
                        <img src={value} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-medium flex items-center gap-2">
                                <span className="material-icons text-lg">edit</span>
                                Thay ảnh
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-8 px-4 text-center">
                        {uploading ? (
                            <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="material-icons text-3xl text-gray-400 group-hover:text-primary-500 transition-colors">cloud_upload</span>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Kéo thả hoặc <span className="text-primary-500 font-medium">chọn ảnh</span></p>
                                <p className="text-xs text-gray-400">PNG, JPG, WEBP • Tối đa 5MB</p>
                            </>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                    <span className="material-icons text-sm">error_outline</span>{error}
                </p>
            )}

            {/* Manual URL input */}
            <div className="flex gap-2">
                <input
                    type="url"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Hoặc nhập URL ảnh..."
                    className="flex-1 text-xs bg-gray-50 dark:bg-dark-900/50 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 outline-none focus:border-primary-400 dark:text-white"
                />
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="px-2 py-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Xóa ảnh"
                    >
                        <span className="material-icons text-base">close</span>
                    </button>
                )}
            </div>

            <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
    );
}
