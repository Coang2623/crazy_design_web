import React, { useState, useEffect, useCallback } from 'react';

/**
 * Lightbox gallery component.
 * Opens a full-screen overlay to view images with keyboard/touch navigation.
 *
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs
 * @param {number} props.initialIndex - Starting image index
 * @param {boolean} props.isOpen - Whether the lightbox is visible
 * @param {Function} props.onClose - Callback to close
 */
export default function Lightbox({ images = [], initialIndex = 0, isOpen, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') setCurrentIndex(i => (i > 0 ? i - 1 : images.length - 1));
            if (e.key === 'ArrowRight') setCurrentIndex(i => (i < images.length - 1 ? i + 1 : 0));
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, images.length, onClose]);

    // Touch swipe support
    const [touchStart, setTouchStart] = useState(null);
    const handleTouchStart = useCallback((e) => setTouchStart(e.touches[0].clientX), []);
    const handleTouchEnd = useCallback((e) => {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) setCurrentIndex(i => (i < images.length - 1 ? i + 1 : 0));
            else setCurrentIndex(i => (i > 0 ? i - 1 : images.length - 1));
        }
        setTouchStart(null);
    }, [touchStart, images.length]);

    if (!isOpen || images.length === 0) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Close button */}
            <button
                className="absolute top-4 right-4 text-white/70 hover:text-white z-10 transition-colors"
                onClick={onClose}
                aria-label="Close lightbox"
            >
                <span className="material-icons text-3xl">close</span>
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 text-white/50 text-sm font-mono z-10">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Previous */}
            {images.length > 1 && (
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(i => (i > 0 ? i - 1 : images.length - 1)); }}
                    aria-label="Previous image"
                >
                    <span className="material-icons text-4xl">chevron_left</span>
                </button>
            )}

            {/* Image */}
            <img
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className={`max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-300 select-none ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                draggable={false}
            />

            {/* Next */}
            {images.length > 1 && (
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(i => (i < images.length - 1 ? i + 1 : 0)); }}
                    aria-label="Next image"
                >
                    <span className="material-icons text-4xl">chevron_right</span>
                </button>
            )}

            {/* Thumbnail strip */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                            className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${i === currentIndex ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-80'
                                }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
