import React from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/utils/helpers';
import { useTheme } from '../../contexts/ThemeContext';
import { AppSidebar } from './AppSidebar';

const DashboardLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "flex h-screen overflow-hidden",
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      {/* Sidebar fijo de la app */}
      <AppSidebar />

      {/* Contenido principal */}
      <main className={cn(
        "flex-1 overflow-y-auto p-6 ml-64",
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      )}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
