import React, { useState } from 'react';
import Layout from '../components/Layout';
import AddSupplierModal from '../components/AddSupplierModal';
import EditSupplierModal from '../components/EditSupplierModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ExcelImportModal from '../components/ExcelImportModal';
import { useAppContext } from '../context/AppContext';
import { Truck, Plus, Search, Edit2, Trash2, Building, Mail, Phone, Package, Upload, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const SupplierManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const { suppliers, addSupplier, updateSupplier, deleteSupplier, importSuppliers } = useAppContext();

  const activities = [
    { supplier: 'AJE PERIS', action: 'Entrega de productos', time: '11:30 AM', type: 'delivery' },
    { supplier: 'GLORIA S.A.', action: 'Actualización de precios', time: '10:15 AM', type: 'update' },
    { supplier: 'CASA GRANDE', action: 'Nuevo pedido realizado', time: '09:45 AM', type: 'order' },
    { supplier: 'LAIVE S.A.', action: 'Contrato renovado', time: 'Yesterday', type: 'contract' },
  ];

  const handleAddSupplier = (supplierData: any) => {
    addSupplier(supplierData);
  };

  const handleEditSupplier = (supplierData: any) => {
    updateSupplier(selectedSupplier.id, supplierData);
    setSelectedSupplier(null);
  };

  const handleDeleteSupplier = () => {
    if (selectedSupplier) {
      deleteSupplier(selectedSupplier.id);
      setSelectedSupplier(null);
      setShowDeleteModal(false);
    }
  };

  const handleImportSuppliers = (supplierData: any[]) => {
    importSuppliers(supplierData);
  };

  const exportToExcel = () => {
    const exportData = suppliers.map(supplier => ({
      'Razón Social': supplier.companyName,
      'RUC': supplier.ruc,
      'Email': supplier.email,
      'Teléfono': supplier.phone,
      'Contacto': supplier.contact,
      'Producto': supplier.product,
      'Estado': supplier.status === 'active' ? 'Activo' : 'Inactivo'
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Proveedores");
    XLSX.writeFile(wb, `proveedores_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.ruc.includes(searchTerm) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'delivery':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'update':
        return <Edit2 className="w-4 h-4 text-green-600" />;
      case 'order':
        return <Package className="w-4 h-4 text-purple-600" />;
      default:
        return <Building className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'delivery':
        return 'bg-blue-100';
      case 'update':
        return 'bg-green-100';
      case 'order':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  const templateData = [
    {
      'Razón Social': 'Distribuidora Ejemplo S.A.C.',
      'RUC': '20123456789',
      'Email': 'ventas@ejemplo.com',
      'Teléfono': '+51-1-234-5678',
      'Contacto': 'María González',
      'Producto': 'Bebidas Gaseosas',
      'Estado': 'Activo'
    }
  ];

  const expectedColumns = ['Razón Social', 'RUC', 'Email', 'Teléfono', 'Contacto', 'Producto', 'Estado'];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Proveedores</h1>
          <p className="text-gray-600">Administra la información de tus proveedores y contactos</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar proveedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              AGREGAR PROVEEDOR
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suppliers Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-500" />
                  Lista de Proveedores ({filteredSuppliers.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Razón Social</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">RUC</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contacto</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Producto</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Estado</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSuppliers.map((supplier) => (
                      <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Building className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{supplier.companyName}</p>
                              <p className="text-sm text-gray-500">Contacto: {supplier.contact}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-gray-700">{supplier.ruc}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-gray-500" />
                              <span className="text-sm text-gray-700">{supplier.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-gray-500" />
                              <span className="text-sm text-gray-700">{supplier.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {supplier.product}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            supplier.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {supplier.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setSelectedSupplier(supplier);
                                setShowEditModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedSupplier(supplier);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Historial de Actividades</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.supplier}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supplier Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Proveedores</span>
                  <span className="font-bold text-gray-800">{suppliers.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Proveedores Activos</span>
                  <span className="font-bold text-green-600">
                    {suppliers.filter(s => s.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Proveedores Inactivos</span>
                  <span className="font-bold text-red-600">
                    {suppliers.filter(s => s.status === 'inactive').length}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Entregas Pendientes</span>
                  <span className="font-bold text-blue-600">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddSupplierModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSupplier}
        />

        <EditSupplierModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedSupplier(null);
          }}
          onSave={handleEditSupplier}
          supplier={selectedSupplier}
        />

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedSupplier(null);
          }}
          onConfirm={handleDeleteSupplier}
          title="Eliminar Proveedor"
          message="¿Estás seguro de que deseas eliminar este proveedor? Esta acción no se puede deshacer."
          itemName={selectedSupplier?.companyName}
        />

        <ExcelImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={handleImportSuppliers}
          title="Proveedores"
          templateData={templateData}
          expectedColumns={expectedColumns}
        />
      </div>
    </Layout>
  );
};

export default SupplierManagement;