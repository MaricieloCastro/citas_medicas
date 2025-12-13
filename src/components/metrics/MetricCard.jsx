import React from 'react';
import { cn } from '@/utils/helpers';

const MetricCard = ({ title, value, change, icon: Icon, trend, color }) => {
  const colors = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      icon: 'text-green-600',
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      icon: 'text-yellow-600',
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: 'text-red-600',
    },
  };

  const trendIcons = {
    up: (
      <svg
        className="w-4 h-4 ml-1 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
          clipRule="evenodd"
        />
      </svg>
    ),
    down: (
      <svg
        className="w-4 h-4 ml-1 text-red-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
          clipRule="evenodd"
        />
      </svg>
    ),
    neutral: (
      <svg
        className="w-4 h-4 ml-1 text-gray-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  const colorScheme = colors[color] || colors.blue;

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 p-3 rounded-md", colorScheme.bg)}>
            <Icon className={cn("w-6 h-6", colorScheme.icon)} aria-hidden="true" />
          </div>
          <div className="flex-1 w-0 ml-5">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="flex items-baseline">
                  <div className={cn("text-2xl font-semibold", colorScheme.text)}>
                    {value}
                  </div>
                  {change && (
                    <div className="flex items-baseline ml-2 text-sm font-semibold">
                      <span className={cn(
                        trend === 'up' ? 'text-green-600' : 
                        trend === 'down' ? 'text-red-600' : 'text-gray-500'
                      )}>
                        {change}
                      </span>
                      {trendIcons[trend] || trendIcons.neutral}
                    </div>
                  )}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
