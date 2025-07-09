import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Warehouse, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useAppContext();

  // Usuario de prueba actualizado
  const testUser = {
    usuario: 'PRUEBAUSUARIO20',
    contraseña: 'PRUEBA2025',
    nombre: 'Usuario',
    apellidos: 'De Prueba',
    email: 'prueba@bodesy.com',
    cargo: 'Administrador del Sistema'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar credenciales
    if (formData.usuario === testUser.usuario && formData.contraseña === testUser.contraseña) {
      // Establecer usuario actual en el contexto
      setCurrentUser(testUser);
      // Guardar datos del usuario en localStorage
      localStorage.setItem('currentUser', JSON.stringify(testUser));
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-l from-yellow-500/8 to-orange-400/5 rounded-full blur-3xl"></div>
      
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-yellow-500/20 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl shadow-lg">
              <Warehouse className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Bodesy
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Iniciar Sesión</h2>
          <p className="text-gray-300">Accede a tu cuenta para gestionar tu bodega</p>
        </div>

        {/* Test User Info */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-yellow-300 mb-2">Usuario de Prueba:</h3>
          <p className="text-sm text-yellow-200">Usuario: <span className="font-mono font-bold text-yellow-100">PRUEBAUSUARIO20</span></p>
          <p className="text-sm text-yellow-200">Contraseña: <span className="font-mono font-bold text-yellow-100">PRUEBA2025</span></p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-2 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={formData.usuario}
              onChange={(e) => setFormData({...formData, usuario: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 backdrop-blur-sm"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.contraseña}
                onChange={(e) => setFormData({...formData, contraseña: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 pr-12 backdrop-blur-sm"
                placeholder="Ingresa tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-3 rounded-xl font-semibold hover:from-yellow-300 hover:to-amber-400 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
          >
            <LogIn className="w-5 h-5" />
            INICIAR SESIÓN
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-300">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;