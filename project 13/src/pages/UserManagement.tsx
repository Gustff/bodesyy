import React, { useState } from 'react';
import Layout from '../components/Layout';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ExcelImportModal from '../components/ExcelImportModal';
import { useAppContext } from '../context/AppContext';
import { Users, Plus, Search, Edit2, Trash2, Mail, User, Briefcase, Upload, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { users, addUser, updateUser, deleteUser, importUsers } = useAppContext();

  const activities = [
    { user: 'Laura Ríos', action: 'Agregó nuevo producto', time: '10:30 AM', type: 'create' },
    { user: 'Camila Soto', action: 'Actualizó precios', time: '09:15 AM', type: 'update' },
    { user: 'Carlos Mendoza', action: 'Registró venta', time: '08:45 AM', type: 'sale' },
    { user: 'Ana García', action: 'Eliminó producto', time: 'Yesterday', type: 'delete' },
  ];

  const handleAddUser = (userData: any) => {
    addUser(userData);
  };

  const handleEditUser = (userData: any) => {
    updateUser(selectedUser.id, userData);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setSelectedUser(null);
      setShowDeleteModal(false);
    }
  };

  const handleImportUsers = (userData: any[]) => {
    importUsers(userData);
  };

  const exportToExcel = () => {
    const exportData = users.map(user => ({
      'Nombre': user.name,
      'Apellidos': user.lastName,
      'Email': user.email,
      'Cargo': user.role,
      'Estado': user.status === 'active' ? 'Activo' : 'Inactivo',
      'Fecha de Ingreso': user.joinDate
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
    XLSX.writeFile(wb, `usuarios_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'update':
        return <Edit2 className="w-4 h-4 text-blue-600" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'create':
        return 'bg-green-100';
      case 'update':
        return 'bg-blue-100';
      case 'delete':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const templateData = [
    {
      'Nombre': 'Juan',
      'Apellidos': 'Pérez García',
      'Email': 'juan.perez@bodesy.com',
      'Cargo': 'Supervisor de Inventario',
      'Estado': 'Activo',
      'Fecha de Ingreso': '2025-01-15'
    }
  ];

  const expectedColumns = ['Nombre', 'Apellidos', 'Email', 'Cargo', 'Estado', 'Fecha de Ingreso'];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios del sistema y sus permisos</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
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
              AGREGAR USUARIO
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Lista de Usuarios ({filteredUsers.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Usuario</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Correo</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cargo</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Estado</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name.charAt(0)}{user.lastName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{user.name} {user.lastName}</p>
                              <p className="text-sm text-gray-500">
                                Desde {new Date(user.joinDate).toLocaleDateString('es-ES')}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{user.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{user.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setSelectedUser(user);
                                setShowEditModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedUser(user);
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
                      <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Usuarios</span>
                  <span className="font-bold text-gray-800">{users.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Usuarios Activos</span>
                  <span className="font-bold text-green-600">
                    {users.filter(u => u.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Usuarios Inactivos</span>
                  <span className="font-bold text-red-600">
                    {users.filter(u => u.status === 'inactive').length}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nuevos este mes</span>
                  <span className="font-bold text-blue-600">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddUser}
        />

        <EditUserModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSave={handleEditUser}
          user={selectedUser}
        />

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDeleteUser}
          title="Eliminar Usuario"
          message="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
          itemName={selectedUser ? `${selectedUser.name} ${selectedUser.lastName}` : ''}
        />

        <ExcelImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={handleImportUsers}
          title="Usuarios"
          templateData={templateData}
          expectedColumns={expectedColumns}
        />
      </div>
    </Layout>
  );
};

export default UserManagement;