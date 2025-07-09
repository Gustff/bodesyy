import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Brain, TrendingUp, Package, Users, Calendar, Zap, Target, Award, AlertCircle, Lightbulb } from 'lucide-react';

const AIAnalytics = () => {
  const { sales, products, purchases, suppliers, currentUser } = useAppContext();
  const [selectedAnalysis, setSelectedAnalysis] = useState('productos-vendidos');

  // Verificar si es usuario de prueba
  const isTestUser = currentUser?.usuario === 'PRUEBAUSUARIO20';

  // Análisis de productos más vendidos
  const getTopSellingProducts = () => {
    const productSales = sales.reduce((acc, sale) => {
      acc[sale.product] = (acc[sale.product] || 0) + sale.quantity;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(productSales)
      .map(([product, quantity]) => ({ product, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  };

  // Análisis de ingresos por producto
  const getRevenueByProduct = () => {
    const productRevenue = sales.reduce((acc, sale) => {
      acc[sale.product] = (acc[sale.product] || 0) + sale.total;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(productRevenue)
      .map(([product, revenue]) => ({ product, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  // Análisis de tendencias de ventas por día
  const getSalesTrends = () => {
    const salesByDate = sales.reduce((acc, sale) => {
      const date = new Date(sale.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
      acc[date] = (acc[date] || 0) + sale.total;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(salesByDate)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Análisis de proveedores más rentables
  const getTopSuppliers = () => {
    const supplierData = purchases.reduce((acc, purchase) => {
      acc[purchase.supplier] = (acc[purchase.supplier] || 0) + purchase.totalPrice;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(supplierData)
      .map(([supplier, spent]) => ({ supplier, spent }))
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 4);
  };

  // Análisis de categorías más populares
  const getCategoryAnalysis = () => {
    const categoryData = products.reduce((acc, product) => {
      const salesForProduct = sales.filter(sale => sale.product === product.name);
      const totalSold = salesForProduct.reduce((sum, sale) => sum + sale.quantity, 0);
      acc[product.category] = (acc[product.category] || 0) + totalSold;
      return acc;
    }, {} as Record<string, number>);

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    
    return Object.entries(categoryData)
      .map(([category, sold], index) => ({ 
        category, 
        sold, 
        color: colors[index % colors.length] 
      }))
      .sort((a, b) => b.sold - a.sold);
  };

  // Análisis de rendimiento de inventario
  const getInventoryPerformance = () => {
    return products.map(product => {
      const productSales = sales.filter(sale => sale.product === product.name);
      const totalSold = productSales.reduce((sum, sale) => sum + sale.quantity, 0);
      const rotationRate = product.stock > 0 ? (totalSold / product.stock) * 100 : 0;
      
      return {
        product: product.name.substring(0, 15) + '...',
        stock: product.stock,
        vendidos: totalSold,
        rotacion: Math.round(rotationRate)
      };
    }).slice(0, 6);
  };

  // Datos de ejemplo para usuario de prueba
  const sampleData = {
    topProducts: [
      { product: 'COCA COLA 600ML', quantity: 15 },
      { product: 'LECHE GLORIA TARRO', quantity: 12 },
      { product: 'AZÚCAR RUBIA', quantity: 8 },
      { product: 'YOGURT NATURAL', quantity: 6 },
      { product: 'PAN INTEGRAL', quantity: 4 }
    ],
    revenueProducts: [
      { product: 'COCA COLA 600ML', revenue: 45.00 },
      { product: 'LECHE GLORIA TARRO', revenue: 48.00 },
      { product: 'AZÚCAR RUBIA', revenue: 20.00 },
      { product: 'YOGURT NATURAL', revenue: 21.00 },
      { product: 'PAN INTEGRAL', revenue: 12.00 }
    ],
    salesTrends: [
      { date: '01/07', total: 25.50 },
      { date: '02/07', total: 32.00 },
      { date: '03/07', total: 18.50 },
      { date: '04/07', total: 41.00 },
      { date: '05/07', total: 29.00 },
      { date: '06/07', total: 22.00 }
    ],
    categories: [
      { category: 'Bebidas', sold: 15, color: '#3B82F6' },
      { category: 'Lácteos', sold: 18, color: '#10B981' },
      { category: 'Abarrotes', sold: 8, color: '#F59E0B' },
      { category: 'Panadería', sold: 4, color: '#EF4444' }
    ]
  };

  // Usar datos reales o de ejemplo
  const topProducts = isTestUser ? sampleData.topProducts : getTopSellingProducts();
  const revenueProducts = isTestUser ? sampleData.revenueProducts : getRevenueByProduct();
  const salesTrends = isTestUser ? sampleData.salesTrends : getSalesTrends();
  const categories = isTestUser ? sampleData.categories : getCategoryAnalysis();
  const topSuppliers = isTestUser ? [
    { supplier: 'AJE PERIS', spent: 300 },
    { supplier: 'GLORIA S.A.', spent: 450 },
    { supplier: 'CASA GRANDE', spent: 180 },
    { supplier: 'LAIVE S.A.', spent: 200 }
  ] : getTopSuppliers();
  const inventoryPerformance = isTestUser ? [
    { product: 'COCA COLA 600ML', stock: 21, vendidos: 15, rotacion: 71 },
    { product: 'LECHE GLORIA...', stock: 41, vendidos: 12, rotacion: 29 },
    { product: 'AZÚCAR RUBIA', stock: 5, vendidos: 8, rotacion: 160 },
    { product: 'YOGURT NATURAL', stock: 12, vendidos: 6, rotacion: 50 }
  ] : getInventoryPerformance();

  // Insights de IA
  const getAIInsights = () => {
    if (!isTestUser && sales.length === 0) return [];
    
    return [
      {
        type: 'success',
        icon: <Award className="w-5 h-5" />,
        title: 'Producto Estrella',
        message: `${topProducts[0]?.product || 'COCA COLA 600ML'} es tu producto más vendido con ${topProducts[0]?.quantity || 15} unidades.`
      },
      {
        type: 'warning',
        icon: <AlertCircle className="w-5 h-5" />,
        title: 'Oportunidad de Mejora',
        message: 'Considera aumentar el stock de productos con alta rotación para maximizar ventas.'
      },
      {
        type: 'info',
        icon: <Lightbulb className="w-5 h-5" />,
        title: 'Recomendación IA',
        message: 'Los productos de la categoría Lácteos muestran un crecimiento constante del 15%.'
      },
      {
        type: 'success',
        icon: <Target className="w-5 h-5" />,
        title: 'Meta Alcanzada',
        message: 'Has superado el objetivo de ventas mensuales en un 8%. ¡Excelente trabajo!'
      }
    ];
  };

  const aiInsights = getAIInsights();

  // Si no hay datos y no es usuario de prueba
  if (!isTestUser && sales.length === 0 && products.length === 0) {
    return (
      <Layout>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Análisis de IA</h1>
            <p className="text-gray-600">Inteligencia artificial para optimizar tu bodega</p>
          </div>

          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-12 h-12 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">IA Lista para Analizar</h2>
              <p className="text-gray-600 mb-8">
                Agrega productos y registra ventas para que la IA genere análisis inteligentes y recomendaciones personalizadas.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Agrega Productos</h3>
                  <p className="text-sm text-gray-600">Para análisis de inventario</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Registra Ventas</h3>
                  <p className="text-sm text-gray-600">Para análisis de tendencias</p>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            Análisis de IA
          </h1>
          <p className="text-gray-600">Inteligencia artificial para optimizar tu bodega</p>
        </div>

        {/* Analysis Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'productos-vendidos', label: 'Productos Más Vendidos', icon: <Package className="w-4 h-4" /> },
              { id: 'ingresos-producto', label: 'Ingresos por Producto', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'tendencias', label: 'Tendencias de Ventas', icon: <Calendar className="w-4 h-4" /> },
              { id: 'categorias', label: 'Análisis de Categorías', icon: <Target className="w-4 h-4" /> },
              { id: 'inventario', label: 'Rendimiento de Inventario', icon: <Zap className="w-4 h-4" /> }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedAnalysis(option.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedAnalysis === option.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              {selectedAnalysis === 'productos-vendidos' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-500" />
                    Productos Más Vendidos
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topProducts}>
                        <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}

              {selectedAnalysis === 'ingresos-producto' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Ingresos por Producto
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueProducts}>
                        <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}

              {selectedAnalysis === 'tendencias' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Tendencias de Ventas
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesTrends}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Line 
                          type="monotone" 
                          dataKey="total" 
                          stroke="#3B82F6" 
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}

              {selectedAnalysis === 'categorias' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-500" />
                    Análisis de Categorías
                  </h2>
                  <div className="flex items-center justify-center h-80">
                    <div className="h-64 w-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categories}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="sold"
                          >
                            {categories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="ml-8 space-y-3">
                      {categories.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-gray-700">{item.category}</span>
                          <span className="text-gray-500">({item.sold} vendidos)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedAnalysis === 'inventario' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Rendimiento de Inventario
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={inventoryPerformance}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="product" />
                        <PolarRadiusAxis angle={90} domain={[0, 200]} />
                        <Radar
                          name="Rotación %"
                          dataKey="rotacion"
                          stroke="#F59E0B"
                          fill="#F59E0B"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                Insights de IA
              </h3>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl border-l-4 ${
                      insight.type === 'success' ? 'bg-green-50 border-green-500' :
                      insight.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1 rounded-full ${
                        insight.type === 'success' ? 'bg-green-500' :
                        insight.type === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}>
                        <div className="text-white">
                          {insight.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${
                          insight.type === 'success' ? 'text-green-800' :
                          insight.type === 'warning' ? 'text-yellow-800' :
                          'text-blue-800'
                        }`}>
                          {insight.title}
                        </p>
                        <p className={`text-xs mt-1 ${
                          insight.type === 'success' ? 'text-green-600' :
                          insight.type === 'warning' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>
                          {insight.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Métricas Clave</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Producto Top</span>
                  <span className="font-bold text-purple-600">
                    {topProducts[0]?.product?.substring(0, 12) || 'N/A'}...
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Categoría Líder</span>
                  <span className="font-bold text-green-600">
                    {categories[0]?.category || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Rotación Promedio</span>
                  <span className="font-bold text-blue-600">
                    {inventoryPerformance.length > 0 
                      ? Math.round(inventoryPerformance.reduce((sum, item) => sum + item.rotacion, 0) / inventoryPerformance.length)
                      : 0}%
                  </span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Precisión IA</span>
                  <span className="font-bold text-gray-800">94.2%</span>
                </div>
              </div>
            </div>

            {/* Supplier Performance */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Proveedores</h3>
              <div className="space-y-3">
                {topSuppliers.slice(0, 4).map((supplier, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {supplier.supplier.substring(0, 10)}...
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">
                      S/ {supplier.spent}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIAnalytics;