import React, { useState } from 'react';
import { InputFieldProps } from './types';

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    setInternalValue('');
    onChange?.(syntheticEvent);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Variant classes
  const getVariantClasses = () => {
    const baseClasses = 'w-full rounded-md transition-all duration-200 focus:outline-none focus:ring-2';
    
    if (disabled) {
      return `${baseClasses} bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed`;
    }

    if (invalid) {
      switch (variant) {
        case 'filled':
          return `${baseClasses} bg-red-50 dark:bg-red-950 border-2 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100 focus:ring-red-500 focus:border-red-500`;
        case 'outlined':
          return `${baseClasses} bg-white dark:bg-gray-900 border-2 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100 focus:ring-red-500 focus:border-red-500`;
        case 'ghost':
          return `${baseClasses} bg-transparent border-b-2 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100 focus:ring-red-500 focus:border-red-500 rounded-none`;
        default:
          return `${baseClasses} bg-white dark:bg-gray-900 border-2 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100 focus:ring-red-500 focus:border-red-500`;
      }
    }

    switch (variant) {
      case 'filled':
        return `${baseClasses} bg-gray-50 dark:bg-gray-800 border-2 border-transparent text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700`;
      case 'outlined':
        return `${baseClasses} bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500`;
      case 'ghost':
        return `${baseClasses} bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500 rounded-none`;
      default:
        return `${baseClasses} bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500`;
    }
  };

  const inputId = React.useId();
  const helperId = React.useId();
  const errorId = React.useId();

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block font-medium text-gray-700 dark:text-gray-300 mb-1 ${labelSizeClasses[size]} ${
            disabled ? 'text-gray-400 dark:text-gray-500' : invalid ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          id={inputId}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`${getVariantClasses()} ${sizeClasses[size]} ${
            (showClearButton && internalValue) || (showPasswordToggle && type === 'password') ? 'pr-12' : ''
          }`}
          aria-invalid={invalid}
          aria-describedby={
            [
              helperText ? helperId : null,
              errorMessage ? errorId : null,
            ].filter(Boolean).join(' ') || undefined
          }
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Clear Button */}
        {showClearButton && internalValue && !loading && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="Clear input"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Password Toggle */}
        {showPasswordToggle && type === 'password' && !loading && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className={`absolute inset-y-0 ${showClearButton && internalValue ? 'right-8' : 'right-0'} flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M19.071 19.071l-15.556-15.556" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Helper Text */}
      {helperText && !invalid && (
        <p id={helperId} className={`mt-1 text-gray-500 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {helperText}
        </p>
      )}

      {/* Error Message */}
      {errorMessage && invalid && (
        <p id={errorId} className={`mt-1 text-red-600 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
