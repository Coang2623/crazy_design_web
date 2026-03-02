import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composable Card component with optional image, hover effects, and glow.
 */
export default function Card({
    children,
    image,
    imageAlt = '',
    href,
    className = '',
    glow = true,
    onClick,
}) {
    const Wrapper = href ? 'a' : onClick ? 'button' : 'div';
    const wrapperProps = href ? { href } : onClick ? { onClick } : {};

    return (
        <Wrapper
            className={`${glow ? 'card-glow' : ''} bg-white dark:bg-gray-800/50 rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group ${className}`}
            {...wrapperProps}
        >
            {image && (
                <div className="overflow-hidden relative aspect-video">
                    <img
                        src={image}
                        alt={imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
                {children}
            </div>
        </Wrapper>
    );
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    glow: PropTypes.bool,
    onClick: PropTypes.func,
};
