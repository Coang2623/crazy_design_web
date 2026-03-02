import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Button component with multiple variants and sizes.
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className = '',
    ...props
}) {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'btn-gradient text-dark-900 hover:shadow-lg',
        secondary: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-dark-900',
        ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm gap-1.5',
        md: 'px-6 py-3 text-base gap-2',
        lg: 'px-8 py-4 text-lg gap-2.5',
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current" />
            ) : leftIcon ? (
                <span className="material-icons text-[1.1em]">{leftIcon}</span>
            ) : null}
            {children}
            {rightIcon && !loading && (
                <span className="material-icons text-[1.1em]">{rightIcon}</span>
            )}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'outline']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    className: PropTypes.string,
};
