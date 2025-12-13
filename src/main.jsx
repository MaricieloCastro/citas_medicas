import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Importar la fuente Inter
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// Importar estilos
import './index.css';

// Importar componente principal
import App from './App.jsx';

// Configuración global de axios
import axios from 'axios';

// Configuración de la URL base desde las variables de entorno
axios.defaults.baseURL = import.meta.env.VITE_N8N_API_URL || 'http://localhost:5678/webhook';

// Interceptor para añadir el token de autenticación a las peticiones
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
