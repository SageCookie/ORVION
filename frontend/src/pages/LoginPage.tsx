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
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Left side hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-gray-900 to-black p-12 flex-col justify-between border-r border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-xl">O</div>
            <span className="font-extrabold text-2xl tracking-wider">ORVION</span>
          </div>
          <div className="mt-2 text-indigo-300 font-medium">Intelligent Business Operations Platform</div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            End-to-End Enterprise Resource & Workflow Orchestration
          </h1>
          <p className="text-gray-400 leading-relaxed text-lg">
            Empower your team with strict 8-role RBAC, atomic quotation-to-order conversions, real-time inventory ledgers, and live financial analytics.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-indigo-400">8 Roles</div>
              <div className="text-sm text-gray-400">Strict RBAC Enforcement</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-green-400">100% Precision</div>
              <div className="text-sm text-gray-400">BigDecimal Financial Math</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          © 2026 ORVION Systems. All rights reserved.
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-950">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Sign in to ORVION</h2>
            <p className="text-gray-400 text-sm mt-1">Enter your credentials or pick a demo role account below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Demo Pre-seed Switcher */}
          <div className="pt-6 border-t border-gray-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
              Quick Demo Accounts (Password: Password123!)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => selectDemoAccount(acc.email)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    email === acc.email
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-gray-200">{acc.label}</div>
                  <div className="text-[10px] text-gray-500 truncate">{acc.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
