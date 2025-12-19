import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BarChart2, TrendingUp, Users, Calendar, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import { historialCitas, reportesSimulados } from '../data/healthdeskSimulados';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Reportes = () => {
  const { theme } = useTheme();
  const wrapRef = useRef(null);
  const [rangeDays, setRangeDays] = useState(90);

  const parseDate = (s) => new Date(`${s}T00:00:00`);
  const now = new Date();
  const startDate = useMemo(() => {
    const d = new Date(now);
    d.setDate(d.getDate() - (rangeDays - 1));
    d.setHours(0,0,0,0);
    return d;
  }, [rangeDays]);

  const filtered = useMemo(() => {
    return historialCitas.filter(c => parseDate(c.Fecha) >= startDate && parseDate(c.Fecha) <= now);
  }, [startDate]);

  const dailyData = useMemo(() => {
    const map = new Map();
    filtered.forEach(c => {
      map.set(c.Fecha, (map.get(c.Fecha) || 0) + 1);
    });
    const arr = [];
    const d = new Date(startDate);
    while (d <= now) {
      const key = d.toISOString().slice(0,10);
      arr.push({ day: key.slice(5), total: map.get(key) || 0 });
      d.setDate(d.getDate() + 1);
    }
    return arr;
  }, [filtered, startDate]);

  const servicesData = useMemo(() => {
    const counts = new Map();
    filtered.forEach(c => counts.set(c.Motivo, (counts.get(c.Motivo) || 0) + 1));
    return Array.from(counts.entries()).map(([name, total]) => ({ name, total }))
      .sort((a,b) => b.total - a.total);
  }, [filtered]);

  const availabilityData = useMemo(() => {
    const buckets = [
      '10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00'
    ];
    const map = new Map(buckets.map(b => [b, 0]));
    const toBucket = (h) => {
      // h formato HH:MM
      const [HH, MM] = h.split(':').map(Number);
      const start = Math.min(Math.max(HH, 10), 18);
      return `${String(start).padStart(2,'0')}:00-${String(start+1).padStart(2,'0')}:00`;
    };
    filtered.forEach(c => {
      const b = toBucket(c.Hora);
      if (map.has(b)) map.set(b, map.get(b) + 1);
    });
    return buckets.map(time => ({ time, total: map.get(time) }));
  }, [filtered]);

  // análisis textual removido según solicitud

  // KPIs calculados
  const kpis = useMemo(() => {
    const total = filtered.length;
    const unique = new Set(filtered.map(c => c.Paciente)).size;
    const counts = filtered.reduce((acc, c) => (acc.set(c.Paciente, (acc.get(c.Paciente)||0)+1), acc), new Map());
    const recurrent = [...counts.values()].filter(v => v > 1).length;
    const recurrentPct = unique === 0 ? 0 : Math.round((recurrent / unique) * 100);
    const topServ = servicesData[0]?.name || '-';
    return { total, unique, recurrentPct, topServ };
  }, [filtered, servicesData]);

  // Componente de número animado
  const AnimatedNumber = ({ value }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      let frame;
      const duration = 600;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        setDisplay(Math.round(value * p));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }, [value]);
    return <span>{display}</span>;
  };

  const exportToPdf = async () => {
    if (!wrapRef.current) return;
    const node = wrapRef.current;
    const canvas = await html2canvas(node, { scale: 2, backgroundColor: theme === 'dark' ? '#0b1220' : '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = { width: pageWidth - 20 };
    const imgHeight = (canvas.height * imgProps.width) / canvas.width;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text('Reporte de Actividad — HealthDesk', 10, 15);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text('Profesional: Dr. Carlos Ramírez', 10, 22);

    let y = 30;
    if (imgHeight < pageHeight - y - 10) {
      pdf.addImage(imgData, 'PNG', 10, y, imgProps.width, imgHeight);
    } else {
      // dividir en páginas si es muy alto
      let sY = 0;
      const pxPageHeight = (canvas.height * (pageHeight - y - 10)) / (imgProps.width);
      while (sY < canvas.height) {
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.min(pxPageHeight, canvas.height - sY);
        const ctx = pageCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, sY, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);
        const pageImg = pageCanvas.toDataURL('image/png');
        pdf.addImage(pageImg, 'PNG', 10, y, imgProps.width, (pageCanvas.height * imgProps.width) / canvas.width);
        sY += pageCanvas.height;
        if (sY < canvas.height) {
          pdf.addPage();
          y = 10;
        }
      }
    }

    pdf.save('reporte-healthdesk.pdf');
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reportes</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Análisis y estadísticas del sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/10 dark:bg-white/5 backdrop-blur border border-white/20 rounded-lg overflow-hidden">
            {[7,30,90].map(d => (
              <button
                key={d}
                onClick={() => setRangeDays(d)}
                className={`px-3 py-2 text-xs md:text-sm transition-all ${rangeDays===d ? 'bg-blue-600/80 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-white/20'}`}
              >
                Últimos {d} días
              </button>
            ))}
          </div>
          <button onClick={exportToPdf} className="inline-flex items-center px-3 py-2 text-sm font-medium text-white rounded-md shadow bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Download className="w-4 h-4 mr-2" /> Exportar PDF
          </button>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Citas (ventana)', value:kpis.total, accent:'from-blue-500 to-indigo-500'},
          {label:'Pacientes únicos', value:kpis.unique, accent:'from-purple-500 to-fuchsia-500'},
          {label:'% Recurrentes', value:kpis.recurrentPct, suffix:'%', accent:'from-emerald-500 to-teal-500'},
          {label:'Top servicio', value:kpis.topServ, isText:true, accent:'from-cyan-500 to-blue-500'}].map((k, idx) => (
          <motion.div key={idx} whileHover={{ y:-2, scale:1.01 }} className="p-5 rounded-xl border border-white/20 bg-white/30 dark:bg-white/10 backdrop-blur shadow-md shadow-black/5">
            <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-2">{k.label}</div>
            <div className={`inline-flex items-baseline bg-gradient-to-r ${k.accent} bg-clip-text text-transparent`}> 
              {k.isText ? (
                <span className="text-lg font-semibold">{k.value}</span>
              ) : (
                <span className="text-2xl font-extrabold"><AnimatedNumber value={k.value} />{k.suffix||''}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contenido de reportes */}
      <div ref={wrapRef} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6 border border-white/20 bg-white/30 dark:bg-white/10 backdrop-blur rounded-xl shadow-lg shadow-black/5 transition hover:shadow-black/10">
          <div className="flex items-center mb-4">
            <BarChart2 className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Citas por día
            </h3>
          </div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => [v, 'Citas']} labelFormatter={(l) => `Día: ${l}`} />
                <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </Card>

        <Card className="p-6 border border-white/20 bg-white/30 dark:bg-white/10 backdrop-blur rounded-xl shadow-lg shadow-black/5 transition hover:shadow-black/10">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tendencias
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="h-64">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Servicios más solicitados</h4>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={servicesData.slice(0,8)} layout="vertical" margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => [v, 'Citas']} />
                    <Bar dataKey="total" fill="#10b981" radius={[0,6,6,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Días con mayor demanda</h4>
              <div className="flex flex-wrap gap-2">
                {reportesSimulados.tendencias.dias_mayor_demanda.map((d, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {d.dia}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pacientes Activos
            </h3>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Pacientes únicos</div>
              <div className="text-xl font-bold">{reportesSimulados.pacientes_activos.total_pacientes_unicos}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Recurrentes</div>
              <div className="text-xl font-bold">{reportesSimulados.pacientes_activos.porcentaje_recurrentes}%</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-white/20 bg-white/30 dark:bg-white/10 backdrop-blur rounded-xl shadow-lg shadow-black/5 transition hover:shadow-black/10">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Disponibilidad
            </h3>
          </div>
          <div className="space-y-3">
            <div className="h-64">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Distribución por horario</h4>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={availabilityData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} interval={0} angle={-15} height={50} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => [v, 'Citas']} />
                    <Bar dataKey="total" fill="#8b5cf6" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reportes;
