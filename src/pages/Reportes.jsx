import { useTheme } from '../contexts/ThemeContext';
import { BarChart2, TrendingUp, Users, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';

const Reportes = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reportes</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Análisis y estadísticas del sistema
        </p>
      </div>

      {/* Contenido de reportes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <BarChart2 className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Citas por Mes
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Gráfico de citas programadas por mes
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tendencias
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Análisis de tendencias y patrones
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pacientes Activos
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Estadísticas de pacientes activos
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Disponibilidad
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Análisis de disponibilidad de horarios
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Reportes;
