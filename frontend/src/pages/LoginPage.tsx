import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const DEMO_ACCOUNTS = [
  { role: 'SUPER_ADMIN', email: 'admin@orvion.com', label: 'Super Admin' },
  { role: 'BUSINESS_ADMIN', email: 'business.admin@orvion.com', label: 'Business Admin' },
  { role: 'SALES_MANAGER', email: 'sales@orvion.com', label: 'Sales Manager' },
  { role: 'INVENTORY_MANAGER', email: 'inventory@orvion.com', label: 'Inventory Manager' },
  { role: 'PRODUCTION_MANAGER', email: 'production@orvion.com', label: 'Production Manager' },
  { role: 'ACCOUNTANT', email: 'accountant@orvion.com', label: 'Accountant' },
  { role: 'DELIVERY_MANAGER', email: 'delivery@orvion.com', label: 'Delivery Manager' },
  { role: 'EMPLOYEE', email: 'employee@orvion.com', label: 'Staff Employee' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('admin@orvion.com');
  const [password, setPassword] = useState('Password123!');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to ORVION!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const selectDemoAccount = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-screen flex bg-[#f0f3f8] text-slate-800">
      {/* Left side hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-100 via-sky-50/50 to-indigo-50/40 p-12 flex-col justify-between border-r border-slate-200/80">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden bg-white p-1.5 border border-slate-200 shadow-sm flex items-center justify-center">
              <img src="/orvion-logo.png" alt="ORVION Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-2xl tracking-wider text-slate-900">ORVION</span>
          </div>
          <div className="mt-2 text-sky-700 font-semibold text-sm">Intelligent Business Operations Platform</div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-black tracking-tight leading-tight text-slate-900">
            End-to-End Enterprise Resource &amp; Workflow Orchestration
          </h1>
          <p className="text-slate-600 leading-relaxed text-base">
            Empower your team with strict 8-role RBAC, atomic quotation-to-order conversions, real-time inventory ledgers, and live financial analytics.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-sm">
              <div className="text-2xl font-black text-sky-700 font-mono">8 Roles</div>
              <div className="text-xs text-slate-500 font-medium">Strict RBAC Enforcement</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-sm">
              <div className="text-2xl font-black text-emerald-700 font-mono">100% Precision</div>
              <div className="text-xs text-slate-500 font-medium">BigDecimal Financial Math</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          © 2026 ORVION Systems. All rights reserved.
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#f0f3f8]">
        <div className="w-full max-w-md space-y-8 glass-panel p-8 border border-slate-200/90 shadow-xl bg-white/90 rounded-3xl">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sign in to ORVION</h2>
            <p className="text-slate-500 text-sm mt-1">Enter your credentials or pick a demo role account below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Authenticating...' : 'Sign In to Platform'}
            </button>
          </form>

          {/* Quick Demo Pre-seed Switcher */}
          <div className="pt-6 border-t border-slate-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-sky-600" />
              Quick Demo Accounts (Password: Password123!)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => selectDemoAccount(acc.email)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    email === acc.email
                      ? 'bg-sky-50 border-sky-300 text-sky-700 shadow-sm'
                      : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="font-bold text-slate-900 truncate">{acc.label}</div>
                  <div className="text-[10px] text-slate-500 truncate">{acc.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
