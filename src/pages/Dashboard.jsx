import { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Clock3, 
  XCircle, 
  User, 
  Phone, 
  FileText,
  Search,
  Plus,
  ChevronRight
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTheme } from '../contexts/ThemeContext';
import MetricCard from '../components/metrics/MetricCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { historialCitas } from '../data/healthdeskSimulados';

// Construir citas desde historialCitas y pacientes guardados (acts as backend)
const mapEstado = (e) => e === 'Finalizada' ? 'confirmada' : (e === 'Cancelada' ? 'cancelada' : 'pendiente');
const getPacientesByName = () => {
  try {
    const saved = localStorage.getItem('pacientes');
    if (!saved) return new Map();
    const arr = JSON.parse(saved);
    if (!Array.isArray(arr)) return new Map();
    const map = new Map();
    arr.forEach(p => map.set(`${p.nombre} ${p.apellidos}`.trim(), p));
    return map;
  } catch { return new Map(); }
};

// Secciones de actividad y estado del sistema eliminadas

const Dashboard = () => {
  const { theme } = useTheme();
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pestaniaActiva, setPestaniaActiva] = useState('hoy');
  const [busqueda, setBusqueda] = useState('');

  // Preparar citas desde historial + pacientes (sin duplicados)
  const allCitas = useMemo(() => {
    const pacMap = getPacientesByName();
    const calcEdad = (fn) => {
      if (!fn) return null;
      const b = new Date(fn + 'T00:00:00');
      if (isNaN(b)) return null;
      const today = new Date();
      let age = today.getFullYear() - b.getFullYear();
      const m = today.getMonth() - b.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
      return age;
    };
    const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '-';
    return historialCitas.map((c, idx) => {
      const p = pacMap.get(c.Paciente) || {};
      return {
        id: idx + 1,
        paciente: c.Paciente,
        telefono: p.telefono || '',
        hora: c.Hora,
        motivo: c.Motivo,
        estado: mapEstado(c.Estado),
        fecha: c.Fecha,
        edad: calcEdad(p.fechaNacimiento),
        genero: p.sexo ? cap(p.sexo) : '-'
      };
    });
  }, []);

  useEffect(() => {
    // Simular carga y asignar citas desde dataset
    const timer = setTimeout(() => {
      setCitas(allCitas);
      setCargando(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [allCitas]);

  // Filtrar citas según la pestaña activa
  const citasFiltradas = citas.filter(cita => {
    if (pestaniaActiva === 'hoy') {
      const hoy = new Date().toISOString().split('T')[0];
      return cita.fecha === hoy;
    } else if (pestaniaActiva === 'manana') {
      const manana = new Date();
      manana.setDate(manana.getDate() + 1);
      return cita.fecha === manana.toISOString().split('T')[0];
    } else if (pestaniaActiva === 'semana') {
      const hoy = new Date();
      const enUnaSemana = new Date();
      enUnaSemana.setDate(hoy.getDate() + 7);
      const fechaCita = new Date(cita.fecha);
      return fechaCita >= hoy && fechaCita <= enUnaSemana;
    }
    return true;
  });

  // Filtrar por búsqueda
  const citasBuscadas = citasFiltradas.filter(cita => 
    cita.paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
    cita.telefono.includes(busqueda) ||
    cita.motivo.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calcular métricas
  const totalCitas = citasFiltradas.length;
  const citasConfirmadas = citasFiltradas.filter(c => c.estado === 'confirmada').length;
  const citasPendientes = citasFiltradas.filter(c => c.estado === 'pendiente').length;
  const citasCanceladas = citasFiltradas.filter(c => c.estado === 'cancelada').length;

  const metricas = [
    {
      titulo: 'Citas Hoy',
      valor: totalCitas,
      icono: Calendar,
      tendencia: 'up',
      color: 'blue',
      cambio: '+2'
    },
    {
      titulo: 'Pendientes',
      valor: citasPendientes,
      icono: Clock3,
      tendencia: 'down',
      color: 'yellow',
      cambio: '-1'
    },
    {
      titulo: 'Confirmadas',
      valor: citasConfirmadas,
      icono: CheckCircle,
      tendencia: 'up',
      color: 'green',
      cambio: `+${citasConfirmadas}`
    },
    {
      titulo: 'Canceladas',
      valor: citasCanceladas,
      icono: XCircle,
      tendencia: 'neutral',
      color: 'red',
      cambio: citasCanceladas > 0 ? `+${citasCanceladas}` : '0'
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setCargando(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const obtenerBadgeEstado = (estado) => {
    switch (estado) {
      case 'confirmada':
        return <Badge variant="success">Confirmada</Badge>;
      case 'pendiente':
        return <Badge variant="warning">Pendiente</Badge>;
      case 'cancelada':
        return <Badge variant="danger">Cancelada</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  const formatearFecha = (fecha) => {
    return format(parseISO(fecha), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-sky-800 dark:text-sky-300">Panel de Control</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Resumen de actividades y estadísticas - {formatearFecha(new Date().toISOString())}
        </p>
      </div>

      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metricas.map((metrica, index) => (
          <MetricCard 
            key={index}
            title={metrica.titulo}
            value={metrica.valor}
            icon={metrica.icono}
            trend={metrica.tendencia}
            color={metrica.color}
            change={metrica.cambio}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 gap-6">
        {/* Lista de citas */}
        <div className="space-y-6">
          <Card className="transition-shadow duration-200 hover:shadow-md">
            <Card.Header withBorder>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <Card.Title className="tracking-tight">Próximas Citas</Card.Title>
                  <Card.Description className="text-slate-600 dark:text-slate-400">
                    {pestaniaActiva === 'hoy' ? 'Citas de hoy' : 
                     pestaniaActiva === 'manana' ? 'Citas de mañana' : 'Citas de esta semana'}
                  </Card.Description>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={pestaniaActiva === 'hoy' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPestaniaActiva('hoy')}
                  >
                    Hoy
                  </Button>
                  <Button 
                    variant={pestaniaActiva === 'manana' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPestaniaActiva('manana')}
                  >
                    Mañana
                  </Button>
                  <Button 
                    variant={pestaniaActiva === 'semana' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPestaniaActiva('semana')}
                  >
                    Esta semana
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Buscar por nombre, teléfono o motivo..."
                    className="pl-10 w-full"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                {citasBuscadas.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-sky-50/60">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hora
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Paciente
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Motivo
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {citasBuscadas.map((cita) => (
                        <tr key={cita.id} className="hover:bg-sky-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{cita.hora}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{cita.paciente}</div>
                                <div className="text-sm text-gray-500">{cita.telefono}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{cita.motivo}</div>
                            {(cita.edad != null || (cita.genero && cita.genero !== '-')) && (
                              <div className="text-sm text-gray-500">
                                {cita.edad != null ? `${cita.edad} años` : ''}
                                {cita.edad != null && cita.genero && cita.genero !== '-' ? ' • ' : ''}
                                {(cita.genero && cita.genero !== '-') ? cita.genero : ''}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {obtenerBadgeEstado(cita.estado)}
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron citas</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {busqueda 
                        ? 'No hay coincidencias con tu búsqueda.' 
                        : pestaniaActiva === 'hoy' 
                          ? 'No hay citas programadas para hoy.' 
                          : pestaniaActiva === 'manana' 
                            ? 'No hay citas programadas para mañana.' 
                            : 'No hay citas programadas para esta semana.'}
                    </p>
                    <div className="mt-6">
                      <Button>
                        <Plus className="-ml-1 mr-2 h-5 w-5" />
                        Nueva cita
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
