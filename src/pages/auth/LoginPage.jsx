import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, LogIn, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ThemeToggle from '../../components/ui/ThemeToggle';
import toast from 'react-hot-toast';
import { StarsBackground } from '../../components/animate-ui/components/backgrounds/stars';

const LoginPage = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulación de autenticación (reemplazar con tu lógica real)
      await login(formData.email, formData.password);
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StarsBackground
      className="min-h-screen w-full bg-blue-950 bg-[radial-gradient(ellipse_at_bottom,#1e3a8a_0%,#0a1133_100%)]!"
      starColor="#93c5fd"
      speed={60}
      pointerEvents={false}
    >
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">
      {/* Toggle de tema en la esquina superior derecha */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className={`w-full max-w-md p-8 rounded-2xl border transition-all duration-200 backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gray-800/80 border-gray-700/60 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.55)]'
            : 'bg-white/95 border-slate-200/50 shadow-[0_12px_30px_-12px_rgba(15,23,42,0.25)] hover:shadow-[0_16px_40px_-16px_rgba(15,23,42,0.28)]'
        }`}>
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-[#0f1c49]/20' : 'bg-[#0f1c49]/10'} mb-4`}>
              <Smile className="w-12 h-12 text-[#0f1c49]" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">HEALTHDESK</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">Sistema de Gestión de Citas Médicas</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
                label="Correo electrónico"
                startIcon={Mail}
                className={`w-full h-11 px-4 rounded-xl border ring-1 ${
                  theme === 'dark'
                    ? 'bg-gray-800/70 border-transparent ring-gray-700 focus:ring-[#0f1c49] text-white'
                    : 'bg-white/95 border-transparent ring-slate-200/60 focus:ring-[#0f1c49]'
                } placeholder:text-slate-400 focus:outline-none transition-shadow`}
              />
            </div>

            <div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  label="Contraseña"
                  startIcon={Lock}
                  endIcon={showPassword ? EyeOff : Eye}
                  onEndIconClick={() => setShowPassword(!showPassword)}
                  className={`w-full h-11 px-4 rounded-xl border ring-1 ${
                    theme === 'dark'
                      ? 'bg-gray-800/70 border-transparent ring-gray-700 focus:ring-[#0f1c49] text-white'
                      : 'bg-white/95 border-transparent ring-slate-200/60 focus:ring-[#0f1c49]'
                  } placeholder:text-slate-400 focus:outline-none transition-shadow`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#0f1c49] focus:ring-[#0f1c49] border-slate-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#0f1c49] hover:brightness-110 dark:text-[#0f1c49] underline-offset-4 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full flex justify-center h-11 px-4 rounded-xl text-sm font-medium text-white bg-gradient-to-b from-[#0f1c49] to-[#0f1c49] shadow-[0_10px_24px_-10px_rgba(15,28,73,0.55)] hover:shadow-[0_16px_36px_-14px_rgba(15,28,73,0.55)] hover:brightness-105 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f1c49] disabled:opacity-50 disabled:cursor-not-allowed"
              icon={LogIn}
              iconPosition="right"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700/70' : 'border-slate-200/60'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-slate-600'}`}>
                ¿No tienes una cuenta?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/registro"
              className="w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-slate-700 bg-white border border-slate-200/60 hover:bg-slate-50 dark:bg-gray-700 dark:text-slate-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
      </div>
      {/* Mensaje de versión */}
      <p className={`mt-8 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        HealthDesk v1.0.0 - Sistema de Gestión Médica
      </p>
    </StarsBackground>
  );
};

export default LoginPage;
