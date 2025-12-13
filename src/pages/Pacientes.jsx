import { useTheme } from '../contexts/ThemeContext';
import { Users, Search, Plus, UserPlus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Pacientes = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pacientes</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gestión de pacientes registrados
          </p>
        </div>
        <Button variant="primary" icon={UserPlus}>
          Nuevo Paciente
        </Button>
      </div>

      {/* Barra de búsqueda */}
      <Card className="p-4">
        <Input
          type="search"
          placeholder="Buscar paciente por nombre, teléfono o DNI..."
          startIcon={Search}
          className="w-full"
        />
      </Card>

      {/* Lista de pacientes */}
      <Card className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No hay pacientes registrados
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Comienza agregando tu primer paciente
            </p>
            <Button variant="primary" icon={Plus}>
              Agregar Paciente
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Pacientes;
