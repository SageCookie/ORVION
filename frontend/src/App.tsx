import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import RequireAuth from './components/RequireAuth';
import AppShell from './components/AppShell';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import SuppliersPage from './pages/SuppliersPage';
import EmployeesPage from './pages/EmployeesPage';
import ProductsPage from './pages/ProductsPage';
import InventoryPage from './pages/InventoryPage';
import QuotationsPage from './pages/QuotationsPage';
import OrdersPage from './pages/OrdersPage';
import ProductionPage from './pages/ProductionPage';
import QualityPage from './pages/QualityPage';
import DeliveriesPage from './pages/DeliveriesPage';
import InvoicesPage from './pages/InvoicesPage';
import PaymentsPage from './pages/PaymentsPage';
import AuditLogsPage from './pages/AuditLogsPage';

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Public Full Landing Page & Login */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} />

          {/* Protected Routes inside AppShell */}
          <Route element={<RequireAuth />}>
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/quotations" element={<QuotationsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/production" element={<ProductionPage />} />
              <Route path="/quality" element={<QualityPage />} />
              <Route path="/deliveries" element={<DeliveriesPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/audit-logs" element={<AuditLogsPage />} />

              <Route
                path="/unauthorized"
                element={
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <h2 className="text-2xl font-bold text-red-500">Access Denied (403)</h2>
                    <p className="text-slate-400 mt-2">
                      Your current user role does not have permission to access this module.
                    </p>
                  </div>
                }
              />
            </Route>
          </Route>

          {/* Catch-all to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
