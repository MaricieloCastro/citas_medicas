import { useTheme } from '../contexts/ThemeContext';
import {
  Users,
  Search,
  Plus,
  UserPlus,
  Pencil,
  Trash2,
  Stethoscope,
  AlertTriangle,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useState, useMemo, useEffect } from 'react';
import { historialCitas } from '../data/healthdeskSimulados';

const mockPacientes = [
  {
    id: 1,
    dni: '70123456',
    nombre: 'Juan',
    apellidos: 'Pérez Gómez',
    telefono: '+51 987654321',
    fechaNacimiento: '1990-01-15',
    estadoCivil: 'soltero',
    sexo: 'masculino',
  },
  {
    id: 2,
    dni: '70234567',
    nombre: 'María',
    apellidos: 'González Ruiz',
    telefono: '+51 987654322',
    fechaNacimiento: '1988-06-20',
    estadoCivil: 'casado',
    sexo: 'femenino',
  },
  {
    id: 3,
    dni: '70345678',
    nombre: 'Carlos',
    apellidos: 'López Sánchez',
    telefono: '+51 987654323',
    fechaNacimiento: '1995-03-10',
    estadoCivil: 'soltero',
    sexo: 'masculino',
  },
  {
    id: 4,
    dni: '70456789',
    nombre: 'Ana',
    apellidos: 'Torres Díaz',
    telefono: '+51 987654324',
    fechaNacimiento: '1992-11-05',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 5,
    dni: '70567890',
    nombre: 'Roberto',
    apellidos: 'Sánchez Mora',
    telefono: '+51 987654325',
    fechaNacimiento: '1985-07-23',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 6,
    dni: '70678901',
    nombre: 'Lucía',
    apellidos: 'Ramírez Vega',
    telefono: '+51 987654326',
    fechaNacimiento: '1998-09-12',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 7,
    dni: '70789012',
    nombre: 'Pedro',
    apellidos: 'Castro León',
    telefono: '+51 987654327',
    fechaNacimiento: '1979-02-28',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 8,
    dni: '70890123',
    nombre: 'Sofía',
    apellidos: 'Martínez Ríos',
    telefono: '+51 987654328',
    fechaNacimiento: '2000-12-01',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 9,
    dni: '70901234',
    nombre: 'Diego',
    apellidos: 'Fernández Poma',
    telefono: '+51 987654329',
    fechaNacimiento: '1993-05-18',
    estadoCivil: 'divorciado',
    sexo: 'masculino',
  },
  {
    id: 10,
    dni: '70912345',
    nombre: 'Valeria',
    apellidos: 'Núñez Salas',
    telefono: '+51 987654330',
    fechaNacimiento: '1991-08-30',
    estadoCivil: 'viudo',
    sexo: 'femenino',
  },
  {
    id: 11,
    dni: '70923456',
    nombre: 'Andrea',
    apellidos: 'Paredes Luna',
    telefono: '+51 987654331',
    fechaNacimiento: '1996-04-09',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 12,
    dni: '70934567',
    nombre: 'Miguel',
    apellidos: 'Suárez Prado',
    telefono: '+51 987654332',
    fechaNacimiento: '1984-01-22',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 13,
    dni: '70945678',
    nombre: 'Elena',
    apellidos: 'Díaz Campos',
    telefono: '+51 987654333',
    fechaNacimiento: '1997-10-11',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 14,
    dni: '70956789',
    nombre: 'Jorge',
    apellidos: 'Aguilar Soto',
    telefono: '+51 987654334',
    fechaNacimiento: '1989-12-19',
    estadoCivil: 'divorciado',
    sexo: 'masculino',
  },
  {
    id: 15,
    dni: '70967890',
    nombre: 'Paola',
    apellidos: 'Quispe Huamán',
    telefono: '+51 987654335',
    fechaNacimiento: '1993-03-07',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 16,
    dni: '70978901',
    nombre: 'Ricardo',
    apellidos: 'Vargas Silva',
    telefono: '+51 987654336',
    fechaNacimiento: '1978-06-29',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 17,
    dni: '70989012',
    nombre: 'Natalia',
    apellidos: 'Salazar Manco',
    telefono: '+51 987654337',
    fechaNacimiento: '1994-02-14',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 18,
    dni: '70990123',
    nombre: 'Héctor',
    apellidos: 'Mejía Córdova',
    telefono: '+51 987654338',
    fechaNacimiento: '1982-08-08',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 19,
    dni: '70901235',
    nombre: 'Camila',
    apellidos: 'Flores Rojas',
    telefono: '+51 987654339',
    fechaNacimiento: '1999-01-30',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 20,
    dni: '70913456',
    nombre: 'Alonso',
    apellidos: 'Herrera Paz',
    telefono: '+51 987654340',
    fechaNacimiento: '1990-09-25',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 21,
    dni: '70924567',
    nombre: 'Brenda',
    apellidos: 'Valdez León',
    telefono: '+51 987654341',
    fechaNacimiento: '1992-02-02',
    estadoCivil: 'divorciado',
    sexo: 'femenino',
  },
  {
    id: 22,
    dni: '70935678',
    nombre: 'Diego',
    apellidos: 'Tello Arias',
    telefono: '+51 987654342',
    fechaNacimiento: '1996-07-17',
    estadoCivil: 'soltero',
    sexo: 'masculino',
  },
  {
    id: 23,
    dni: '70946789',
    nombre: 'Fiorella',
    apellidos: 'Gamarra Luna',
    telefono: '+51 987654343',
    fechaNacimiento: '1991-05-04',
    estadoCivil: 'viudo',
    sexo: 'femenino',
  },
  {
    id: 24,
    dni: '70957890',
    nombre: 'Gonzalo',
    apellidos: 'Ponce Torres',
    telefono: '+51 987654344',
    fechaNacimiento: '1987-11-21',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 25,
    dni: '70968901',
    nombre: 'Helena',
    apellidos: 'Rojas Cáceres',
    telefono: '+51 987654345',
    fechaNacimiento: '1998-04-13',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 26,
    dni: '70979012',
    nombre: 'Iván',
    apellidos: 'Santos Marín',
    telefono: '+51 987654346',
    fechaNacimiento: '1983-03-03',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 27,
    dni: '70980123',
    nombre: 'Jazmín',
    apellidos: 'Esquivel Paredes',
    telefono: '+51 987654347',
    fechaNacimiento: '1995-12-27',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 28,
    dni: '70991234',
    nombre: 'Kevin',
    apellidos: 'Cueto Ramos',
    telefono: '+51 987654348',
    fechaNacimiento: '1986-10-10',
    estadoCivil: 'divorciado',
    sexo: 'masculino',
  },
  {
    id: 29,
    dni: '70922345',
    nombre: 'Lorena',
    apellidos: 'Sánchez Córdova',
    telefono: '+51 987654349',
    fechaNacimiento: '1997-06-06',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 30,
    dni: '70933456',
    nombre: 'Mateo',
    apellidos: 'Villanueva Peña',
    telefono: '+51 987654350',
    fechaNacimiento: '1990-05-15',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 31,
    dni: '71000001',
    nombre: 'Samuel',
    apellidos: 'Ortega Prado',
    telefono: '+51 987654351',
    fechaNacimiento: '1987-01-19',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 32,
    dni: '71000002',
    nombre: 'Mónica',
    apellidos: 'Rosales Pinto',
    telefono: '+51 987654352',
    fechaNacimiento: '1992-02-08',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 33,
    dni: '71000003',
    nombre: 'Christian',
    apellidos: 'Puma Quispe',
    telefono: '+51 987654353',
    fechaNacimiento: '1984-03-21',
    estadoCivil: 'divorciado',
    sexo: 'masculino',
  },
  {
    id: 34,
    dni: '71000004',
    nombre: 'Patricia',
    apellidos: 'Luna Rivera',
    telefono: '+51 987654354',
    fechaNacimiento: '1996-04-14',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 35,
    dni: '71000005',
    nombre: 'Arturo',
    apellidos: 'Cáceres Vidal',
    telefono: '+51 987654355',
    fechaNacimiento: '1990-05-27',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 36,
    dni: '71000006',
    nombre: 'Rocío',
    apellidos: 'Chávez Soto',
    telefono: '+51 987654356',
    fechaNacimiento: '1993-06-03',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 37,
    dni: '71000007',
    nombre: 'Bruno',
    apellidos: 'León Campos',
    telefono: '+51 987654357',
    fechaNacimiento: '1989-07-12',
    estadoCivil: 'casado',
    sexo: 'masculino',
  },
  {
    id: 38,
    dni: '71000008',
    nombre: 'Tatiana',
    apellidos: 'Mendoza Ruiz',
    telefono: '+51 987654358',
    fechaNacimiento: '1998-08-18',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
  {
    id: 39,
    dni: '71000009',
    nombre: 'Franco',
    apellidos: 'Guevara Salas',
    telefono: '+51 987654359',
    fechaNacimiento: '1986-09-09',
    estadoCivil: 'viudo',
    sexo: 'masculino',
  },
  {
    id: 40,
    dni: '71000010',
    nombre: 'Daniela',
    apellidos: 'Córdova Ponce',
    telefono: '+51 987654360',
    fechaNacimiento: '1994-10-23',
    estadoCivil: 'soltero',
    sexo: 'femenino',
  },
];

const Pacientes = () => {
  const { theme } = useTheme();
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [showConfirmEliminar, setShowConfirmEliminar] = useState(false);
  const [pacienteEliminar, setPacienteEliminar] = useState(null);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: '',
    estadoCivil: 'soltero',
    sexo: 'masculino',
  });
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 1. Agregar estos estados al inicio del componente
  const [mostrandoHistorial, setMostrandoHistorial] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [cargandoHistorial, setCargandoHistorial] = useState(false);

  // 2. Modificar la función para abrir el historial con loading simulado
  const abrirHistorialClinico = async (paciente) => {
    setCargandoHistorial(true);
    setMostrandoHistorial(true);
    setPacienteSeleccionado(null);

    // Simular tiempo de consulta a la base de datos (1.5-2.5 segundos)
    const tiempoSimulado = 1500 + Math.random() * 1000;

    await new Promise((resolve) => setTimeout(resolve, tiempoSimulado));

    const historial = generarHistorialClinico(paciente);
    setPacienteSeleccionado(historial);
    setCargandoHistorial(false);
  };

  // 3. La función generarHistorialClinico permanece igual
  const generarHistorialClinico = (paciente) => {
    const edad = paciente.fechaNacimiento
      ? new Date().getFullYear() -
        new Date(paciente.fechaNacimiento).getFullYear()
      : 'No especificada';

    const condicionesAleatorias = [
      'Hipertensión arterial controlada',
      'Diabetes mellitus tipo 2',
      'Asma bronquial',
      'Gastritis crónica',
      'Migraña ocasional',
      'Alergia a penicilina',
    ];

    const medicamentosAleatorios = [
      'Losartán 50mg - 1 vez al día',
      'Metformina 850mg - 2 veces al día',
      'Omeprazol 20mg - 1 vez al día',
      'Salbutamol inhalador - según necesidad',
      'Paracetamol 500mg - según necesidad',
    ];

    const citasHistorial = historialCitas
      .filter((c) => c.Paciente === `${paciente.nombre} ${paciente.apellidos}`)
      .slice(0, 5);

    const numCondiciones = Math.floor(Math.random() * 3) + 1;
    const numMedicamentos = Math.floor(Math.random() * 3) + 1;

    return {
      datosPersonales: {
        nombre: `${paciente.nombre} ${paciente.apellidos}`,
        dni: paciente.dni,
        edad: edad,
        sexo: paciente.sexo,
        estadoCivil: paciente.estadoCivil,
        telefono: paciente.telefono,
      },
      antecedentes: {
        condiciones: condicionesAleatorias.slice(0, numCondiciones),
        medicamentos: medicamentosAleatorios.slice(0, numMedicamentos),
        alergias: Math.random() > 0.7 ? ['Penicilina'] : [],
      },
      citasRecientes: citasHistorial,
      ultimaActualizacion: new Date().toLocaleDateString('es-PE'),
    };
  };

  // 4. Modificar la función cerrar
  const cerrarHistorialClinico = () => {
    setMostrandoHistorial(false);
    setPacienteSeleccionado(null);
    setCargandoHistorial(false);
  };

  const pacientesFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return pacientes;
    return pacientes.filter(
      (p) =>
        p.dni.toLowerCase().includes(q) ||
        p.nombre.toLowerCase().includes(q) ||
        p.apellidos.toLowerCase().includes(q) ||
        p.telefono.toLowerCase().includes(q)
    );
  }, [busqueda, pacientes]);

  const totalPages = Math.max(
    1,
    Math.ceil(pacientesFiltrados.length / pageSize)
  );
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pacientesPagina = useMemo(
    () => pacientesFiltrados.slice(startIndex, endIndex),
    [pacientesFiltrados, startIndex, endIndex]
  );

  useEffect(() => {
    setPage(1);
  }, [busqueda, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const abrirNuevoPaciente = () => {
    setEditandoId(null);
    setFormData({
      dni: '',
      nombre: '',
      apellidos: '',
      telefono: '',
      fechaNacimiento: '',
      estadoCivil: 'soltero',
      sexo: 'masculino',
    });
    setMostrandoFormulario(true);
  };

  const abrirEditarPaciente = (paciente) => {
    setEditandoId(paciente.id);
    setFormData({
      dni: paciente.dni || '',
      nombre: paciente.nombre || '',
      apellidos: paciente.apellidos || '',
      telefono: paciente.telefono || '',
      fechaNacimiento: paciente.fechaNacimiento || '',
      estadoCivil: paciente.estadoCivil || 'soltero',
      sexo: paciente.sexo || 'masculino',
    });
    setMostrandoFormulario(true);
  };

  const cancelarFormulario = () => {
    setMostrandoFormulario(false);
    setEditandoId(null);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dni') {
      const soloDigitos = value.replace(/\D/g, '').slice(0, 8);
      setFormData((prev) => ({ ...prev, dni: soloDigitos }));
      if (errors.dni) setErrors((prev) => ({ ...prev, dni: '' }));
      return;
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!/^\d{8}$/.test(formData.dni))
      newErrors.dni = 'El DNI debe tener exactamente 8 dígitos numéricos.';
    if (!formData.nombre) newErrors.nombre = 'Nombre es requerido.';
    if (!formData.apellidos) newErrors.apellidos = 'Apellidos es requerido.';
    if (!formData.telefono) newErrors.telefono = 'Teléfono es requerido.';
    if (formData.fechaNacimiento) {
      const hoy = new Date();
      const fecha = new Date(formData.fechaNacimiento + 'T00:00:00');
      if (fecha > hoy)
        newErrors.fechaNacimiento =
          'La fecha de nacimiento no puede ser futura.';
    }
    // DNI duplicado
    const existeDni = pacientes.some(
      (p) => p.dni === formData.dni && p.id !== editandoId
    );
    if (!newErrors.dni && existeDni)
      newErrors.dni = 'Ya existe un paciente con este DNI.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    if (editandoId) {
      setPacientes((prev) =>
        prev.map((p) => (p.id === editandoId ? { ...p, ...formData } : p))
      );
    } else {
      const nuevo = { id: Date.now(), ...formData };
      setPacientes((prev) => [nuevo, ...prev]);
    }
    setMostrandoFormulario(false);
    setEditandoId(null);
  };

  const eliminarPaciente = (id) => {
    setPacientes((prev) => prev.filter((p) => p.id !== id));
  };

  // Persistencia en localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pacientes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // fusionar por DNI para agregar nuevos mocks sin duplicar
          const existingByDni = new Set(parsed.map((p) => p.dni));
          const nuevos = mockPacientes.filter((m) => !existingByDni.has(m.dni));
          let merged = [...parsed, ...nuevos];
          // sincronizar con historialCitas por nombre completo evitando duplicados
          const byName = new Set(
            merged.map((p) =>
              `${(p.nombre || '').trim()} ${(p.apellidos || '').trim()}`
                .trim()
                .toLowerCase()
            )
          );
          const existingDnis = new Set(merged.map((p) => p.dni));
          const genDni = () => {
            let dni;
            do {
              dni = String(Math.floor(10000000 + Math.random() * 89999999));
            } while (existingDnis.has(dni));
            existingDnis.add(dni);
            return dni;
          };
          const genPhone = () =>
            `+51 9${Math.floor(10000000 + Math.random() * 89999999)
              .toString()
              .slice(0, 8)}`;
          const toPatient = (fullName) => {
            const parts = fullName.split(' ').filter(Boolean);
            const nombre = parts[0] || fullName;
            const apellidos = parts.slice(1).join(' ') || '-';
            return {
              id: Date.now() + Math.floor(Math.random() * 100000),
              dni: genDni(),
              nombre,
              apellidos,
              telefono: genPhone(),
              fechaNacimiento: '',
              estadoCivil: 'soltero',
              sexo: 'otro',
            };
          };
          const nuevosDeHistorial = Array.from(
            new Set(historialCitas.map((c) => c.Paciente))
          )
            .filter((n) => !byName.has(n.toLowerCase()))
            .map(toPatient);
          if (nuevosDeHistorial.length > 0) {
            merged = [...merged, ...nuevosDeHistorial];
          }
          setPacientes(merged);
          if (nuevos.length > 0 || nuevosDeHistorial.length > 0) {
            localStorage.setItem('pacientes', JSON.stringify(merged));
          }
        } else {
          // base desde mocks + historial
          const base = [...mockPacientes];
          const byName = new Set(
            base.map((p) => `${p.nombre} ${p.apellidos}`.toLowerCase())
          );
          const existingDnis = new Set(base.map((p) => p.dni));
          const genDni = () => {
            let dni;
            do {
              dni = String(Math.floor(10000000 + Math.random() * 89999999));
            } while (existingDnis.has(dni));
            existingDnis.add(dni);
            return dni;
          };
          const genPhone = () =>
            `+51 9${Math.floor(10000000 + Math.random() * 89999999)
              .toString()
              .slice(0, 8)}`;
          const toPatient = (fullName) => {
            const parts = fullName.split(' ').filter(Boolean);
            const nombre = parts[0] || fullName;
            const apellidos = parts.slice(1).join(' ') || '-';
            return {
              id: Date.now() + Math.floor(Math.random() * 100000),
              dni: genDni(),
              nombre,
              apellidos,
              telefono: genPhone(),
              fechaNacimiento: '',
              estadoCivil: 'soltero',
              sexo: 'otro',
            };
          };
          const addFromHist = Array.from(
            new Set(historialCitas.map((c) => c.Paciente))
          )
            .filter((n) => !byName.has(n.toLowerCase()))
            .map(toPatient);
          const merged = [...base, ...addFromHist];
          setPacientes(merged);
          localStorage.setItem('pacientes', JSON.stringify(merged));
        }
      } else {
        // base desde mocks + historial
        const base = [...mockPacientes];
        const byName = new Set(
          base.map((p) => `${p.nombre} ${p.apellidos}`.toLowerCase())
        );
        const existingDnis = new Set(base.map((p) => p.dni));
        const genDni = () => {
          let dni;
          do {
            dni = String(Math.floor(10000000 + Math.random() * 89999999));
          } while (existingDnis.has(dni));
          existingDnis.add(dni);
          return dni;
        };
        const genPhone = () =>
          `+51 9${Math.floor(10000000 + Math.random() * 89999999)
            .toString()
            .slice(0, 8)}`;
        const toPatient = (fullName) => {
          const parts = fullName.split(' ').filter(Boolean);
          const nombre = parts[0] || fullName;
          const apellidos = parts.slice(1).join(' ') || '-';
          return {
            id: Date.now() + Math.floor(Math.random() * 100000),
            dni: genDni(),
            nombre,
            apellidos,
            telefono: genPhone(),
            fechaNacimiento: '',
            estadoCivil: 'soltero',
            sexo: 'otro',
          };
        };
        const addFromHist = Array.from(
          new Set(historialCitas.map((c) => c.Paciente))
        )
          .filter((n) => !byName.has(n.toLowerCase()))
          .map(toPatient);
        const merged = [...base, ...addFromHist];
        setPacientes(merged);
        localStorage.setItem('pacientes', JSON.stringify(merged));
      }
    } catch (e) {
      // fallo silencioso
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
    } catch (e) {
      // fallo silencioso
    }
  }, [pacientes]);

  return (
    <div className='space-y-6'>
      {/* Encabezado */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Pacientes
          </h1>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            Gestión de pacientes registrados
          </p>
        </div>
        <Button variant='primary' icon={UserPlus} onClick={abrirNuevoPaciente}>
          Nuevo Paciente
        </Button>
      </div>

      {/* Barra de búsqueda */}
      <Card className='p-4'>
        <Input
          type='search'
          placeholder='Buscar paciente por nombre, teléfono o DNI...'
          startIcon={Search}
          className='w-full pl-10'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </Card>

      {/* Formulario Nuevo/Editar Paciente */}
      {mostrandoFormulario && (
        <Card className='p-6'>
          <form
            onSubmit={onSubmit}
            className='grid grid-cols-1 md:grid-cols-2 gap-4'
          >
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                DNI
              </label>
              <Input
                name='dni'
                value={formData.dni}
                onChange={onChange}
                placeholder='Ingresa el DNI (8 dígitos)'
                inputMode='numeric'
                aria-invalid={!!errors.dni}
                required
              />
              {errors.dni && (
                <p className='mt-1 text-xs text-red-600 dark:text-red-400'>
                  {errors.dni}
                </p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Teléfono
              </label>
              <Input
                name='telefono'
                value={formData.telefono}
                onChange={onChange}
                placeholder='Ingresa el teléfono'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Nombre
              </label>
              <Input
                name='nombre'
                value={formData.nombre}
                onChange={onChange}
                placeholder='Ingresa el nombre'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Apellidos
              </label>
              <Input
                name='apellidos'
                value={formData.apellidos}
                onChange={onChange}
                placeholder='Ingresa los apellidos'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Fecha de Nacimiento
              </label>
              <input
                type='date'
                name='fechaNacimiento'
                value={formData.fechaNacimiento}
                onChange={onChange}
                className='w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Estado Civil
              </label>
              <select
                name='estadoCivil'
                value={formData.estadoCivil}
                onChange={onChange}
                className='w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
              >
                <option value='soltero'>Soltero(a)</option>
                <option value='casado'>Casado(a)</option>
                <option value='divorciado'>Divorciado(a)</option>
                <option value='viudo'>Viudo(a)</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Sexo
              </label>
              <select
                name='sexo'
                value={formData.sexo}
                onChange={onChange}
                className='w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
              >
                <option value='masculino'>Masculino</option>
                <option value='femenino'>Femenino</option>
                <option value='otro'>Otro</option>
              </select>
            </div>
            <div className='md:col-span-2 flex gap-3 justify-end mt-2'>
              <Button
                type='button'
                variant='ghost'
                onClick={cancelarFormulario}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                variant='primary'
                icon={editandoId ? Pencil : Plus}
              >
                {editandoId ? 'Actualizar Paciente' : 'Guardar Paciente'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Lista de pacientes */}
      <Card className='p-6'>
        {pacientesFiltrados.length === 0 ? (
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <Users className='w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4' />
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                No hay pacientes
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                {busqueda
                  ? 'No se encontraron resultados para tu búsqueda.'
                  : 'Comienza agregando tu primer paciente.'}
              </p>
              <Button
                variant='primary'
                icon={Plus}
                onClick={abrirNuevoPaciente}
              >
                Agregar Paciente
              </Button>
            </div>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            {/* Controles de paginación */}
            <div className='flex items-center justify-between mb-3 gap-3'>
              <div className='flex items-center gap-2 text-sm'>
                <span className='text-gray-600 dark:text-gray-300'>
                  Mostrar
                </span>
                <select
                  className='px-2 py-1 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
                <span className='text-gray-600 dark:text-gray-300'>
                  por página
                </span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <span className='text-gray-600 dark:text-gray-300'>
                  Página {safePage} de {totalPages}
                </span>
                <div className='flex gap-2'>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                  >
                    Anterior
                  </Button>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage >= totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>

            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
              <thead className='bg-gray-50 dark:bg-gray-800'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    DNI
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    Nombre
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    Apellidos
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    Teléfono
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700'>
                {pacientesPagina.map((p) => (
                  <tr
                    key={p.id}
                    className='hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                      {p.dni}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                      {p.nombre}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                      {p.apellidos}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                      {p.telefono}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-center'>
                      <div className='flex gap-2 justify-center'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-sky-100 text-sky-700 hover:bg-sky-200 ring-1 ring-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/50 dark:ring-sky-800/60'
                          type='button'
                          onClick={() => abrirHistorialClinico(p)}
                        >
                          <Stethoscope className='h-4 w-4' />
                          H. Clínico
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 dark:ring-amber-800/60'
                          icon={Pencil}
                          onClick={() => abrirEditarPaciente(p)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-200 ring-1 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50 dark:ring-rose-800/60'
                          icon={Trash2}
                          onClick={() => { setPacienteEliminar(p); setShowConfirmEliminar(true); }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Controles de paginación al pie */}
            <div className='flex items-center justify-between mt-4 gap-3'>
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                Mostrando {pacientesPagina.length} de{' '}
                {pacientesFiltrados.length} pacientes
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <span className='text-gray-600 dark:text-gray-300'>
                  Página {safePage} de {totalPages}
                </span>
                <div className='flex gap-2'>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                  >
                    Anterior
                  </Button>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage >= totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {showConfirmEliminar && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className='w-full max-w-md rounded-2xl border border-rose-200/60 bg-white dark:bg-gray-900 shadow-xl overflow-hidden'>
            <div className='px-6 py-5 flex items-start gap-3'>
              <div className='shrink-0 p-2 rounded-full bg-rose-100 dark:bg-rose-900/30'>
                <AlertTriangle className='h-6 w-6 text-rose-600 dark:text-rose-400' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  ¿Estás seguro de eliminar este paciente?
                </h3>
                <p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
                  Esta acción es permanente y no se puede deshacer.
                </p>
                {pacienteEliminar && (
                  <p className='mt-2 text-sm'>
                    <span className='text-gray-500 dark:text-gray-400'>Paciente:</span>{' '}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {pacienteEliminar.nombre} {pacienteEliminar.apellidos}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className='px-6 pb-6 pt-2 flex justify-end gap-3'>
              <Button
                type='button'
                variant='ghost'
                onClick={() => { setShowConfirmEliminar(false); setPacienteEliminar(null); }}
              >
                Cancelar
              </Button>
              <Button
                type='button'
                className='inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white'
                onClick={() => {
                  if (pacienteEliminar) eliminarPaciente(pacienteEliminar.id);
                  setShowConfirmEliminar(false);
                  setPacienteEliminar(null);
                }}
              >
                <Trash2 className='h-4 w-4' />
                Eliminar definitivamente
              </Button>
            </div>
          </div>
        </div>
      )}

      {mostrandoHistorial && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <Card className='w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
            {cargandoHistorial ? (
              // Estado de loading
              <div className='p-12 flex flex-col items-center justify-center space-y-6'>
                <div className='relative'>
                  {/* Spinner animado */}
                  <div className='w-16 h-16 border-4 border-sky-200 dark:border-sky-800 border-t-sky-600 dark:border-t-sky-400 rounded-full animate-spin'></div>
                  <Stethoscope className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-sky-600 dark:text-sky-400' />
                </div>
                <div className='text-center space-y-2'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Consultando historial clínico...
                  </h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Recuperando información del paciente
                  </p>
                </div>
                {/* Barra de progreso simulada */}
                <div className='w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-sky-600 dark:bg-sky-400 rounded-full animate-pulse'
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
            ) : pacienteSeleccionado ? (
              // Contenido del historial (tu código anterior)
              <div className='p-6 space-y-6'>
                {/* Encabezado */}
                <div className='flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4'>
                  <div>
                    <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2'>
                      <Stethoscope className='h-6 w-6 text-sky-600 dark:text-sky-400' />
                      Historial Clínico
                    </h2>
                    <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                      Última actualización:{' '}
                      {pacienteSeleccionado.ultimaActualizacion}
                    </p>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={cerrarHistorialClinico}
                  >
                    ✕
                  </Button>
                </div>

                {/* Datos Personales */}
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                    Datos Personales
                  </h3>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg'>
                    <div>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        Nombre completo
                      </span>
                      <p className='font-medium text-gray-900 dark:text-white'>
                        {pacienteSeleccionado.datosPersonales.nombre}
                      </p>
                    </div>
                    <div>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        DNI
                      </span>
                      <p className='font-medium text-gray-900 dark:text-white'>
                        {pacienteSeleccionado.datosPersonales.dni}
                      </p>
                    </div>
                    <div>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        Edad
                      </span>
                      <p className='font-medium text-gray-900 dark:text-white'>
                        {pacienteSeleccionado.datosPersonales.edad} años
                      </p>
                    </div>
                    <div>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        Sexo
                      </span>
                      <p className='font-medium text-gray-900 dark:text-white capitalize'>
                        {pacienteSeleccionado.datosPersonales.sexo}
                      </p>
                    </div>
                    <div>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        Estado Civil
                      </span>
                      <p className='font-medium text-gray-900 dark:text-white capitalize'>
                        {pacienteSeleccionado.datosPersonales.estadoCivil}
                      </p>
                    </div>
                    <div>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        Teléfono
                      </span>
                      <p className='font-medium text-gray-900 dark:text-white'>
                        {pacienteSeleccionado.datosPersonales.telefono}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Antecedentes Médicos */}
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                    Antecedentes Médicos
                  </h3>
                  <div className='space-y-4'>
                    {/* Condiciones */}
                    <div>
                      <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                        Condiciones crónicas
                      </h4>
                      {pacienteSeleccionado.antecedentes.condiciones.length >
                      0 ? (
                        <div className='flex flex-wrap gap-2'>
                          {pacienteSeleccionado.antecedentes.condiciones.map(
                            (cond, i) => (
                              <span
                                key={i}
                                className='px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm'
                              >
                                {cond}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          Sin condiciones registradas
                        </p>
                      )}
                    </div>

                    {/* Medicamentos */}
                    <div>
                      <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                        Medicamentos actuales
                      </h4>
                      {pacienteSeleccionado.antecedentes.medicamentos.length >
                      0 ? (
                        <ul className='space-y-1'>
                          {pacienteSeleccionado.antecedentes.medicamentos.map(
                            (med, i) => (
                              <li
                                key={i}
                                className='text-sm text-gray-700 dark:text-gray-300 pl-4'
                              >
                                • {med}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          Sin medicamentos registrados
                        </p>
                      )}
                    </div>

                    {/* Alergias */}
                    <div>
                      <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                        Alergias
                      </h4>
                      {pacienteSeleccionado.antecedentes.alergias.length > 0 ? (
                        <div className='flex flex-wrap gap-2'>
                          {pacienteSeleccionado.antecedentes.alergias.map(
                            (alergia, i) => (
                              <span
                                key={i}
                                className='px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium'
                              >
                                ⚠️ {alergia}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          Sin alergias registradas
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Citas Recientes */}
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                    Historial de Citas
                  </h3>
                  {pacienteSeleccionado.citasRecientes.length > 0 ? (
                    <div className='space-y-3'>
                      {pacienteSeleccionado.citasRecientes.map((cita, i) => (
                        <div
                          key={i}
                          className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900'
                        >
                          <div className='flex justify-between items-start mb-2'>
                            <div>
                              <p className='font-medium text-gray-900 dark:text-white'>
                                {cita.Especialidad}
                              </p>
                              <p className='text-sm text-gray-600 dark:text-gray-400'>
                                Dr(a). {cita.Doctor}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                cita.Estado === 'Atendido'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                  : cita.Estado === 'Pendiente'
                                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                              }`}
                            >
                              {cita.Estado}
                            </span>
                          </div>
                          <div className='flex gap-4 text-sm text-gray-600 dark:text-gray-400'>
                            <span>📅 {cita.Fecha}</span>
                            <span>🕐 {cita.Hora}</span>
                          </div>
                          {cita.Observaciones && (
                            <p className='mt-2 text-sm text-gray-700 dark:text-gray-300 italic'>
                              "{cita.Observaciones}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-sm text-gray-500 dark:text-gray-400 text-center py-8'>
                      No hay citas registradas para este paciente
                    </p>
                  )}
                </div>

                {/* Botón cerrar */}
                <div className='flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700'>
                  <Button variant='primary' onClick={cerrarHistorialClinico}>
                    Cerrar
                  </Button>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Pacientes;
