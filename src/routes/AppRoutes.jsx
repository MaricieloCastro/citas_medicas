import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts
import DashboardLayout from '@/components/layout/DashboardLayout';

// Páginas
import LoginPage from '../pages/auth/LoginPage';
import Dashboard from '../pages/Dashboard';
import Historial from '../pages/Historial';
import Horarios from '../pages/Horarios';
import Reportes from '../pages/Reportes';
import Pacientes from '../pages/Pacientes';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Componente para rutas públicas
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children || <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicRoute />}> 
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Rutas protegidas: ProtectedRoute -> DashboardLayout -> páginas */}
      <Route element={<ProtectedRoute />}> 
        <Route element={<DashboardLayout />}> 
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="historial" element={<Historial />} />
          <Route path="horarios" element={<Horarios />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="pacientes" element={<Pacientes />} />
        </Route>
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
