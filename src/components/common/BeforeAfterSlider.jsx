import React, { useState, useRef, useCallback } from 'react';

/**
 * Before/After comparison slider.
 * Draggable divider between two images with touch support.
 *
 * @param {Object} props
 * @param {string} props.beforeImage - URL for the "before" image
 * @param {string} props.afterImage - URL for the "after" image
 * @param {string} [props.beforeLabel] - Label for before side
 * @param {string} [props.afterLabel] - Label for after side
 */
export default function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = 'Before', afterLabel = 'After' }) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const updatePosition = useCallback((clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setPosition((x / rect.width) * 100);
    }, []);

    const handleMouseDown = useCallback(() => { isDragging.current = true; }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        updatePosition(e.clientX);
    }, [updatePosition]);

    const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);

    const handleTouchMove = useCallback((e) => {
        updatePosition(e.touches[0].clientX);
    }, [updatePosition]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video overflow-hidden rounded-lg cursor-col-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
        >
            {/* After Image (full width, background) */}
            <img
                src={afterImage}
                alt={afterLabel}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
            />

            {/* Before Image (clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${position}%` }}
            >
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
                    draggable={false}
                />
            </div>

            {/* Divider Line */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 cursor-col-resize"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                {/* Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="material-icons text-gray-600 text-sm">drag_indicator</span>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded z-10">
                {beforeLabel}
            </div>
            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded z-10">
                {afterLabel}
            </div>
        </div>
    );
}
