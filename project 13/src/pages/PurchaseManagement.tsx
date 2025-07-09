import React, { useState } from 'react';
import Layout from '../components/Layout';
import AddPurchaseModal from '../components/AddPurchaseModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ExcelImportModal from '../components/ExcelImportModal';
import { useAppContext } from '../context/AppContext';
import { ShoppingBag, Plus, Calendar, Clock, Building, Hash, DollarSign, Trash2, Upload, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const PurchaseManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const { purchases, addPurchase, deletePurchase, importPurchases } = useAppContext();

  const handleAddPurchase = (purchaseData: any) => {
    addPurchase(purchaseData);
  };

  const handleDeletePurchase = () => {
    if (selectedPurchase) {
      deletePurchase(selectedPurchase.id);
      setSelectedPurchase(null);
      setShowDeleteModal(false);
    }
  };

  const handleImportPurchases = (purchaseData: any[]) => {
    importPurchases(purchaseData);
  };

  const exportToExcel = () => {
    const exportData = purchases.map(purchase => ({
      'Fecha': purchase.date,
      'Hora': purchase.time,
      'Proveedor': purchase.supplier,
      'Producto': purchase.product,
      'Código Producto': purchase.productCode,
      'Cantidad': purchase.quantity,
      'Precio Unitario': purchase.unitPrice,
      'Precio Total': purchase.totalPrice
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Compras");
    XLSX.writeFile(wb, `compras_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const availableProducts = [
    { code: 'CocaCo1314', name: 'COCA COLA 600ML', supplier: 'Coca Cola Co.', lastPrice: 1.43 },
    { code: 'LecheGl1520', name: 'LECHE GLORIA TARRO', supplier: 'Gloria S.A.', lastPrice: 3.00 },
    { code: 'AzucarRb1102', name: 'AZÚCAR RUBIA', supplier: 'Casa Grande', lastPrice: 1.80 },
    { code: 'YogurtNt1205', name: 'YOGURT NATURAL', supplier: 'Laive S.A.', lastPrice: 2.50 },
    { code: 'PanInt1430', name: 'PAN INTEGRAL', supplier: 'Panadería Central', lastPrice: 0.80 },
    { code: 'AceiteOl1678', name: 'ACEITE PRIMOR', supplier: 'Alicorp', lastPrice: 4.20 },
  ];

  const totalPurchasesToday = purchases
    .filter(p => p.date === '2025-07-06')
    .reduce((sum, purchase) => sum + purchase.totalPrice, 0);
  
  const totalQuantityToday = purchases
    .filter(p => p.date === '2025-07-06')
    .reduce((sum, purchase) => sum + purchase.quantity, 0);

  const todaysPurchases = purchases.filter(p => p.date === '2025-07-06').length;

  const templateData = [
    {
      'Fecha': '2025-01-15',
      'Hora': '10:30',
      'Proveedor': 'AJE PERIS',
      'Producto': 'COCA COLA 600ML',
      'Código Producto': 'CocaCo1314',
      'Cantidad': 100,
      'Precio Unitario': 1.43,
      'Precio Total': 143.00
    }
  ];

  const expectedColumns = ['Fecha', 'Hora', 'Proveedor', 'Producto', 'Código Producto', 'Cantidad', 'Precio Unitario', 'Precio Total'];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Compras</h1>
          <p className="text-gray-600">Administra y registra todas las compras realizadas a proveedores</p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Compras Hoy</p>
                  <p className="text-xl font-bold text-blue-600">S/ {totalPurchasesToday.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Productos Comprados</p>
                  <p className="text-xl font-bold text-green-600">{totalQuantityToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Hash className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Órdenes Hoy</p>
                  <p className="text-xl font-bold text-purple-600">{todaysPurchases}</p>
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
              AGREGAR COMPRA
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purchases Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-500" />
                  Registro de Compras ({purchases.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Fecha</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Hora</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Proveedor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Producto</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cantidad</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Precio Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {purchases.map((purchase) => (
                      <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {new Date(purchase.date).toLocaleDateString('es-ES')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{purchase.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{purchase.supplier}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-800">{purchase.product}</p>
                            <p className="text-sm text-gray-500">Código: {purchase.productCode}</p>
                            <p className="text-sm text-gray-500">Unitario: S/ {purchase.unitPrice.toFixed(2)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-800">{purchase.quantity} unidades</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-blue-600">S/ {purchase.totalPrice.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => {
                              setSelectedPurchase(purchase);
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
                {availableProducts.map((product) => (
                  <div key={product.code} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                      <span className="font-bold text-blue-600 text-sm">S/ {product.lastPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500">Código: {product.code}</p>
                    <p className="text-xs text-gray-500">Proveedor: {product.supplier}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen del Período</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Compras (Hoy)</span>
                  <span className="font-bold text-blue-600">S/ {totalPurchasesToday.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Productos Adquiridos</span>
                  <span className="font-bold text-green-600">{totalQuantityToday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Órdenes de Compra</span>
                  <span className="font-bold text-purple-600">{todaysPurchases}</span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Histórico</span>
                  <span className="font-bold text-gray-800">
                    S/ {purchases.reduce((sum, p) => sum + p.totalPrice, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Promedio por Orden</span>
                  <span className="font-bold text-gray-600">
                    S/ {purchases.length > 0 ? (purchases.reduce((sum, p) => sum + p.totalPrice, 0) / purchases.length).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddPurchaseModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddPurchase}
        />

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedPurchase(null);
          }}
          onConfirm={handleDeletePurchase}
          title="Eliminar Compra"
          message="¿Estás seguro de que deseas eliminar esta compra? Esta acción reducirá el stock del producto."
          itemName={selectedPurchase ? `${selectedPurchase.product} - ${selectedPurchase.supplier}` : ''}
        />

        <ExcelImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={handleImportPurchases}
          title="Compras"
          templateData={templateData}
          expectedColumns={expectedColumns}
        />
      </div>
    </Layout>
  );
};

export default PurchaseManagement;