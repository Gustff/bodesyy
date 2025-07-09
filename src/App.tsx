import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AIAnalytics from './pages/AIAnalytics';
import UserManagement from './pages/UserManagement';
import SupplierManagement from './pages/SupplierManagement';
import SalesRegistration from './pages/SalesRegistration';
import InventoryManagement from './pages/InventoryManagement';
import PurchaseManagement from './pages/PurchaseManagement';
import CashControl from './pages/CashControl';
import ResultsPanel from './pages/ResultsPanel';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/ai-analytics" element={<ProtectedRoute><AIAnalytics /></ProtectedRoute>} />
              <Route path="/usuarios" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
              <Route path="/proveedores" element={<ProtectedRoute><SupplierManagement /></ProtectedRoute>} />
              <Route path="/ventas" element={<ProtectedRoute><SalesRegistration /></ProtectedRoute>} />
              <Route path="/inventario" element={<ProtectedRoute><InventoryManagement /></ProtectedRoute>} />
              <Route path="/compras" element={<ProtectedRoute><PurchaseManagement /></ProtectedRoute>} />
              <Route path="/caja" element={<ProtectedRoute><CashControl /></ProtectedRoute>} />
              <Route path="/resultados" element={<ProtectedRoute><ResultsPanel /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;