import React from 'react';
import { Bell, Menu, Search, User, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useTheme } from '../../contexts/ThemeContext';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme } = useTheme();
  
  return (
    <header className={cn(
      "sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b lg:px-6",
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    )}>
      <div className="flex items-center">
        <button
          type="button"
          className="p-2 -ml-2 text-gray-500 rounded-md lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Abrir menú</span>
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>

        <div className="relative ml-4 lg:ml-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className={cn(
              "block w-full py-2 pl-10 pr-3 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500",
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            )}
            placeholder="Buscar..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="sr-only">Ver notificaciones</span>
          <div className="relative">
            <Bell className="w-6 h-6" aria-hidden="true" />
            <span className="absolute top-0 right-0 flex w-2 h-2 -mt-1 -mr-1">
              <span className="absolute inline-flex w-full h-full bg-red-500 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
            </span>
          </div>
        </button>

        <div className="relative ml-3">
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Abrir menú de usuario</span>
              <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-full">
                <User className="w-5 h-5" />
              </div>
              <span className={cn(
                "hidden ml-3 text-sm font-medium lg:block",
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              )}>
                Dr. Juan Pérez
              </span>
              <ChevronDown className={cn(
                "hidden w-5 h-5 ml-1 lg:block",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
