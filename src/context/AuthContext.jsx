import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar sesión al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('usuario');
        
        if (token && usuarioGuardado) {
          setUser(JSON.parse(usuarioGuardado));
        } else {
          // Si no hay token, redirigir al login si no está ya ahí
          if (location.pathname !== '/login') {
            navigate('/login', { replace: true });
          }
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        setError('Error al verificar la sesión');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  // Iniciar sesión
  const login = useCallback(async (credenciales) => {
    try {
      setLoading(true);
      
      // Simulación de autenticación exitosa
      // En producción, reemplazar con llamada real a tu API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const usuarioMock = {
        id: '1',
        nombre: 'Dr. Ejemplo',
        email: credenciales.email,
        rol: 'medico'
      };
      
      // Simulamos un token
      const tokenMock = 'mock_token_' + Math.random().toString(36).substr(2);
      
      // Guardamos en el estado y localStorage
      setUser(usuarioMock);
      localStorage.setItem('token', tokenMock);
      localStorage.setItem('usuario', JSON.stringify(usuarioMock));
      
      // Redirigir al dashboard o a la ruta previa
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      
      return { success: true };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, intente nuevamente.');
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión' 
      };
    } finally {
      setLoading(false);
    }
  }, [navigate, location.state]);

  // Cerrar sesión
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  // Verificar si el usuario está autenticado
  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem('token');
    return !!token && !!user;
  }, [user]);

  // Verificar si el usuario tiene un rol específico
  const hasRole = useCallback((rol) => {
    return user?.rol === rol;
  }, [user]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading,
        login, 
        logout,
        isAuthenticated,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
