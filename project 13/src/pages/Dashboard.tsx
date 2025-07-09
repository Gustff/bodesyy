import React from 'react';
import Layout from '../components/Layout';
import { TrendingUp, Package, ShoppingCart, Users, AlertTriangle, Calendar, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { products, sales, users, currentUser } = useAppContext();

  // Calcular estadísticas dinámicas
  const totalProducts = products.length;
  const totalSalesToday = sales.reduce((sum, sale) => sum + sale.total, 0);
  const activeUsers = users.filter(u => u.status === 'active').length;
  const lowStockItems = products.filter(p => p.status === 'low_stock').length;
  const expiringItems = products.filter(p => p.status === 'expiring_soon').length;
  const totalAlerts = lowStockItems + expiringItems;

  const stats = [
    { label: 'Productos en Stock', value: totalProducts.toString(), icon: Package, color: 'bg-blue-500' },
    { label: 'Ventas del Día', value: `S/ ${totalSalesToday.toFixed(2)}`, icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Usuarios Activos', value: activeUsers.toString(), icon: Users, color: 'bg-purple-500' },
    { label: 'Alertas Pendientes', value: totalAlerts.toString(), icon: AlertTriangle, color: 'bg-orange-500' },
  ];

  // Mostrar las últimas 3 ventas
  const recentSales = sales.slice(-3).reverse();

  // Mostrar productos con stock bajo
  const lowStockProducts = products.filter(p => p.status === 'low_stock' || p.status === 'expiring_soon');

  // Verificar si es un dashboard vacío
  const isDashboardEmpty = totalProducts === 0 && sales.length === 0 && users.length === 0;

  if (isDashboardEmpty) {
    return (
      <Layout>
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ¡Bienvenido a Bodesy, {currentUser?.nombre || 'Usuario'}!
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu dashboard está listo</h2>
              <p className="text-gray-600 mb-8">
                Comienza agregando usuarios, proveedores y productos para gestionar tu bodega de manera eficiente.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Agregar Usuarios</h3>
                  <p className="text-sm text-gray-600">Gestiona el equipo de tu bodega</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Agregar Productos</h3>
                  <p className="text-sm text-gray-600">Comienza tu inventario</p>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard - {currentUser?.nombre || 'Usuario'}
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Sales */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Ventas Recientes
            </h2>
            {recentSales.length > 0 ? (
              <div className="space-y-4">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800">{sale.product}</p>
                      <p className="text-sm text-gray-600">Cliente: {sale.customer}</p>
                      <p className="text-sm text-gray-600">Cantidad: {sale.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">S/ {sale.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{sale.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay ventas registradas</p>
              </div>
            )}
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Alertas de Inventario
            </h2>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-4">
                {lowStockProducts.slice(0, 3).map((item, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <span className="text-sm font-medium text-orange-600">
                        Stock: {item.stock}
                      </span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((item.stock / 20) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-orange-600 mt-1">
                      {item.status === 'low_stock' ? 'Stock bajo' : 'Próximo a vencer'}
                    </p>
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
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;