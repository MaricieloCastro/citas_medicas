// Datos de prueba para las citas
export const citasMock = [
  {
    id: 1,
    paciente: "María González",
    telefono: "+51987654321",
    hora: "09:00",
    fecha: "2025-11-15",
    motivo: "Control de rutina",
    estado: "confirmada",
    duracion: 30
  },
  {
    id: 2,
    paciente: "Carlos Rojas",
    telefono: "+51987654322",
    hora: "10:00",
    fecha: "2025-11-15",
    motivo: "Dolor de cabeza persistente",
    estado: "pendiente",
    duracion: 30
  },
  {
    id: 3,
    paciente: "Ana Mendoza",
    telefono: "+51987654323",
    hora: "11:00",
    fecha: "2025-11-15",
    motivo: "Seguimiento tratamiento",
    estado: "confirmada",
    duracion: 30
  },
  {
    id: 4,
    paciente: "Luis Torres",
    telefono: "+51987654324",
    hora: "14:00",
    fecha: "2025-11-15",
    motivo: "Primera consulta",
    estado: "pendiente",
    duracion: 45
  },
  {
    id: 5,
    paciente: "Sofía Díaz",
    telefono: "+51987654325",
    hora: "15:30",
    fecha: "2025-11-15",
    motivo: "Control postoperatorio",
    estado: "confirmada",
    duracion: 30
  },
  {
    id: 6,
    paciente: "Jorge Pérez",
    telefono: "+51987654326",
    hora: "16:30",
    fecha: "2025-11-15",
    motivo: "Dolor de espalda",
    estado: "cancelada",
    duracion: 30
  },
  {
    id: 7,
    paciente: "Lucía Vargas",
    telefono: "+51987654327",
    hora: "17:00",
    fecha: "2025-11-15",
    motivo: "Chequeo general",
    estado: "confirmada",
    duracion: 30
  }
];

// Función para obtener las citas del día actual
export const obtenerCitasDelDia = () => {
  const hoy = new Date().toISOString().split('T')[0];
  return citasMock.filter(cita => cita.fecha === hoy);
};

// Función para filtrar citas por estado
export const filtrarCitasPorEstado = (estado) => {
  return citasMock.filter(cita => cita.estado === estado);
};
