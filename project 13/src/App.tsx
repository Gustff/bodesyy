import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import SupplierManagement from './pages/SupplierManagement';
import SalesRegistration from './pages/SalesRegistration';
import InventoryManagement from './pages/InventoryManagement';
import PurchaseManagement from './pages/PurchaseManagement';
import CashControl from './pages/CashControl';
import ResultsPanel from './pages/ResultsPanel';
import AIAnalytics from './pages/AIAnalytics';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-analytics" element={<AIAnalytics />} />
            <Route path="/usuarios" element={<UserManagement />} />
            <Route path="/proveedores" element={<SupplierManagement />} />
            <Route path="/ventas" element={<SalesRegistration />} />
            <Route path="/inventario" element={<InventoryManagement />} />
            <Route path="/compras" element={<PurchaseManagement />} />
            <Route path="/caja" element={<CashControl />} />
            <Route path="/resultados" element={<ResultsPanel />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;