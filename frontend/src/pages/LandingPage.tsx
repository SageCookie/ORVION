import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Hero3DEnvironment from '../components/Hero3DEnvironment';
import {
  Users, FileText, ShoppingCart, Warehouse, Factory,
  Truck, CreditCard, ShieldCheck, ArrowRight, CheckCircle2,
  LogIn, Sparkles, Layers, Lock, Database, Cpu,
  X, ChevronRight, Wrench
} from 'lucide-react';
import toast from 'react-hot-toast';

const TESTER_ROLES = [
  { role: 'SUPER_ADMIN', email: 'admin@orvion.com', label: 'Super Admin', desc: 'Full system governance & audit logs', icon: Lock, color: 'from-indigo-500 to-purple-600' },
  { role: 'BUSINESS_ADMIN', email: 'business.admin@orvion.com', label: 'Business Admin', desc: 'Enterprise organizational management', icon: Layers, color: 'from-blue-500 to-indigo-600' },
  { role: 'SALES_MANAGER', email: 'sales@orvion.com', label: 'Sales Manager', desc: 'Customers, Quotations, and Orders', icon: Users, color: 'from-cyan-500 to-blue-600' },
  { role: 'INVENTORY_MANAGER', email: 'inventory@orvion.com', label: 'Inventory Manager', desc: 'Warehouse racks & stock adjustments', icon: Warehouse, color: 'from-emerald-500 to-teal-600' },
  { role: 'PRODUCTION_MANAGER', email: 'production@orvion.com', label: 'Production Manager', desc: 'Manufacturing runs & quality checks', icon: Factory, color: 'from-purple-500 to-pink-600' },
  { role: 'ACCOUNTANT', email: 'accountant@orvion.com', label: 'Accountant', desc: 'Invoices, BigDecimal math & payments', icon: CreditCard, color: 'from-green-500 to-emerald-600' },
  { role: 'DELIVERY_MANAGER', email: 'delivery@orvion.com', label: 'Delivery Manager', desc: 'Fleet dispatching, waybills & logistics', icon: Truck, color: 'from-amber-500 to-orange-600' },
  { role: 'EMPLOYEE', email: 'employee@orvion.com', label: 'Staff Member', desc: 'Assigned line tasks & notifications', icon: Cpu, color: 'from-slate-600 to-slate-800' },
];

const WORKFLOW_STEPS = [
  { step: '01', title: 'Customer Onboarding', desc: 'Capture B2B account details, credit terms, tax credentials, and delivery addresses with duplicate detection.', icon: Users, color: 'text-sky-400' },
  { step: '02', title: 'Atomic Quotations', desc: 'Generate high-precision proposals with itemized tax/discount math and export professional OpenPDF documents.', icon: FileText, color: 'text-indigo-400' },
  { step: '03', title: '1-Click Order Conversion', desc: 'Convert approved quotations directly into confirmed sales orders with transaction integrity.', icon: ShoppingCart, color: 'text-amber-400' },
  { step: '04', title: 'Real-Time Inventory', desc: 'Lock stock with automatic allocations, track warehouse rack bins, and trigger low-stock alerts before stockout.', icon: Warehouse, color: 'text-emerald-400' },
  { step: '05', title: 'Shop Floor Production', desc: 'Schedule production orders, assign workforce technicians, log pass/rework/reject quantities, and certify QC.', icon: Factory, color: 'text-purple-400' },
  { step: '06', title: 'Dispatch & Logistics', desc: 'Allocate carrier drivers, print delivery manifests, record waybill tracking codes, and verify handoff.', icon: Truck, color: 'text-teal-400' },
  { step: '07', title: 'Invoicing & Payments', desc: 'Issue compliant tax invoices and reconcile payments using exact BigDecimal math with zero floating-point drift.', icon: CreditCard, color: 'text-green-400' },
];

export default function LandingPage() {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTesterDrawer, setShowTesterDrawer] = useState(false);
  const [email, setEmail] = useState('admin@orvion.com');
  const [password, setPassword] = useState('Password123!');
  const [loading, setLoading] = useState(false);

  const handleQuickLogin = async (demoEmail: string) => {
    setLoading(true);
    try {
      await login(demoEmail, 'Password123!');
      toast.success(`Signed in as ${demoEmail.split('@')[0].replace('.', ' ').toUpperCase()}`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to ORVION!');
      setShowLoginModal(false);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative">
      {/* Dynamic Background Light Effects */}
      <div className="fixed -top-40 left-1/4 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/3 -right-20 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Glass Navigation Bar with New Official Logo */}
      <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="backdrop-blur-2xl bg-slate-900/65 border border-white/15 rounded-2xl px-5 py-3 shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex items-center justify-between transition-all">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 p-1 border border-white/15 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <img src="/orvion-logo.png" alt="ORVION Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-white">ORVION</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Business Platform
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero-simulation" className="hover:text-white transition-colors">3D Ecosystem</a>
            <a href="#workflow" className="hover:text-white transition-colors">7-Stage Flow</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          </nav>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Enter Workspace <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 lg:pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-5">
          {/* Top Pill Announcement */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl text-xs font-medium text-slate-200 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-indigo-300 font-semibold">ORVION Platform</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Deterministic Operations & Workflow Orchestration</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            Smarter Business Operations,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              Reimagined in Real Time
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Orchestrate your entire business lifecycle with zero friction: from customer inquiry and 1-click quotation conversion to warehouse stock locks, shop floor manufacturing, delivery fulfillment, and exact BigDecimal financial settlement.
          </p>

          {/* CTA Group */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                if (isAuthenticated) navigate('/dashboard');
                else setShowLoginModal(true);
              }}
              className="btn-primary text-sm py-3.5 px-6 rounded-xl shadow-xl shadow-indigo-600/30 group"
            >
              <span>{isAuthenticated ? 'Enter Workspace' : 'Sign In to Platform'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#workflow"
              className="btn-secondary text-sm py-3.5 px-6 rounded-xl flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explore 7-Stage Flow</span>
            </a>
          </div>
        </div>

        {/* Floating 3D Miniature Business Environment in the Hero */}
        <div id="hero-simulation" className="relative mt-8">
          <Hero3DEnvironment />
        </div>
      </section>

      {/* 7-Stage Operations Workflow Section */}
      <section id="workflow" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            End-To-End Enterprise Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Customers → Quotations → Orders → Inventory → Production → Delivery → Payments
          </h2>
          <p className="text-slate-400 text-sm">
            Every step is connected with atomic transactional integrity and strict role-based access control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((s) => (
            <div
              key={s.step}
              className="glass-card-glow p-6 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-indigo-400/50 transition-colors">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center text-[11px] font-semibold text-indigo-400">
                <span>Verified Operation</span>
                <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-emerald-400" />
              </div>
            </div>
          ))}

          {/* Summary Card */}
          <div className="glass-card-glow p-6 flex flex-col justify-between bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-slate-950 border-indigo-500/30">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-cyan-300 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">100% Deterministic</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero AI approximations or guessing algorithms. All business calculations execute deterministically with high-precision BigDecimal math.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-cyan-400 font-bold">STRICT RBAC & AUDIT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Engineering Highlights */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Enterprise Grade Foundations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Domain-Driven Monolith Built for Mission-Critical Reliability
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Engineered with clean architectural separation across 12 encapsulated domain packages in Spring Boot 3.2 + Java 21, coupled to a reactive React 19 + Vite + Tailwind CSS frontend.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Strict RBAC Authoritative Enforcement</div>
                  <div className="text-xs text-slate-400 mt-0.5">Every backend business method is guarded with <code className="text-indigo-300">@PreAuthorize</code> security context.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">No Floating-Point Money Arithmetic</div>
                  <div className="text-xs text-slate-400 mt-0.5">All currency calculations utilize <code className="text-indigo-300">BigDecimal</code> with scale=2 and <code className="text-indigo-300">RoundingMode.HALF_UP</code>.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Complete Security Audit Trail</div>
                  <div className="text-xs text-slate-400 mt-0.5">Immutable audit logging for all administrative events, role changes, and transactions.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Glass Spec Box */}
          <div className="glass-card p-6 sm:p-8 space-y-5 bg-gradient-to-br from-slate-900/90 to-slate-950/90 border-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider">System Specifications</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Production Grade</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-slate-400 text-[11px]">Backend Framework</div>
                <div className="text-white font-semibold font-mono mt-1">Spring Boot 3.2.4</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-slate-400 text-[11px]">JDK Target</div>
                <div className="text-white font-semibold font-mono mt-1">Java 21 LTS</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-slate-400 text-[11px]">Frontend Stack</div>
                <div className="text-white font-semibold font-mono mt-1">React 19 + Vite 8</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-slate-400 text-[11px]">Design System</div>
                <div className="text-white font-semibold font-mono mt-1">Glassmorphism UI</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-slate-400 text-[11px]">Authentication</div>
                <div className="text-white font-semibold font-mono mt-1">JWT (HS512) + BCrypt</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-slate-400 text-[11px]">Document Engine</div>
                <div className="text-white font-semibold font-mono mt-1">OpenPDF Direct Render</div>
              </div>
            </div>

            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Access Secure Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-950 p-1 border border-white/15 flex items-center justify-center shadow-lg">
              <img src="/orvion-logo.png" alt="ORVION Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-wider text-white">ORVION</div>
              <div className="text-xs text-slate-500">Intelligent Operations. Smarter Business.</div>
            </div>
          </div>

          <div className="text-xs text-slate-500 text-center md:text-right">
            <div>© 2026 ORVION Systems. All rights reserved.</div>
            <div className="text-slate-600 mt-1">Strict RBAC • BigDecimal Financial Integrity • OpenPDF Direct</div>
          </div>
        </div>
      </footer>

      {/* Discrete Floating Tester Control (Kept strictly for the user to test without public clutter) */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowTesterDrawer(!showTesterDrawer)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 backdrop-blur-xl border border-indigo-500/40 text-xs font-semibold text-indigo-300 shadow-2xl hover:scale-105 transition-all"
        >
          <Wrench className="w-3.5 h-3.5 text-cyan-400" />
          <span>Tester Switcher</span>
        </button>

        {/* Collapsible Tester Drawer */}
        {showTesterDrawer && (
          <div className="absolute bottom-12 right-0 w-80 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-3xl border border-white/20 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                <span>Tester 1-Click Role Access</span>
              </div>
              <button
                onClick={() => setShowTesterDrawer(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[11px] text-slate-400">
              Click any role to authenticate instantly (Password: <span className="font-mono text-indigo-300">Password123!</span>)
            </div>
            <div className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {TESTER_ROLES.map((r) => (
                <button
                  key={r.role}
                  onClick={() => handleQuickLogin(r.email)}
                  disabled={loading}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/40 text-left transition-all text-xs group"
                >
                  <div className="flex items-center gap-2">
                    <r.icon className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-semibold text-slate-200 group-hover:text-white">{r.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-300" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Credentials Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="glass-modal w-full max-w-md p-7 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-950 p-1 border border-white/15 flex items-center justify-center shadow-lg">
                <img src="/orvion-logo.png" alt="ORVION Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-black text-lg text-white">Sign In to ORVION</h3>
                <p className="text-xs text-slate-400">Deterministic Operations Platform</p>
              </div>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="label">
                  Email Address
                </label>
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
                <label className="label">
                  Password
                </label>
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
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm border border-indigo-400/30"
              >
                <LogIn className="w-4 h-4" />
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            {/* Tester Switcher in modal */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>Tester Quick Fill</span>
                <span className="text-indigo-400 font-mono">Password123!</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setEmail('admin@orvion.com'); setPassword('Password123!'); }}
                  className="px-2.5 py-1.5 rounded-lg text-left text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 truncate"
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('sales@orvion.com'); setPassword('Password123!'); }}
                  className="px-2.5 py-1.5 rounded-lg text-left text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 truncate"
                >
                  Sales Manager
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('inventory@orvion.com'); setPassword('Password123!'); }}
                  className="px-2.5 py-1.5 rounded-lg text-left text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 truncate"
                >
                  Inventory Manager
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('accountant@orvion.com'); setPassword('Password123!'); }}
                  className="px-2.5 py-1.5 rounded-lg text-left text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 truncate"
                >
                  Accountant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
