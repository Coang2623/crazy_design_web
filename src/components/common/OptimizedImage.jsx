import React from 'react';
import PropTypes from 'prop-types';

/**
 * Responsive image component with srcset, WebP support via Unsplash params, and lazy loading.
 */
export default function OptimizedImage({ src, alt, sizes = '100vw', className = '', onClick }) {
    // Check if it's an Unsplash URL that supports query params
    const isUnsplash = src && (src.includes('unsplash.com') || src.includes('images.unsplash.com'));

    if (isUnsplash) {
        const baseUrl = src.split('?')[0];
        return (
            <picture>
                <source
                    srcSet={`${baseUrl}?w=400&fm=webp&q=80 400w, ${baseUrl}?w=800&fm=webp&q=80 800w, ${baseUrl}?w=1200&fm=webp&q=80 1200w`}
                    type="image/webp"
                    sizes={sizes}
                />
                <source
                    srcSet={`${baseUrl}?w=400&q=80 400w, ${baseUrl}?w=800&q=80 800w, ${baseUrl}?w=1200&q=80 1200w`}
                    type="image/jpeg"
                    sizes={sizes}
                />
                <img
                    src={`${baseUrl}?w=800&q=80`}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className={className}
                    onClick={onClick}
                />
            </picture>
        );
    }

    // Fallback for non-Unsplash images
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={className}
            onClick={onClick}
        />
    );
}

OptimizedImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    sizes: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};
