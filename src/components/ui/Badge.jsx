import React from 'react';
import { cn } from '@/utils/helpers';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center rounded-full font-medium';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  const dotSizes = {
    sm: 'h-1.5 w-1.5 mr-1.5',
    md: 'h-2 w-2 mr-1.5',
    lg: 'h-2.5 w-2.5 mr-2',
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span 
          className={cn(
            'rounded-full',
            dotSizes[size],
            variant === 'default' && 'bg-gray-500',
            variant === 'primary' && 'bg-blue-500',
            variant === 'success' && 'bg-green-500',
            variant === 'danger' && 'bg-red-500',
            variant === 'warning' && 'bg-yellow-500',
            variant === 'info' && 'bg-cyan-500',
            variant === 'indigo' && 'bg-indigo-500',
            variant === 'purple' && 'bg-purple-500',
            variant === 'pink' && 'bg-pink-500',
          )}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
