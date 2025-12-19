// Datos de prueba para los horarios
export const horariosMock = [
  {
    dia: "lunes",
    activo: true,
    horaInicio: "10:00",
    horaFin: "19:00"
  },
  {
    dia: "martes",
    activo: true,
    horaInicio: "10:00",
    horaFin: "19:00"
  },
  {
    dia: "miércoles",
    activo: true,
    horaInicio: "10:00",
    horaFin: "19:00"
  },
  {
    dia: "jueves",
    activo: true,
    horaInicio: "10:00",
    horaFin: "19:00"
  },
  {
    dia: "viernes",
    activo: true,
    horaInicio: "10:00",
    horaFin: "19:00"
  },
  {
    dia: "sábado",
    activo: false,
    horaInicio: "09:00",
    horaFin: "13:00"
  },
  {
    dia: "domingo",
    activo: false,
    horaInicio: "",
    horaFin: ""
  }
];

// Función para obtener el horario por día
export const obtenerHorarioPorDia = (dia) => {
  return horariosMock.find(horario => horario.dia.toLowerCase() === dia.toLowerCase()) || null;
};

// Función para actualizar un horario
export const actualizarHorario = (dia, nuevosDatos) => {
  const index = horariosMock.findIndex(h => h.dia.toLowerCase() === dia.toLowerCase());
  if (index !== -1) {
    horariosMock[index] = { ...horariosMock[index], ...nuevosDatos };
    return true;
  }
  return false;
};
