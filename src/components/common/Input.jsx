import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Input component with label, error state, and icon support.
 */
export default function Input({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    error = false,
    errorMessage,
    required = false,
    icon,
    multiline = false,
    rows = 4,
    className = '',
    ...props
}) {
    const baseClasses = `w-full bg-gray-50 dark:bg-gray-800 border rounded-lg p-3 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${error ? 'border-red-400 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
        }`;

    const inputElement = multiline ? (
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={`${baseClasses} resize-none ${className}`}
            {...props}
        />
    ) : (
        <div className="relative">
            {icon && (
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    {icon}
                </span>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`${baseClasses} ${icon ? 'pl-10' : ''} ${className}`}
                {...props}
            />
        </div>
    );

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                    {required && <span className="text-red-400 ml-0.5">*</span>}
                </label>
            )}
            {inputElement}
            {error && errorMessage && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                    <span className="material-icons text-xs">error</span>
                    {errorMessage}
                </span>
            )}
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
    icon: PropTypes.string,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    className: PropTypes.string,
};
