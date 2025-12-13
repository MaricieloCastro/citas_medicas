import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('inicio');
  
  // Estados para las citas
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  // Estados para los horarios
  const [horarios, setHorarios] = useState([]);
  
  // Estados para los indicadores del sistema
  const [estadoSistema, setEstadoSistema] = useState({
    whatsappApi: 'conectado',
    googleCalendar: 'sincronizado',
    n8nAutomation: 'activo',
    baseDatos: 'operativo',
    metricas: {
      mensajesRecibidos: 0,
      citasCreadas: 0,
      tasaConversion: 0,
      tiempoPromedio: '0:00'
    }
  });

  // Función para cambiar la vista actual
  const cambiarVista = (vista) => {
    setCurrentView(vista);
  };

  // Función para alternar la barra lateral
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        currentView,
        cambiarVista,
        citas,
        setCitas,
        cargando,
        setCargando,
        horarios,
        setHorarios,
        estadoSistema,
        setEstadoSistema,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
