import { useTheme } from '../contexts/ThemeContext';
import { Settings, Bell, Clock, MessageSquare, User } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Configuracion = () => {
  const { theme } = useTheme();

  const configuraciones = [
    {
      titulo: 'Perfil del Consultorio',
      descripcion: 'Información general y datos de contacto',
      icono: User,
      color: 'blue'
    },
    {
      titulo: 'Horarios de Atención',
      descripcion: 'Configura tus horarios predeterminados',
      icono: Clock,
      color: 'green'
    },
    {
      titulo: 'Notificaciones',
      descripcion: 'Gestiona las notificaciones del sistema',
      icono: Bell,
      color: 'yellow'
    },
    {
      titulo: 'Mensajes Automáticos',
      descripcion: 'Configura mensajes de WhatsApp',
      icono: MessageSquare,
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuración</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ajustes generales del sistema
        </p>
      </div>

      {/* Secciones de configuración */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {configuraciones.map((config, index) => {
          const IconComponent = config.icono;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start">
                <div className={`p-3 rounded-lg ${getColorClasses(config.color)}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {config.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {config.descripcion}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-3">
                    Configurar
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Configuracion;
