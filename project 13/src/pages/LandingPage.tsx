import React from 'react';
import { Link } from 'react-router-dom';
import { Warehouse, ArrowRight, BarChart3, Users, Package, TrendingUp, Shield, Zap, Globe, Brain, Target, Lightbulb, Star, Crown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const LandingPage = () => {
  const chartData = [
    { month: 'Ene', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Abr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
    { month: 'Jul', value: 7000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background decorative elements with gold accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-l from-yellow-500/8 to-orange-400/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-400/3 to-yellow-500/3 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 min-h-screen">
        {/* Navigation Header */}
        <nav className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl shadow-lg">
              <Warehouse className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Bodesy
            </h1>
          </div>
          <Link
            to="/login"
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-3 rounded-xl font-bold hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Iniciar Sesión
          </Link>
        </nav>

        {/* Hero Section - Optimized for Desktop */}
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <Crown className="w-6 h-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Premium Experience</span>
              </div>
              
              <h2 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Simplifica tu bodega.
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Controla todo con Bodesy
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                La plataforma completa para gestionar tu inventario, ventas, compras y control de caja 
                en un solo lugar con <span className="font-bold text-yellow-400">inteligencia artificial avanzada</span> y análisis predictivo de nivel empresarial.
              </p>

              {/* AI Features Highlight */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-yellow-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-white font-bold text-lg">Potenciado por IA Premium</h3>
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">Análisis predictivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">Recomendaciones inteligentes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">Optimización automática</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">Insights en tiempo real</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to="/login"
                className="group bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-10 py-5 rounded-2xl font-bold text-xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-4 w-fit mb-8"
              >
                INGRESAR AL SISTEMA
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">99.9%</div>
                  <div className="text-gray-400 text-sm">Disponibilidad</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-gray-400 text-sm">Soporte IA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                  <div className="text-gray-400 text-sm">Empresas</div>
                </div>
              </div>
            </div>

            {/* Right Column - Chart and Features */}
            <div className="space-y-8">
              {/* Performance Chart */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-white font-semibold text-lg">Análisis IA en Tiempo Real</h3>
                  <div className="ml-auto px-3 py-1 bg-yellow-400/20 rounded-full">
                    <span className="text-yellow-400 text-xs font-bold">PREMIUM</span>
                  </div>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#FCD34D', fontSize: 12 }} />
                      <YAxis hide />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="url(#goldGradient)" 
                        strokeWidth={4}
                        dot={{ fill: '#FCD34D', strokeWidth: 3, r: 6 }}
                      />
                      <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FCD34D" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-gray-300 text-sm">Predicción de ventas con </span>
                  <span className="text-yellow-400 font-bold">94.2% de precisión</span>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 hover:from-gray-700/40 hover:to-gray-800/40 transition-all duration-300 border border-yellow-500/10 hover:border-yellow-500/30">
                  <Brain className="w-8 h-8 text-yellow-400 mb-4" />
                  <h4 className="text-white font-semibold mb-2">IA Avanzada</h4>
                  <p className="text-gray-400 text-sm">Análisis predictivo y recomendaciones inteligentes</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 hover:from-gray-700/40 hover:to-gray-800/40 transition-all duration-300 border border-yellow-500/10 hover:border-yellow-500/30">
                  <Shield className="w-8 h-8 text-yellow-400 mb-4" />
                  <h4 className="text-white font-semibold mb-2">Seguro</h4>
                  <p className="text-gray-400 text-sm">Datos protegidos con encriptación avanzada</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 hover:from-gray-700/40 hover:to-gray-800/40 transition-all duration-300 border border-yellow-500/10 hover:border-yellow-500/30">
                  <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                  <h4 className="text-white font-semibold mb-2">Rápido</h4>
                  <p className="text-gray-400 text-sm">Procesamiento en tiempo real</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 hover:from-gray-700/40 hover:to-gray-800/40 transition-all duration-300 border border-yellow-500/10 hover:border-yellow-500/30">
                  <Target className="w-8 h-8 text-yellow-400 mb-4" />
                  <h4 className="text-white font-semibold mb-2">Preciso</h4>
                  <p className="text-gray-400 text-sm">Predicciones con alta precisión</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Features Section */}
        <div className="bg-gradient-to-r from-yellow-500/5 to-amber-500/5 backdrop-blur-sm py-20 border-t border-yellow-500/20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Brain className="w-12 h-12 text-yellow-400" />
                <h3 className="text-4xl font-bold text-white">Inteligencia Artificial</h3>
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-bold rounded-full">
                  PREMIUM
                </span>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Nuestra IA analiza patrones, predice tendencias y optimiza automáticamente tu inventario para maximizar ganancias
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm group-hover:from-yellow-400/30 group-hover:to-amber-500/30 transition-all duration-300 border border-yellow-500/30">
                  <Target className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Análisis Predictivo</h3>
                <p className="text-gray-300 leading-relaxed">
                  Predice qué productos se venderán más, cuándo reabastecer y optimiza tu inventario automáticamente
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm group-hover:from-yellow-400/30 group-hover:to-amber-500/30 transition-all duration-300 border border-yellow-500/30">
                  <Lightbulb className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Recomendaciones Inteligentes</h3>
                <p className="text-gray-300 leading-relaxed">
                  Recibe sugerencias personalizadas para mejorar ventas, reducir costos y optimizar operaciones
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm group-hover:from-yellow-400/30 group-hover:to-amber-500/30 transition-all duration-300 border border-yellow-500/30">
                  <BarChart3 className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Insights en Tiempo Real</h3>
                <p className="text-gray-300 leading-relaxed">
                  Dashboards inteligentes que se actualizan automáticamente con métricas clave y alertas importantes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm py-20 border-t border-yellow-500/20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-6">Funcionalidades Completas</h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Todo lo que necesitas para gestionar tu bodega de manera profesional y eficiente
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm group-hover:from-yellow-400/30 group-hover:to-amber-500/30 transition-all duration-300 border border-yellow-500/30">
                  <BarChart3 className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Control Total</h3>
                <p className="text-gray-300 leading-relaxed">
                  Monitorea ventas, compras e inventario en tiempo real con dashboards intuitivos y reportes detallados
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm group-hover:from-yellow-400/30 group-hover:to-amber-500/30 transition-all duration-300 border border-yellow-500/30">
                  <Package className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Inventario Inteligente</h3>
                <p className="text-gray-300 leading-relaxed">
                  Alertas automáticas de stock bajo, productos por vencer y gestión avanzada de categorías con IA
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm group-hover:from-yellow-400/30 group-hover:to-amber-500/30 transition-all duration-300 border border-yellow-500/30">
                  <Users className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Gestión Completa</h3>
                <p className="text-gray-300 leading-relaxed">
                  Administra usuarios, proveedores y clientes con roles y permisos personalizados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 px-8 border-t border-yellow-500/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl">
                  <Warehouse className="w-6 h-6 text-black" />
                </div>
                <span className="text-white font-semibold">Bodesy 2025</span>
                <span className="text-yellow-400">•</span>
                <span className="text-yellow-400 font-semibold">Powered by Premium AI</span>
              </div>
              <div className="flex items-center gap-6 text-gray-400">
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-yellow-400" />
                  IA Premium
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-yellow-400" />
                  Disponible 24/7
                </span>
                <span>•</span>
                <span>Soporte técnico premium</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;