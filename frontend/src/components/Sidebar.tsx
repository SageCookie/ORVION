import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Package, Warehouse, FileText,
  ShoppingCart, Factory, CheckSquare, Truck, ReceiptText,
  CreditCard, ClipboardList, LogOut, Building2, UserCheck,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Role } from '../types';

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: Role[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Customers', to: '/customers', icon: Users, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_SALES_MANAGER', 'ROLE_ACCOUNTANT'] },
  { label: 'Suppliers', to: '/suppliers', icon: Building2, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_INVENTORY_MANAGER'] },
  { label: 'Employees', to: '/employees', icon: UserCheck, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_PRODUCTION_MANAGER', 'ROLE_DELIVERY_MANAGER'] },
  { label: 'Products', to: '/products', icon: Package, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_INVENTORY_MANAGER', 'ROLE_SALES_MANAGER', 'ROLE_PRODUCTION_MANAGER'] },
  { label: 'Inventory', to: '/inventory', icon: Warehouse, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_INVENTORY_MANAGER', 'ROLE_PRODUCTION_MANAGER'] },
  { label: 'Quotations', to: '/quotations', icon: FileText, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_SALES_MANAGER', 'ROLE_ACCOUNTANT'] },
  { label: 'Orders', to: '/orders', icon: ShoppingCart },
  { label: 'Production', to: '/production', icon: Factory, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_PRODUCTION_MANAGER', 'ROLE_INVENTORY_MANAGER'] },
  { label: 'Quality Checks', to: '/quality', icon: CheckSquare, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_PRODUCTION_MANAGER'] },
  { label: 'Deliveries', to: '/deliveries', icon: Truck, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_DELIVERY_MANAGER', 'ROLE_SALES_MANAGER'] },
  { label: 'Invoices', to: '/invoices', icon: ReceiptText, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_ACCOUNTANT', 'ROLE_SALES_MANAGER'] },
  { label: 'Payments', to: '/payments', icon: CreditCard, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN', 'ROLE_ACCOUNTANT'] },
  { label: 'Audit Logs', to: '/audit-logs', icon: ClipboardList, roles: ['ROLE_SUPER_ADMIN', 'ROLE_BUSINESS_ADMIN'] },
];

export default function Sidebar() {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const visibleItems = NAV_ITEMS.filter(item =>
    !item.roles || hasRole(...item.roles)
  );

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 flex flex-col backdrop-blur-lg bg-white/85 border-r border-slate-200/80 shadow-[0_10px_40px_rgba(15,23,42,0.04)] text-slate-800 select-none transform-gpu"
      style={{ width: 'var(--sidebar-width)' }}
    >
      {/* Brand Header with New Official Logo (Matching reference image top left logo) */}
      <div className="flex items-center gap-3.5 px-6 py-6 border-b border-slate-200/80">
        <div className="w-10 h-10 rounded-2xl overflow-hidden bg-white p-1.5 border border-slate-200/90 flex items-center justify-center shadow-sm">
          <img src="/orvion-logo.png" alt="ORVION Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-lg tracking-wider text-slate-900 flex items-center gap-1.5">
            ORVION
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300">
              PRO
            </span>
          </div>
          <div className="text-[10px] text-slate-500 truncate font-medium">Intelligent Operations</div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-5 px-3.5 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300">
        <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-[0_4px_16px_rgba(2,132,199,0.3)] border border-sky-400/40 scale-[1.02]'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }`
            }
          >
            <item.icon className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110" />
            <span className="flex-1 truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Capsule Footer (Exact design from the reference image bottom left: "Ava Chen • Status") */}
      <div className="p-4 border-t border-slate-200/80">
        <div className="p-2.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 shadow-sm transition-all mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
              {user?.firstName?.[0] || 'U'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">{user?.firstName || 'User'} {user?.lastName || ''}</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate">Active • {user?.role?.replace('ROLE_', '')}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
