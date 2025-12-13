import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Clock3, 
  XCircle, 
  User, 
  Phone, 
  FileText,
  Activity,
  AlertCircle,
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

// Datos de ejemplo para las citas
const mockAppointments = [
  {
    id: 1,
    paciente: 'Juan Pérez',
    telefono: '+51 987654321',
    hora: '09:00',
    motivo: 'Consulta general',
    estado: 'confirmada',
    fecha: new Date().toISOString().split('T')[0],
    edad: 35,
    genero: 'Masculino'
  },
  {
    id: 2,
    paciente: 'María Gómez',
    telefono: '+51 987654322',
    hora: '10:30',
    motivo: 'Control de presión',
    estado: 'pendiente',
    fecha: new Date().toISOString().split('T')[0],
    edad: 42,
    genero: 'Femenino'
  },
  {
    id: 3,
    paciente: 'Carlos López',
    telefono: '+51 987654323',
    hora: '11:15',
    motivo: 'Revisión de exámenes',
    estado: 'confirmada',
    fecha: new Date().toISOString().split('T')[0],
    edad: 28,
    genero: 'Masculino'
  },
  {
    id: 4,
    paciente: 'Ana Torres',
    telefono: '+51 987654324',
    hora: '15:30',
    motivo: 'Control postoperatorio',
    estado: 'confirmada',
    fecha: new Date().toISOString().split('T')[0],
    edad: 31,
    genero: 'Femenino'
  },
  {
    id: 5,
    paciente: 'Roberto Sánchez',
    telefono: '+51 987654325',
    hora: '16:45',
    motivo: 'Dolor de cabeza',
    estado: 'pendiente',
    fecha: new Date().toISOString().split('T')[0],
    edad: 45,
    genero: 'Masculino'
  }
];

// Datos de ejemplo para la actividad reciente
const mockActivities = [
  {
    id: 1,
    tipo: 'nueva_cita',
    descripcion: 'Nueva cita programada para Juan Pérez',
    hora: 'Hace 5 minutos',
    icono: Calendar,
    color: 'blue'
  },
  {
    id: 2,
    tipo: 'recordatorio',
    descripcion: 'Recordatorio: Cita con María Gómez en 30 minutos',
    hora: 'Hace 1 hora',
    icono: Clock,
    color: 'yellow'
  },
  {
    id: 3,
    tipo: 'sistema',
    descripcion: 'Sincronización con Google Calendar completada',
    hora: 'Hoy, 08:00',
    icono: Activity,
    color: 'green'
  }
];

// Estado del sistema
const systemStatus = {
  whatsapp: {
    estado: 'conectado',
    ultimaSincronizacion: '2025-11-02T10:30:00Z',
    mensajesHoy: 12
  },
  googleCalendar: {
    estado: 'conectado',
    ultimaSincronizacion: '2025-11-02T10:25:00Z',
    proximaCita: '2025-11-02T09:00:00Z'
  },
  n8n: {
    estado: 'activo',
    flujosActivos: 3,
    ultimaEjecucion: '2025-11-02T10:15:00Z'
  }
};

const Dashboard = () => {
  const { theme } = useTheme();
  const [citas, setCitas] = useState(mockAppointments);
  const [actividades] = useState(mockActivities);
  const [cargando, setCargando] = useState(true);
  const [pestaniaActiva, setPestaniaActiva] = useState('hoy');
  const [busqueda, setBusqueda] = useState('');

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Control</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Lista de citas */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Card.Header withBorder>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <Card.Title>Próximas Citas</Card.Title>
                  <Card.Description>
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
                    <Search className="h-5 w-5 text-gray-400" />
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
                    <thead className="bg-gray-50">
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
                        <tr key={cita.id} className="hover:bg-gray-50">
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
                            <div className="text-sm text-gray-500">
                              {cita.edad} años • {cita.genero}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {obtenerBadgeEstado(cita.estado)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                              Ver <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
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

        {/* Barra lateral */}
        <div className="space-y-6">
          {/* Actividad reciente */}
          <Card>
            <Card.Header withBorder>
              <Card.Title>Actividad Reciente</Card.Title>
              <Card.Description>Últimas acciones en el sistema</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="flow-root">
                <ul className="-mb-8">
                  {actividades.map((actividad, actividadIdx) => {
                    const Icono = actividad.icono;
                    return (
                      <li key={actividad.id}>
                        <div className="relative pb-8">
                          {actividadIdx !== actividades.length - 1 ? (
                            <span 
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" 
                              aria-hidden="true" 
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                  actividad.color === 'blue' ? 'bg-blue-500' :
                                  actividad.color === 'green' ? 'bg-green-500' :
                                  actividad.color === 'yellow' ? 'bg-yellow-500' : 'bg-gray-500'
                                }`}
                              >
                                <Icono className="h-4 w-4 text-white" />
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1">
                              <div>
                                <p className="text-sm text-gray-800">
                                  {actividad.descripcion}
                                </p>
                                <p className="text-xs text-gray-500">{actividad.hora}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="w-full">
                  Ver toda la actividad
                </Button>
              </div>
            </Card.Content>
          </Card>

          {/* Estado del sistema */}
          <Card>
            <Card.Header withBorder>
              <Card.Title>Estado del Sistema</Card.Title>
              <Card.Description>Estado de los servicios integrados</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="h-5 w-5 text-green-500">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">WhatsApp API</h3>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Conectado y funcionando correctamente</p>
                      <p className="text-xs mt-1">
                        {systemStatus.whatsapp.mensajesHoy} mensajes hoy • Última sincronización: {
                          format(parseISO(systemStatus.whatsapp.ultimaSincronizacion), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="h-5 w-5 text-green-500">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Google Calendar</h3>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Sincronizado correctamente</p>
                      <p className="text-xs mt-1">
                        Próxima cita: {
                          format(parseISO(systemStatus.googleCalendar.proximaCita), "EEEE d 'de' MMMM 'a las' HH:mm", { locale: es })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="h-5 w-5 text-yellow-500">
                      <AlertCircle className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">N8N Automatización</h3>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Conectado con {systemStatus.n8n.flujosActivos} flujos activos</p>
                      <p className="text-xs mt-1">
                        Última ejecución: {
                          format(parseISO(systemStatus.n8n.ultimaEjecucion), "d 'de' MMMM 'a las' HH:mm", { locale: es })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
