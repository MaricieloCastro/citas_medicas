import React from 'react';
import Card from '../components/ui/Card';
import { Wifi, WifiOff, CheckCircle, XCircle, Clock, Activity, Zap, Database } from 'lucide-react';

const Indicadores = () => {
  // Datos de ejemplo para los indicadores
  const statusItems = [
    {
      name: 'WhatsApp API',
      status: 'conectado',
      icon: Wifi,
      lastSync: 'Hace 2 minutos',
      color: 'green',
    },
    {
      name: 'Google Calendar',
      status: 'sincronizado',
      icon: CheckCircle,
      lastSync: 'Hace 5 minutos',
      color: 'green',
    },
    {
      name: 'Automatización N8N',
      status: 'activo',
      icon: Activity,
      lastSync: 'Hace 1 minuto',
      color: 'green',
    },
    {
      name: 'Base de Datos',
      status: 'operativo',
      icon: Database,
      lastSync: 'Hace 10 segundos',
      color: 'green',
    },
  ];

  // Métricas del sistema
  const metrics = [
    { name: 'Mensajes recibidos hoy', value: '24', change: '+3', trend: 'up' },
    { name: 'Citas creadas', value: '8', change: '+2', trend: 'up' },
    { name: 'Tasa de conversión', value: '33%', change: '+5%', trend: 'up' },
    { name: 'Tiempo promedio de respuesta', value: '2.4 min', change: '-0.5', trend: 'down' },
  ];

  // Actividad reciente
  const activities = [
    { id: 1, type: 'cita', description: 'Nueva cita con María González', time: 'Hace 15 minutos', icon: CheckCircle },
    { id: 2, type: 'mensaje', description: 'Mensaje de Carlos Rojas', time: 'Hace 30 minutos', icon: Activity },
    { id: 3, type: 'sincronizacion', description: 'Sincronización con Google Calendar', time: 'Hace 1 hora', icon: CheckCircle },
    { id: 4, type: 'error', description: 'Error al procesar mensaje', time: 'Hace 2 horas', icon: XCircle },
  ];

  const StatusIcon = ({ status }) => {
    if (status === 'conectado' || status === 'sincronizado' || status === 'activo' || status === 'operativo') {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (status === 'desconectado' || status === 'error') {
      return <XCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Indicadores del Sistema</h1>
        <p className="mt-1 text-sm text-gray-500">
          Estado actual y métricas del sistema
        </p>
      </div>

      {/* Estado de los servicios */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statusItems.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-full bg-${item.color}-100`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="flex items-center">
                        <StatusIcon status={item.status} />
                        <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
                          {item.status}
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  Última sincronización: <span className="font-medium">{item.lastSync}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Métricas del día */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header withBorder>
              <Card.Title>Métricas del Día</Card.Title>
              <Card.Description>
                Resumen de actividad del día de hoy
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {metrics.map((metric, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow">
                    <p className="text-sm font-medium text-gray-500 truncate">
                      {metric.name}
                    </p>
                    <div className="flex items-baseline mt-1">
                      <p className="text-2xl font-semibold text-gray-900">
                        {metric.value}
                      </p>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                        {metric.trend === 'up' ? (
                          <svg
                            className="self-center flex-shrink-0 w-4 h-4 ml-1 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="self-center flex-shrink-0 w-4 h-4 ml-1 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Actividad reciente */}
        <div>
          <Card>
            <Card.Header withBorder>
              <Card.Title>Actividad Reciente</Card.Title>
              <Card.Description>
                Últimas acciones en el sistema
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="flow-root">
                <ul className="-mb-8">
                  {activities.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== activities.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                activity.type === 'error' 
                                  ? 'bg-red-100 text-red-600' 
                                  : 'bg-blue-100 text-blue-600'
                              }`}
                            >
                              <activity.icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-gray-800">
                                {activity.description}
                              </p>
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                              <time dateTime={activity.datetime}>{activity.time}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Indicadores;
