import React from 'react';
import { cn } from '@/utils/helpers';

const Input = React.forwardRef(
  ({ className, type = 'text', label, error, helperText, startIcon: StartIcon, endIcon: EndIcon, onEndIconClick, ...props }, ref) => {
    const inputClasses = cn(
      'flex h-11 w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400',
      'dark:focus:ring-blue-400',
      {
        'border-red-500 focus:ring-red-500': error,
        'border-gray-300': !error,
        'pl-11': StartIcon,
        'pr-11': EndIcon,
      },
      className
    );

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {StartIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <StartIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            </div>
          )}
          <input
            type={type}
            className={inputClasses}
            ref={ref}
            {...props}
          />
          {EndIcon && (
            <button
              type="button"
              onClick={onEndIconClick}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <EndIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
        {helperText && (
          <p className={`text-xs ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export default Input;
