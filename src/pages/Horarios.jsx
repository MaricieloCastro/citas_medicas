import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Save, Clock, Calendar as CalendarIcon } from 'lucide-react';

const daysOfWeek = [
  { id: 1, name: 'Lunes', shortName: 'Lun' },
  { id: 2, name: 'Martes', shortName: 'Mar' },
  { id: 3, name: 'Miércoles', shortName: 'Mié' },
  { id: 4, name: 'Jueves', shortName: 'Jue' },
  { id: 5, name: 'Viernes', shortName: 'Vie' },
  { id: 6, name: 'Sábado', shortName: 'Sáb' },
  { id: 0, name: 'Domingo', shortName: 'Dom' },
];

const Horarios = () => {
  const [horarios, setHorarios] = useState(
    daysOfWeek.map(day => ({
      ...day,
      activo: day.id !== 0 && day.id !== 6, // Por defecto activo de lunes a viernes
      horaInicio: '09:00',
      horaFin: day.id === 5 ? '17:00' : '18:00', // Viernes hasta las 17:00
    }))
  );

  const handleToggleDia = (id) => {
    setHorarios(horarios.map(horario => 
      horario.id === id 
        ? { ...horario, activo: !horario.activo } 
        : horario
    ));
  };

  const handleHoraChange = (id, field, value) => {
    setHorarios(horarios.map(horario => 
      horario.id === id 
        ? { ...horario, [field]: value } 
        : horario
    ));
  };

  const handleGuardarHorarios = () => {
    // Aquí iría la lógica para guardar los horarios
    console.log('Horarios guardados:', horarios);
    // Mostrar mensaje de éxito
    alert('Horarios guardados correctamente');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración de Horarios</h1>
        <p className="mt-1 text-sm text-gray-500">
          Establece tu disponibilidad semanal
        </p>
      </div>

      <Card>
        <Card.Header withBorder>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title>Horario de Atención</Card.Title>
              <Card.Description>
                Activa o desactiva los días de atención y establece los horarios
              </Card.Description>
            </div>
            <Button 
              onClick={handleGuardarHorarios}
              variant="primary"
              icon={Save}
              iconPosition="left"
            >
              Guardar Cambios
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-6">
            {horarios.map((dia) => (
              <div 
                key={dia.id} 
                className="flex flex-col p-4 border border-gray-200 rounded-lg md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="flex items-center">
                    <div className="flex items-center h-5">
                      <input
                        id={`dia-${dia.id}`}
                        name={`dia-${dia.id}`}
                        type="checkbox"
                        checked={dia.activo}
                        onChange={() => handleToggleDia(dia.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <label 
                      htmlFor={`dia-${dia.id}`}
                      className="ml-3 text-sm font-medium text-gray-700"
                    >
                      {dia.name}
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`hora-inicio-${dia.id}`} className="block text-sm font-medium text-gray-700">
                      Hora de inicio
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        name={`hora-inicio-${dia.id}`}
                        id={`hora-inicio-${dia.id}`}
                        value={dia.horaInicio}
                        onChange={(e) => handleHoraChange(dia.id, 'horaInicio', e.target.value)}
                        disabled={!dia.activo}
                        className={`block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${!dia.activo ? 'bg-gray-100' : 'bg-white'}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`hora-fin-${dia.id}`} className="block text-sm font-medium text-gray-700">
                      Hora de fin
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        name={`hora-fin-${dia.id}`}
                        id={`hora-fin-${dia.id}`}
                        value={dia.horaFin}
                        onChange={(e) => handleHoraChange(dia.id, 'horaFin', e.target.value)}
                        disabled={!dia.activo}
                        className={`block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${!dia.activo ? 'bg-gray-100' : 'bg-white'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Horarios;
