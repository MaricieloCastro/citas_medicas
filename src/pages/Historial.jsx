import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { historialCitas } from '../data/healthdeskSimulados';

const Historial = () => {
  const [query, setQuery] = useState('');
  const [estado, setEstado] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filas = useMemo(() => {
    const q = query.trim().toLowerCase();
    return historialCitas.filter((c) => {
      const matchEstado = estado === 'all' || c.Estado === estado;
      const matchTexto =
        q === '' ||
        c.Paciente.toLowerCase().includes(q) ||
        c.Motivo.toLowerCase().includes(q) ||
        c.Fecha.toLowerCase().includes(q) ||
        c.Hora.toLowerCase().includes(q);
      return matchEstado && matchTexto;
    });
  }, [query, estado]);

  // Resetear a página 1 cuando cambian filtros/búsqueda/tamaño
  useEffect(() => {
    setPage(1);
  }, [query, estado, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filas.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const inicio = (safePage - 1) * pageSize;
  const fin = inicio + pageSize;
  const filasPagina = filas.slice(inicio, fin);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Historial de Citas</h1>
        <p className="mt-1 text-sm text-gray-500">
          Busca y filtra las citas anteriores
        </p>
      </div>

      <Card>
        <Card.Header withBorder>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full py-2 pl-10 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar por paciente, motivo, fecha u hora..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-3">
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  className="block w-full py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="all">Todos los estados</option>
                  <option value="Finalizada">Finalizadas</option>
                  <option value="Cancelada">Canceladas</option>
                  <option value="No asistió">No asistió</option>
                </select>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Filter className="w-5 h-5 mr-1 text-gray-500" />
                Filtrar
              </button>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          {/* Controles de paginación superiores */}
          <div className="flex items-center justify-between mb-3 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Mostrar</span>
              <select
                className="px-2 py-1 border rounded-md bg-white border-gray-300 text-gray-900"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
              <span className="text-gray-600">por página</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Página {safePage} de {totalPages}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md border text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md border text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Paciente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Fecha y Hora
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Motivo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filas.length === 0 && (
                  <tr className="text-center text-gray-500">
                    <td colSpan="4" className="px-6 py-8">No se encontraron resultados.</td>
                  </tr>
                )}
                {filasPagina.map((cita, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cita.Paciente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cita.Fecha} · {cita.Hora}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cita.Motivo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cita.Estado === 'Finalizada'
                          ? 'bg-green-100 text-green-800'
                          : cita.Estado === 'Cancelada'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cita.Estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de paginación inferiores */}
          <div className="flex items-center justify-between mt-4 gap-3">
            <div className="text-sm text-gray-600">
              Mostrando {filasPagina.length} de {filas.length} citas
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Página {safePage} de {totalPages}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md border text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md border text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Historial;
