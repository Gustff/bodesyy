import React, { useState } from 'react';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Package, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ResultsPanel = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('Julio');
  const { sales, purchases, products, currentUser } = useAppContext();

  // Verificar si es usuario de prueba
  const isTestUser = currentUser?.usuario === 'PRUEBAUSUARIO20';

  // Datos para gráficos - solo mostrar si hay datos o es usuario de prueba
  const monthlyData = isTestUser ? [
    { month: 'Ene', ventas: 4000, compras: 2400 },
    { month: 'Feb', ventas: 3000, compras: 1398 },
    { month: 'Mar', ventas: 2000, compras: 9800 },
    { month: 'Abr', ventas: 2780, compras: 3908 },
    { month: 'May', ventas: 1890, compras: 4800 },
    { month: 'Jun', ventas: 2390, compras: 3800 },
    { month: 'Jul', ventas: 3490, compras: 4300 },
  ] : [];

  const categoryData = isTestUser ? [
    { name: 'Bebidas', value: 35, color: '#3B82F6' },
    { name: 'Lácteos', value: 28, color: '#10B981' },
    { name: 'Panadería', value: 22, color: '#F59E0B' },
    { name: 'Otros', value: 15, color: '#EF4444' },
  ] : [];

  const alerts = isTestUser ? [
    { type: 'Poco stock', product: 'Azúcar Rubia', quantity: 5, status: 'critical' },
    { type: 'Poco stock', product: 'Aceite Primor', quantity: 3, status: 'critical' },
    { type: 'Próximo a vencer', product: 'Yogurt Natural', days: 2, status: 'warning' },
    { type: 'Próximo a vencer', product: 'Pan Integral', days: 1, status: 'critical' },
  ] : [];

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Calcular totales reales
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0);
  const profit = totalSales - totalPurchases;
  const margin = totalSales > 0 ? ((profit / totalSales) * 100) : 0;

  // Si no hay datos y no es usuario de prueba, mostrar estado vacío
  if (!isTestUser && sales.length === 0 && purchases.length === 0) {
    return (
      <Layout>
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Panel de Resultados</h1>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Año:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2025">2025</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Mes:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Panel de Resultados Vacío</h2>
              <p className="text-gray-600 mb-8">
                Comienza registrando ventas y compras para ver tus resultados y análisis aquí.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Registra Ventas</h3>
                  <p className="text-sm text-gray-600">Para ver gráficos de ingresos</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Registra Compras</h3>
                  <p className="text-sm text-gray-600">Para analizar gastos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Panel de Resultados</h1>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Año:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2025">2025</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Mes:</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Monthly Sales and Purchases */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Ventas vs Compras - {selectedYear}
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar dataKey="ventas" fill="#3B82F6" name="Ventas" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="compras" fill="#10B981" name="Compras" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Tendencia de Ingresos</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line 
                      type="monotone" 
                      dataKey="ventas" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Distribución por Categorías</h2>
              <div className="flex items-center justify-center">
                <div className="h-64 w-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="ml-8 space-y-3">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-500">({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Alertas Inteligentes
              </h2>
              
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl border-l-4 ${
                        alert.status === 'critical' 
                          ? 'bg-red-50 border-red-500' 
                          : 'bg-yellow-50 border-yellow-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1 rounded-full ${
                          alert.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}>
                          {alert.type === 'Poco stock' ? (
                            <Package className="w-4 h-4 text-white" />
                          ) : (
                            <Calendar className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            alert.status === 'critical' ? 'text-red-800' : 'text-yellow-800'
                          }`}>
                            {alert.type}
                          </p>
                          <p className={`text-sm ${
                            alert.status === 'critical' ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {alert.product}
                          </p>
                          <p className={`text-xs ${
                            alert.status === 'critical' ? 'text-red-500' : 'text-yellow-500'
                          }`}>
                            {alert.type === 'Poco stock' 
                              ? `Stock: ${alert.quantity} unidades`
                              : `Vence en ${alert.days} días`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No hay alertas pendientes</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen del Mes</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Ventas</span>
                  <span className="font-bold text-green-600">S/ {totalSales.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Compras</span>
                  <span className="font-bold text-blue-600">S/ {totalPurchases.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ganancia</span>
                  <span className={`font-bold ${profit >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                    S/ {profit.toFixed(2)}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Margen</span>
                  <span className="font-bold text-gray-800">{margin.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResultsPanel;