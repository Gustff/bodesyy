import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  ShoppingCart, 
  Package, 
  ShoppingBag, 
  Calculator,
  BarChart3,
  Warehouse,
  LogOut,
  Brain
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/ai-analytics', label: 'Análisis de IA', icon: Brain },
    { path: '/resultados', label: 'Panel de Resultados', icon: BarChart3 },
    { path: '/usuarios', label: 'Gestión de Usuarios', icon: Users },
    { path: '/proveedores', label: 'Gestión de Proveedores', icon: Truck },
    { path: '/ventas', label: 'Registro de Ventas', icon: ShoppingCart },
    { path: '/inventario', label: 'Gestión de Inventario', icon: Package },
    { path: '/compras', label: 'Gestión de Compras', icon: ShoppingBag },
    { path: '/caja', label: 'Control de Caja', icon: Calculator },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-black shadow-2xl border-r border-yellow-500/20">
        <div className="p-6 border-b border-yellow-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl shadow-lg">
              <Warehouse className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Bodesy
            </h1>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? item.path === '/ai-analytics'
                      ? 'bg-gradient-to-r from-purple-600/20 to-purple-500/20 text-purple-300 font-medium border border-purple-500/30'
                      : 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20 text-yellow-300 font-medium border border-yellow-500/30'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-amber-500/10 hover:text-yellow-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 hover:text-red-300 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/30"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Cerrar Sesión</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {children}
      </div>
    </div>
  );
};

export default Layout;