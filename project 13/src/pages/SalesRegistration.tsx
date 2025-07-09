import React, { useState } from 'react';
import Layout from '../components/Layout';
import AddSaleModal from '../components/AddSaleModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ExcelImportModal from '../components/ExcelImportModal';
import { useAppContext } from '../context/AppContext';
import { ShoppingCart, Plus, Calendar, Clock, User, Hash, DollarSign, Trash2, Upload, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const SalesRegistration = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const { sales, products, addSale, deleteSale, importSales } = useAppContext();

  const handleAddSale = (saleData: any) => {
    addSale(saleData);
  };

  const handleDeleteSale = () => {
    if (selectedSale) {
      deleteSale(selectedSale.id);
      setSelectedSale(null);
      setShowDeleteModal(false);
    }
  };

  const handleImportSales = (salesData: any[]) => {
    importSales(salesData);
  };

  const exportToExcel = () => {
    const exportData = sales.map(sale => ({
      'Fecha': sale.date,
      'Hora': sale.time,
      'Cliente': sale.customer,
      'Producto': sale.product,
      'Código Producto': sale.productCode,
      'Cantidad': sale.quantity,
      'Precio Unitario': sale.unitPrice,
      'Total': sale.total
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, `ventas_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const totalSalesToday = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalQuantityToday = sales.reduce((sum, sale) => sum + sale.quantity, 0);

  const templateData = [
    {
      'Fecha': '2025-01-15',
      'Hora': '14:30',
      'Cliente': 'Juan Pérez',
      'Producto': 'COCA COLA 600ML',
      'Código Producto': 'CocaCo1314',
      'Cantidad': 2,
      'Precio Unitario': 3.00,
      'Total': 6.00
    }
  ];

  const expectedColumns = ['Fecha', 'Hora', 'Cliente', 'Producto', 'Código Producto', 'Cantidad', 'Precio Unitario', 'Total'];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Registro de Ventas</h1>
          <p className="text-gray-600">Administra y registra todas las ventas realizadas</p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ventas Hoy</p>
                  <p className="text-xl font-bold text-green-600">S/ {totalSalesToday.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Productos Vendidos</p>
                  <p className="text-xl font-bold text-blue-600">{totalQuantityToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Hash className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Transacciones</p>
                  <p className="text-xl font-bold text-purple-600">{sales.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowImportModal(true)}
              className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Upload className="w-5 h-5" />
              IMPORTAR EXCEL
            </button>
            <button
              onClick={exportToExcel}
              className="bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Download className="w-5 h-5" />
              EXPORTAR EXCEL
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              AGREGAR VENTA
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-500" />
                  Registro de Ventas ({sales.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Fecha</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Hora</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cliente</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Producto</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cantidad</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Precio (Unidad)</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {new Date(sale.date).toLocaleDateString('es-ES')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{sale.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{sale.customer}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-800">{sale.product}</p>
                            <p className="text-sm text-gray-500">Código: {sale.productCode}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-800">{sale.quantity}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-800">S/ {sale.unitPrice.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-green-600">S/ {sale.total.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => {
                              setSelectedSale(sale);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Products Available */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Productos Disponibles</h3>
              <div className="space-y-3">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">S/ {product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen del Día</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Ventas</span>
                  <span className="font-bold text-green-600">S/ {totalSalesToday.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Productos Vendidos</span>
                  <span className="font-bold text-blue-600">{totalQuantityToday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Transacciones</span>
                  <span className="font-bold text-purple-600">{sales.length}</span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Promedio por Venta</span>
                  <span className="font-bold text-gray-800">
                    S/ {sales.length > 0 ? (totalSalesToday / sales.length).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddSaleModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSale}
          products={products.map(p => ({
            code: `${p.name.replace(/\s+/g, '').substring(0, 8)}${p.id}`,
            name: p.name,
            price: p.price,
            stock: p.stock
          }))}
        />

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedSale(null);
          }}
          onConfirm={handleDeleteSale}
          title="Eliminar Venta"
          message="¿Estás seguro de que deseas eliminar esta venta? Esta acción restaurará el stock del producto."
          itemName={selectedSale ? `${selectedSale.product} - ${selectedSale.customer}` : ''}
        />

        <ExcelImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={handleImportSales}
          title="Ventas"
          templateData={templateData}
          expectedColumns={expectedColumns}
        />
      </div>
    </Layout>
  );
};

export default SalesRegistration;