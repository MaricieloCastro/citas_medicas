import axios from 'axios';

// Configuración base de la API
const N8N_API = {
  baseURL: import.meta.env.VITE_N8N_API_URL || 'http://localhost:5678/webhook',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

// Instancia de axios configurada
const api = axios.create(N8N_API);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Error en la petición a n8n:', error);
    return Promise.reject(error);
  }
);

// Servicios específicos
export const citasService = {
  // Obtener todas las citas
  obtenerTodas: () => api.post('', { accion: 'obtener_citas' }),
  
  // Crear una nueva cita
  crear: (citaData) => api.post('', { 
    accion: 'crear_cita',
    datos: citaData 
  }),
  
  // Actualizar una cita existente
  actualizar: (id, citaData) => api.post('', { 
    accion: 'actualizar_cita',
    id,
    datos: citaData 
  }),
  
  // Eliminar una cita
  eliminar: (id) => api.post('', { 
    accion: 'eliminar_cita',
    id 
  })
};

export const horariosService = {
  // Obtener horarios disponibles
  obtenerDisponibles: (fecha) => api.post('', { 
    accion: 'obtener_horarios_disponibles',
    fecha 
  }),
  
  // Actualizar horario
  actualizarHorario: (horarioData) => api.post('', { 
    accion: 'actualizar_horario',
    datos: horarioData 
  })
};

export const pacientesService = {
  // Obtener lista de pacientes
  obtenerTodos: () => api.post('', { accion: 'obtener_pacientes' }),
  
  // Buscar pacientes
  buscar: (termino) => api.post('', { 
    accion: 'buscar_pacientes',
    termino 
  })
};

export default api;
