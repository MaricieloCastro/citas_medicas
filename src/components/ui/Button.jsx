import React from 'react';
import { cn } from '@/utils/helpers';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'bg-transparent hover:bg-gray-100 focus:ring-blue-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const iconOnly = !children && Icon;
  const iconClass = cn(
    iconSizes[size],
    {
      'mr-2': children && iconPosition === 'left',
      'ml-2': children && iconPosition === 'right',
      'mx-0': iconOnly,
    }
  );

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        iconOnly && 'p-2',
        className
      )}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={iconClass} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className={iconClass} />}
    </button>
  );
};

export default Button;
