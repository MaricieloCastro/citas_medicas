// Función para combinar clases de Tailwind
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Formatear fecha a formato legible
export const formatearFecha = (fecha) => {
  const opciones = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
};

// Obtener el nombre del día de la semana
export const obtenerNombreDia = (fecha) => {
  const opciones = { weekday: 'long' };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
};

// Calcular el tiempo restante hasta la cita
export const tiempoRestante = (horaCita) => {
  const ahora = new Date();
  const [hora, minutos] = horaCita.split(':').map(Number);
  const fechaCita = new Date();
  fechaCita.setHours(hora, minutos, 0, 0);
  
  const diffMs = fechaCita - ahora;
  const diffMins = Math.round(diffMs / 60000);
  
  if (diffMins < 0) {
    return 'En progreso';
  } else if (diffMins < 60) {
    return `En ${diffMins} min`;
  } else {
    const horas = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `En ${horas}h ${mins}m`;
  }
};

// Función para capitalizar la primera letra
export const capitalizar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Función para obtener el color según el estado de la cita
export const obtenerColorEstado = (estado) => {
  switch (estado) {
    case 'confirmada':
      return 'bg-green-100 text-green-800';
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelada':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Función para formatear el teléfono
export const formatearTelefono = (telefono) => {
  // Eliminar todo lo que no sea número
  const numeros = telefono.replace(/\D/g, '');
  
  // Si empieza con 51 (código de país para Perú), formatear
  if (numeros.startsWith('51') && numeros.length >= 11) {
    return `+${numeros.substring(0, 2)} ${numeros.substring(2, 7)} ${numeros.substring(7)}`;
  }
  
  // Si no, devolver el número tal cual
  return telefono;
};
