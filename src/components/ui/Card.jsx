import React from 'react';
import { cn } from '@/utils/helpers';

const Card = ({ 
  children, 
  className = '',
  hoverable = false,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden',
        'border border-gray-200 dark:border-gray-700',
        'transition-all duration-200',
        hoverable && 'hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ 
  children, 
  className = '',
  withBorder = false,
  ...props 
}) => (
  <div 
    className={cn(
      'px-6 py-4',
      withBorder && 'border-b border-gray-200 dark:border-gray-700',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CardTitle = ({ 
  children, 
  className = '',
  as: Component = 'h3',
  ...props 
}) => (
  <Component 
    className={cn(
      'text-lg font-semibold text-gray-900 dark:text-white',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

const CardDescription = ({ 
  children, 
  className = '',
  ...props 
}) => (
  <p 
    className={cn(
      'mt-1 text-sm text-gray-500 dark:text-gray-400',
      className
    )}
    {...props}
  >
    {children}
  </p>
);

const CardContent = ({ 
  children, 
  className = '',
  ...props 
}) => (
  <div 
    className={cn('p-6', className)}
    {...props}
  >
    {children}
  </div>
);

const CardFooter = ({ 
  children, 
  className = '',
  withBorder = false,
  ...props 
}) => (
  <div 
    className={cn(
      'px-6 py-4',
      withBorder && 'border-t border-gray-200 dark:border-gray-700',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
