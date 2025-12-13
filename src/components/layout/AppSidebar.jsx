import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Clock, 
  BarChart2,
  Users,
  Settings,
  LogOut,
  Sun,
  Moon,
  FileText,
  MessageSquare,
  UserCircle,
  Clipboard
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export function AppSidebar() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Inicio', path: '/dashboard', icon: Home },
    { name: 'Historial', path: '/historial', icon: FileText },
    { name: 'Horarios', path: '/horarios', icon: Clock },
    { name: 'Indicadores', path: '/indicadores', icon: Clipboard },
    { name: 'Reportes', path: '/reportes', icon: BarChart2 },
    { name: 'Pacientes', path: '/pacientes', icon: Users },
    { name: 'Mensajes', path: '/mensajes', icon: MessageSquare },
    { name: 'Configuración', path: '/configuracion', icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex flex-col w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white">
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            HealthDesk
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium dark:bg-gray-800 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <UserCircle className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              Dr. Juan Pérez
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Médico General
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
