import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Calculator, Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CashControl = () => {
  const { sales, purchases, currentUser } = useAppContext();
  const [cashData, setCashData] = useState({
    openingBalance: 500,
    isOpen: true
  });

  // Verificar si es usuario de prueba
  const isTestUser = currentUser?.usuario === 'PRUEBAUSUARIO20';

  // Transacciones de ejemplo solo para usuario de prueba
  const sampleTransactions = isTestUser ? [
    { id: 1, type: 'income', amount: 1000, description: 'Ventas del día', time: '09:00' },
    { id: 2, type: 'expense', amount: 400, description: 'Compra de productos', time: '10:30' },
    { id: 3, type: 'income', amount: 850, description: 'Ventas adicionales', time: '14:15' },
    { id: 4, type: 'expense', amount: 500, description: 'Gastos operativos', time: '16:20' },
    { id: 5, type: 'income', amount: 1200, description: 'Ventas de tarde', time: '18:45' },
    { id: 6, type: 'expense', amount: 700, description: 'Pago a proveedores', time: '19:30' },
  ] : [];

  // Calcular totales reales basados en ventas y compras
  const realTotalIncome = sales.reduce((sum, sale) => sum + sale.total, 0);
  const realTotalExpense = purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0);

  // Usar datos reales si existen, sino usar datos de ejemplo para usuario de prueba
  const transactions = sampleTransactions;
  const totalIncome = isTestUser ? 
    transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) : 
    realTotalIncome;
  const totalExpense = isTestUser ? 
    transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) : 
    realTotalExpense;

  const difference = totalIncome - totalExpense;
  const currentBalance = cashData.openingBalance + difference;

  // Si no hay datos y no es usuario de prueba, mostrar estado vacío
  if (!isTestUser && sales.length === 0 && purchases.length === 0) {
    return (
      <Layout>
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Control de Caja</h1>
            <p className="text-gray-600">Gestiona el flujo de efectivo y controla ingresos y egresos</p>
          </div>

          {/* Cash Status and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Estado de Caja</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  cashData.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {cashData.isOpen ? 'Abierta' : 'Cerrada'}
                </div>
              </div>
              <button
                onClick={() => setCashData({...cashData, isOpen: !cashData.isOpen})}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  cashData.isOpen 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {cashData.isOpen ? 'CERRAR CAJA' : 'ABRIR CAJA'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar Movimiento</h3>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                AGREGAR COMPRA
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Control</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Saldo Inicial:</span>
                  <span className="font-semibold">S/ {cashData.openingBalance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saldo Actual:</span>
                  <span className="font-semibold text-blue-600">S/ {cashData.openingBalance}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Diferencia</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400">S/ 0</div>
                <div className="text-sm font-medium text-gray-400">Sin movimientos</div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Control de Caja Vacío</h2>
              <p className="text-gray-600 mb-8">
                Comienza registrando ventas y compras para ver el flujo de efectivo aquí.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Registra Ventas</h3>
                  <p className="text-sm text-gray-600">Para ver ingresos</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Registra Compras</h3>
                  <p className="text-sm text-gray-600">Para ver egresos</p>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Control de Caja</h1>
          <p className="text-gray-600">Gestiona el flujo de efectivo y controla ingresos y egresos</p>
        </div>

        {/* Cash Status and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Estado de Caja</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                cashData.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {cashData.isOpen ? 'Abierta' : 'Cerrada'}
              </div>
            </div>
            <button
              onClick={() => setCashData({...cashData, isOpen: !cashData.isOpen})}
              className={`w-full py-3 rounded-xl font-medium transition-colors ${
                cashData.isOpen 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {cashData.isOpen ? 'CERRAR CAJA' : 'ABRIR CAJA'}
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar Movimiento</h3>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              AGREGAR COMPRA
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Control</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Saldo Inicial:</span>
                <span className="font-semibold">S/ {cashData.openingBalance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saldo Actual:</span>
                <span className="font-semibold text-blue-600">S/ {currentBalance}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Diferencia</h3>
            <div className="text-center">
              <div className={`text-3xl font-bold ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                S/ {Math.abs(difference)}
              </div>
              <div className={`text-sm font-medium ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {difference >= 0 ? 'Ganancia' : 'Pérdida'}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Ingresos</p>
                <p className="text-2xl font-bold text-green-600">S/ {totalIncome}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Egresos</p>
                <p className="text-2xl font-bold text-red-600">S/ {totalExpense}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Balance Neto</p>
                <p className={`text-2xl font-bold ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  S/ {difference}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-500" />
              Registro de Movimientos
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Descripción</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Hora</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Ingreso</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Egreso</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Diferencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => {
                  const runningBalance = transactions.slice(0, index + 1).reduce((sum, t) => 
                    sum + (t.type === 'income' ? t.amount : -t.amount), 0
                  );
                  
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {transaction.type === 'income' ? (
                            <div className="p-1 bg-green-100 rounded-full">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="p-1 bg-red-100 rounded-full">
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            </div>
                          )}
                          <span className={`text-sm font-medium ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? 'Ingreso' : 'Egreso'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{transaction.description}</td>
                      <td className="px-6 py-4 text-gray-600 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {transaction.time}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {transaction.type === 'income' ? (
                          <span className="font-semibold text-green-600">S/ {transaction.amount}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {transaction.type === 'expense' ? (
                          <span className="font-semibold text-red-600">S/ {transaction.amount}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-semibold ${runningBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          S/ {runningBalance}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50 font-semibold">
                <tr>
                  <td className="px-6 py-4" colSpan={3}>TOTALES</td>
                  <td className="px-6 py-4 text-center text-green-600">S/ {totalIncome}</td>
                  <td className="px-6 py-4 text-center text-red-600">S/ {totalExpense}</td>
                  <td className={`px-6 py-4 text-center ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    S/ {difference}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CashControl;