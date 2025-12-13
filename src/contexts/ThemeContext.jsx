import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Verificar si hay una preferencia guardada en localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('healthdesk-theme');
      if (savedTheme) return savedTheme;
      
      // Si no hay preferencia guardada, usar la preferencia del sistema
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    // Por defecto, usar tema claro
    return 'light';
  });

  // Aplicar el tema al cargar el componente
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Limpiar clases anteriores
    root.classList.remove('light', 'dark');
    
    // Aplicar el tema actual
    root.classList.add(theme);
    
    // Guardar preferencia en localStorage
    localStorage.setItem('healthdesk-theme', theme);
  }, [theme]);

  // Función para alternar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
};
