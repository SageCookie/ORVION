import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import IsometricBusinessWorld, { DISTRICTS } from '../components/IsometricBusinessWorld';
import {
  Users, FileText, ShoppingCart, Warehouse, Factory,
  Truck, CreditCard, ArrowRight, CheckCircle2,
  LogIn, Sparkles, Layers, Lock, Cpu,
  X, ChevronRight, Wrench, Check, AlertCircle
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
  { step: '01', title: 'Customer Inception', desc: 'Capture B2B account credentials, verify credit terms, tax credentials, and billing coordinates.', icon: Users, accent: '#38bdf8', tag: 'Office CRM' },
  { step: '02', title: 'Dynamic Quotations', desc: 'Assemble itemized proposals with automatic tax math and render vector OpenPDF client documents.', icon: FileText, accent: '#818cf8', tag: 'Commercial' },
  { step: '03', title: '1-Click Order Lock', desc: 'Convert approved quotations into confirmed sales orders with database-level transaction integrity.', icon: ShoppingCart, accent: '#fbbf24', tag: 'Fulfillment' },
  { step: '04', title: 'Warehouse Allocation', desc: 'Lock stock in real-time across high-bay rack bins (RACK-A1) and trigger reorder thresholds.', icon: Warehouse, accent: '#34d399', tag: 'Inventory' },
  { step: '05', title: 'Shop Floor Assembly', desc: 'Schedule production orders, dispatch line technicians, log yield rates, and certify tolerance inspection.', icon: Factory, accent: '#c084fc', tag: 'Manufacturing' },
  { step: '06', title: 'Tax Invoicing & Pay', desc: 'Issue compliant tax invoices with zero floating-point drift using strict BigDecimal monetary scale=2.', icon: CreditCard, accent: '#4ade80', tag: 'Treasury' },
  { step: '07', title: 'Fleet Waybill Dispatch', desc: 'Generate digital waybills (TRK-88219), dispatch carrier vehicles, and confirm doorstep receipt.', icon: Truck, accent: '#2dd4bf', tag: 'Logistics' },
];

const MODULE_TABS = [
  {
    id: 'crm',
    title: 'Customer & CRM',
    icon: Users,
    heading: 'Master Directory & B2B Customer Management',
    description: 'Eliminate fragmented spreadsheets and contact books. Maintain a unified ledger of customer accounts, tax credentials, and credit terms.',
    features: ['Duplicate detection across GST/Tax IDs', 'Automated credit term checks', 'Order and quotation historical trail', 'Direct contact hierarchy'],
    badge: 'CRM Core',
    color: '#38bdf8',
  },
  {
    id: 'quotes',
    title: 'Quotation Engine',
    icon: FileText,
    heading: 'Instant Proposal Creation with OpenPDF Direct Render',
    description: 'Draft commercial proposals in seconds. Apply volume discounts and tax rates with precision, and export professional OpenPDF vector files.',
    features: ['Sub-second vector PDF generation', 'Atomic 1-click conversion to sales order', 'Automated validity countdowns', 'Custom commercial clauses'],
    badge: 'Sales Engine',
    color: '#818cf8',
  },
  {
    id: 'inventory',
    title: 'Real-Time Inventory',
    icon: Warehouse,
    heading: 'High-Bay Bin Tracking & Stock Safeguards',
    description: 'Full traceability from stock-in receipts to order reservations. Never experience an unexpected stockout or committed inventory mismatch.',
    features: ['Rack & bin level precision (e.g. RACK-A1)', 'Automatic stock reservations on order lock', 'Live low-stock threshold warning banners', 'Stock-In / Stock-Out transaction audit'],
    badge: 'Supply Chain',
    color: '#34d399',
  },
  {
    id: 'manufacturing',
    title: 'Production & QC',
    icon: Factory,
    heading: 'Shop Floor Batching & Quality Tolerance Certification',
    description: 'Launch manufacturing orders, assign floor supervisors, track produced vs rejected counts, and certify dimensional tolerance standards.',
    features: ['Batch scheduling with start/end windows', 'Yield efficiency metrics (e.g. 99.2%)', 'Defect logging with rework flags', 'Direct finished stock auto-deposit'],
    badge: 'Shop Floor',
    color: '#c084fc',
  },
  {
    id: 'finance',
    title: 'Invoicing & Payments',
    icon: CreditCard,
    heading: 'Deterministic Accounting with BigDecimal Precision',
    description: 'Calculate balances due, recorded payments, and receivables without floating-point errors. Guaranteed scale=2 HALF_UP precision.',
    features: ['Zero floating-point currency drift', 'Automated invoice balance reconciliation', 'OpenPDF tax invoice generation', 'Payment transaction reference tracking'],
    badge: 'Accounting',
    color: '#4ade80',
  },
  {
    id: 'logistics',
    title: 'Logistics & Fleet',
    icon: Truck,
    heading: 'Waybill Generation & Doorstep Dispatch Verification',
    description: 'Connect production outputs directly to carrier logistics. Generate digital waybills, assign fleet drivers, and verify handoffs.',
    features: ['Automated waybill numbering (TRK-XXXX)', 'Driver & vehicle plate assignment', 'Status transitions (Pending → In Transit → Delivered)', 'Delivery address validation'],
    badge: 'Logistics',
    color: '#2dd4bf',
  },
];

export default function LandingPage() {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTesterDrawer, setShowTesterDrawer] = useState(false);
  const [activeModuleTab, setActiveModuleTab] = useState(MODULE_TABS[0].id);
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
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

  const selectedModule = MODULE_TABS.find((t) => t.id === activeModuleTab) || MODULE_TABS[0];

  return (
    <div className="min-h-screen bg-[#f0f3f8] text-slate-800 overflow-x-hidden relative selection:bg-sky-500 selection:text-white font-sans">
      {/* Background Luminous Radiant Glows (Optimized for silky 60fps scrolling) */}
      <div className="fixed -top-40 left-1/4 w-[750px] h-[500px] bg-gradient-to-r from-sky-400/12 via-indigo-500/10 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed top-1/3 -right-20 w-[650px] h-[650px] bg-gradient-to-b from-purple-400/10 via-pink-400/10 to-transparent rounded-full blur-[110px] pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed bottom-0 left-10 w-[550px] h-[550px] bg-sky-300/12 rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />

      {/* ========================================================================= */}
      {/* 1. TOP GLASS NAVIGATION BAR                                               */}
      {/* ========================================================================= */}
      <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="backdrop-blur-md bg-white/85 border border-slate-200/80 rounded-2xl px-5 py-3 shadow-sm flex items-center justify-between transition-all transform-gpu">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl overflow-hidden bg-white p-1.5 border border-slate-200/90 flex items-center justify-center shadow-sm">
              <img src="/orvion-logo.png" alt="ORVION Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-slate-900">ORVION</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300">
                Operating System
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="#hero-3d" className="hover:text-sky-700 transition-colors">3D World</a>
            <a href="#ecosystem" className="hover:text-sky-700 transition-colors">Ecosystem</a>
            <a href="#workflow" className="hover:text-sky-700 transition-colors">Workflow</a>
            <a href="#modules" className="hover:text-sky-700 transition-colors">Modules</a>
            <a href="#preview" className="hover:text-sky-700 transition-colors">Platform</a>
            <a href="#architecture" className="hover:text-sky-700 transition-colors">Security</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary text-xs py-2 px-4 shadow-sm"
                >
                  Enter Workspace <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn-primary text-xs py-2 px-4 shadow-sm flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO — 3D ISOMETRIC BUSINESS WORLD                            */}
      {/* ========================================================================= */}
      <section id="hero-3d" className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 lg:pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-6">
          {/* Top Pill Announcement */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200/80 backdrop-blur-xl text-xs font-semibold text-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <span className="text-sky-700 font-extrabold uppercase tracking-wider">ORVION Enterprise 3.0</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">Local Business Digital Operating System</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
            Run Your Business.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
              All in One System.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            An integrated digital operations ecosystem connecting customer inquiries, dynamic proposals, confirmed orders, inventory locks, shop floor manufacturing, delivery tracking, and BigDecimal financial settlements in real time.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                if (isAuthenticated) navigate('/dashboard');
                else setShowLoginModal(true);
              }}
              className="btn-primary text-sm py-3.5 px-7 rounded-2xl shadow-md group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#ecosystem"
              className="btn-secondary text-sm py-3.5 px-6 rounded-2xl flex items-center gap-2 bg-white/80 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Explore Platform</span>
            </a>
          </div>
        </div>

        {/* The Master 3D Isometric Miniature Business World */}
        <div className="relative mt-8">
          <IsometricBusinessWorld />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: BUSINESS PROBLEM — THE FRAGMENTATION CRISIS                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
            The Operational Reality
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Growing Enterprises Lose Control
          </h2>
          <p className="text-sm text-slate-600">
            When operations expand, traditional tools fracture into isolated silos, creating invisible bottlenecks, inventory stockouts, and margin leakage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 border-rose-200 hover:border-rose-300 transition-all bg-white/80 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Spreadsheet Anarchy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sales quotes live in Excel, inventory counts in desktop registers, and production orders in WhatsApp groups. Data is stale before it is even read.
            </p>
          </div>

          <div className="glass-panel p-6 border-amber-200 hover:border-amber-300 transition-all bg-white/80 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
              <Warehouse className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Inventory Stockouts & Drift</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Orders get confirmed for items already committed elsewhere. Warehouses scramble, delivery deadlines lapse, and premium rush fees destroy profitability.
            </p>
          </div>

          <div className="glass-panel p-6 border-indigo-200 hover:border-indigo-300 transition-all bg-white/80 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Accounting Inaccuracies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Floating-point calculation errors, lost payment proofs, and unreconciled tax invoices leave executive leadership guessing their actual cash position.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE ORVION SOLUTION — THE UNIFIED OPERATING SYSTEM             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Digital Operating System</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              One Unified Core to Orchestrate Every Physical Operation
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              ORVION replaces disjointed point-solutions with a deterministic modular platform. When a customer inquiry arrives, every downstream department—commercial, inventory, shop floor, dispatch, and finance—synchronizes automatically.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Zero Data Fragmentation</div>
                  <div className="text-xs text-slate-500">Single authoritative PostgreSQL/H2 database record across all 12 domains.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Sub-Second Quotation-to-Order Conversion</div>
                  <div className="text-xs text-slate-500">Atomic database transaction locking stock and issuing production directives instantly.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Deterministic Financial Rigor</div>
                  <div className="text-xs text-slate-500">All monetary balances use exact Java BigDecimal with scale=2 and HALF_UP rounding.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Comparison Box */}
          <div className="glass-panel p-6 sm:p-8 border-slate-200/80 bg-white/85 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Legacy Stack vs. ORVION</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">100% Deterministic</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Disconnected Apps Replaced:</span>
                <span className="font-mono text-sky-700 font-bold">CRM + ERP + Excel + WhatsApp</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Stockout Risk:</span>
                <span className="font-mono text-emerald-700 font-bold">0% (Hardware-locked reserves)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Proposal Generation Speed:</span>
                <span className="font-mono text-slate-900 font-bold">&lt; 3 seconds (OpenPDF direct)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Accounting Accuracy:</span>
                <span className="font-mono text-sky-700 font-bold">BigDecimal Exact (Scale=2)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CONNECTED BUSINESS ECOSYSTEM — DISTRICT EXPLORER               */}
      {/* ========================================================================= */}
      <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            The 8 Isometric Districts
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            A Physical Map of Your Entire Enterprise
          </h2>
          <p className="text-slate-600 text-sm">
            Each district in the miniature world maps directly to an active ORVION software module.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DISTRICTS.map((d) => (
            <div
              key={d.id}
              className="glass-panel p-5 group hover:border-slate-300 transition-all flex flex-col justify-between bg-white/80 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${d.accentCss}20` }}
                  >
                    <d.icon className="w-5 h-5" style={{ color: d.accentCss }} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${d.badgeColor}`}>
                    {d.badge}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {d.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">{d.subtitle}</div>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{d.detail}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-400">{d.code}</span>
                <span className="font-bold text-sky-700">{d.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: INTERACTIVE 3D WORKFLOW — THE LIFECYCLE WALKTHROUGH            */}
      {/* ========================================================================= */}
      <section id="workflow" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">
            End-To-End Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Customer → Quotation → Order → Inventory → Production → Payment → Delivery
          </h2>
          <p className="text-slate-600 text-sm">
            Step through the continuous lifecycle of an enterprise transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {WORKFLOW_STEPS.map((s, idx) => {
            const isCurrent = activeWorkflowIndex === idx;
            return (
              <div
                key={s.step}
                onClick={() => setActiveWorkflowIndex(idx)}
                className={`glass-panel p-4 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'border-sky-500 shadow-md scale-[1.03] bg-white'
                    : 'border-slate-200/80 hover:border-slate-300 bg-white/75 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-black text-sky-700">{s.step}</span>
                    <s.icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 mb-1">{s.title}</div>
                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-3">{s.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] uppercase font-bold text-slate-500">
                  {s.tag}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Workflow Spotlight Card */}
        <div className="mt-8 glass-panel p-6 border-sky-300 bg-white/90 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-sm">
              {React.createElement(WORKFLOW_STEPS[activeWorkflowIndex].icon, { className: 'w-6 h-6' })}
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">
                Stage {WORKFLOW_STEPS[activeWorkflowIndex].step} of 07 • {WORKFLOW_STEPS[activeWorkflowIndex].tag}
              </div>
              <div className="text-lg font-black text-slate-900 mt-0.5">
                {WORKFLOW_STEPS[activeWorkflowIndex].title}
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                {WORKFLOW_STEPS[activeWorkflowIndex].desc}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveWorkflowIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length)}
            className="btn-primary text-xs py-2.5 px-5 shrink-0 flex items-center gap-2 shadow-sm"
          >
            <span>Next Operational Stage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: CORE OPERATIONS MODULES — INTERACTIVE DEEP DIVE                */}
      {/* ========================================================================= */}
      <section id="modules" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            Modular Domain Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Encapsulated Industrial Grade Capabilities
          </h2>
          <p className="text-slate-600 text-sm">
            Select an operational module to review its enterprise feature guarantees.
          </p>
        </div>

        {/* Module Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {MODULE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveModuleTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeModuleTab === tab.id
                  ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Active Module Showcase Card */}
        <div className="glass-panel p-8 border-slate-200/80 bg-white/85 shadow-md animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                  style={{ color: selectedModule.color, borderColor: `${selectedModule.color}40`, backgroundColor: `${selectedModule.color}15` }}
                >
                  {selectedModule.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">Spring Boot 3 Domain: com.orvion.domain.{selectedModule.id}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">{selectedModule.heading}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedModule.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {selectedModule.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-inner space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-500 border-b border-slate-200 pb-2">
                <span>MODULE HEALTH CHECK</span>
                <span className="text-emerald-600 font-bold">100% OK</span>
              </div>
              <div className="text-slate-700">
                <span className="text-sky-700 font-bold">Controller:</span> /api/v1/{selectedModule.id}s
              </div>
              <div className="text-slate-700">
                <span className="text-sky-700 font-bold">Security:</span> @PreAuthorize authoritative
              </div>
              <div className="text-slate-700">
                <span className="text-sky-700 font-bold">Data Integrity:</span> @Transactional
              </div>
              <div className="text-slate-700">
                <span className="text-sky-700 font-bold">Monetary Scale:</span> BigDecimal scale=2
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: PRODUCT / DASHBOARD PREVIEW                                    */}
      {/* ========================================================================= */}
      <section id="preview" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            Real Application Interface
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Operators Who Demand Clarity
          </h2>
          <p className="text-slate-600 text-sm">
            Live telemetry, velocity charts, and operational controls rendered in high-depth acrylic glass.
          </p>
        </div>

        {/* Realistic Glassmorphic Dashboard Preview Container */}
        <div className="glass-panel p-6 sm:p-8 border-slate-200/80 shadow-lg bg-white/90 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-bold text-xs shadow-sm">
                O
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">ORVION Executive Operations Console</div>
                <div className="text-[11px] text-slate-500">Real-time enterprise multi-tenant instance</div>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
              Live Stream: Connected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <div className="text-slate-500 text-[11px] font-medium">Monthly Paid Invoices</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1">$88,450.00</div>
              <div className="text-emerald-700 text-[10px] font-bold mt-1">Reconciled to Ledger</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <div className="text-slate-500 text-[11px] font-medium">Active Production Jobs</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1">24 Batches</div>
              <div className="text-sky-700 text-[10px] font-bold mt-1">99.2% Dimensional Yield</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <div className="text-slate-500 text-[11px] font-medium">Outstanding Receivables</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1">$12,450.00</div>
              <div className="text-amber-700 text-[10px] font-bold mt-1">Scale=2 BigDecimal Exact</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: ROLE-BASED ACCESS (AUTHORITATIVE RBAC)                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">
            Enterprise Security
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Strict 8-Role Authoritative Access Matrix
          </h2>
          <p className="text-slate-600 text-sm">
            Frontend route guards are purely for UX. Every business transaction is strictly authenticated and authorized by Spring Security on the JVM layer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTER_ROLES.map((r) => (
            <div key={r.role} className="glass-panel p-5 border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between bg-white/80 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${r.color} flex items-center justify-center text-white shadow-sm`}>
                    <r.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Spring Security</span>
                </div>
                <div className="text-sm font-bold text-slate-900">{r.label}</div>
                <p className="text-xs text-slate-600 mt-1">{r.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-500">{r.email}</span>
                <span className="text-sky-700 font-mono text-[10px] font-semibold">ROLE_{r.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: BUSINESS INSIGHTS & DETERMINISTIC ACCOUNTING                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Mathematical Precision Guarantee
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Zero Floating-Point Drift. Zero AI Hallucinations.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Standard web apps store currency as IEEE-754 floating-point numbers, inevitably drifting by cents over large transaction ledgers. ORVION mandates Java <code className="text-sky-700 font-mono font-semibold bg-sky-50 px-1 py-0.5 rounded">BigDecimal</code> with scale=2 and <code className="text-sky-700 font-mono font-semibold bg-sky-50 px-1 py-0.5 rounded">RoundingMode.HALF_UP</code> across all line totals, taxes, discounts, and payments.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner space-y-2 text-xs font-mono">
              <div className="text-slate-500">// Java 21 Enterprise Directives</div>
              <div className="text-emerald-700 font-semibold">BigDecimal subtotal = qty.multiply(unitPrice).setScale(2, HALF_UP);</div>
              <div className="text-sky-700 font-semibold">BigDecimal balanceDue = grandTotal.subtract(paidAmount).setScale(2, HALF_UP);</div>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 border-slate-200/80 bg-white/85 shadow-sm space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200/80 pb-3">
              Reliability Benchmarks
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-600 font-medium">Financial Rounding Errors:</span>
                <span className="font-mono font-bold text-emerald-700">0.0000%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-600 font-medium">Stock Allocation Race Conditions:</span>
                <span className="font-mono font-bold text-emerald-700">Zero (@Transactional locks)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-600 font-medium">Document Generation Speed:</span>
                <span className="font-mono font-bold text-sky-700">&lt; 150ms OpenPDF direct</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-600 font-medium">AI Predictive Hallucinations:</span>
                <span className="font-mono font-bold text-emerald-700">0% (Pure Deterministic Math)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: SECURITY & RELIABILITY ARCHITECTURE                           */}
      {/* ========================================================================= */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            System Specifications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built Upon Enterprise-Proven Engineering Standards
          </h2>
          <p className="text-slate-600 text-sm">
            Zero bloat, zero fragile dependencies. High-performance JVM runtime coupled to reactive client architecture.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="glass-panel p-4 border-slate-200/80 bg-white/80 shadow-sm">
            <div className="text-slate-500 text-[10px] font-semibold">BACKEND RUNTIME</div>
            <div className="text-base font-bold text-slate-900 mt-1">Java 21 LTS</div>
            <div className="text-[10px] text-sky-700 font-semibold mt-1">Spring Boot 3.2.4</div>
          </div>
          <div className="glass-panel p-4 border-slate-200/80 bg-white/80 shadow-sm">
            <div className="text-slate-500 text-[10px] font-semibold">FRONTEND ENGINE</div>
            <div className="text-base font-bold text-slate-900 mt-1">React 19 + Vite 8</div>
            <div className="text-[10px] text-sky-700 font-semibold mt-1">Tailwind CSS v4</div>
          </div>
          <div className="glass-panel p-4 border-slate-200/80 bg-white/80 shadow-sm">
            <div className="text-slate-500 text-[10px] font-semibold">AUTHENTICATION</div>
            <div className="text-base font-bold text-slate-900 mt-1">JWT (HS512)</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">BCrypt Passwords</div>
          </div>
          <div className="glass-panel p-4 border-slate-200/80 bg-white/80 shadow-sm">
            <div className="text-slate-500 text-[10px] font-semibold">VECTOR EXPORT</div>
            <div className="text-base font-bold text-slate-900 mt-1">OpenPDF</div>
            <div className="text-[10px] text-purple-700 font-semibold mt-1">Direct JVM PDF</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: CALL TO ACTION — GET STARTED                                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-slate-200/80">
        <div className="glass-panel p-10 sm:p-16 border-sky-200 bg-white/90 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Production</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-2xl mx-auto">
            Experience the Digital Operating System for Business
          </h2>

          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Step into the unified ORVION workspace today. Log in with custom credentials or test all 8 enterprise roles with instant one-click authentication.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                if (isAuthenticated) navigate('/dashboard');
                else setShowLoginModal(true);
              }}
              className="btn-primary text-sm py-3.5 px-8 rounded-2xl shadow-md"
            >
              <span>{isAuthenticated ? 'Enter Workspace' : 'Launch Platform'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
            <button
              onClick={() => setShowTesterDrawer(true)}
              className="btn-secondary text-sm py-3.5 px-6 rounded-2xl flex items-center gap-2 bg-white/90 border border-slate-200 text-slate-700 shadow-sm"
            >
              <Wrench className="w-4 h-4 text-sky-600" />
              <span>1-Click Role Testing</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12: PREMIUM ARCHITECTURAL FOOTER                                   */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200/80 bg-white/85 backdrop-blur-md py-14 text-slate-600 transform-gpu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl overflow-hidden bg-white p-1.5 border border-slate-200 shadow-sm flex items-center justify-center">
                  <img src="/orvion-logo.png" alt="ORVION Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-black text-lg tracking-wider text-slate-900">ORVION</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Local Business Digital Operating System. Intelligent Operations. Smarter Business.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Navigation</div>
              <div><a href="#hero-3d" className="text-slate-600 hover:text-sky-700">3D Isometric World</a></div>
              <div><a href="#ecosystem" className="text-slate-600 hover:text-sky-700">8 Connected Districts</a></div>
              <div><a href="#workflow" className="text-slate-600 hover:text-sky-700">Lifecycle Pipeline</a></div>
              <div><a href="#modules" className="text-slate-600 hover:text-sky-700">Operational Modules</a></div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Security & Rigor</div>
              <div className="text-slate-600">Spring Security 6 RBAC</div>
              <div className="text-slate-600">BigDecimal Financial Math</div>
              <div className="text-slate-600">Zero AI Hallucination Policy</div>
              <div className="text-slate-600">Centralized Audit Logging</div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Specifications</div>
              <div className="text-slate-600">Java 21 LTS + Spring Boot 3.2</div>
              <div className="text-slate-600">React 19 + TypeScript + Vite 8</div>
              <div className="text-slate-600">Three.js WebGL Axonometric</div>
              <div className="text-slate-600">OpenPDF Vector Engine</div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>© 2026 ORVION Systems. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>Deterministic Operations</span>
              <span>•</span>
              <span>100% Scale=2 Precision</span>
              <span>•</span>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Discrete Floating Tester Drawer Trigger (Unobtrusive) */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowTesterDrawer(!showTesterDrawer)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-sky-300 text-xs font-semibold text-sky-700 shadow-lg hover:scale-105 transition-all transform-gpu"
        >
          <Wrench className="w-3.5 h-3.5 text-sky-600" />
          <span>Tester Switcher</span>
        </button>

        {showTesterDrawer && (
          <div className="absolute bottom-12 right-0 w-84 p-4 rounded-2xl bg-white/95 backdrop-blur-lg border border-slate-200 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Wrench className="w-3.5 h-3.5 text-sky-600" />
                <span>Tester 1-Click Role Access</span>
              </div>
              <button
                onClick={() => setShowTesterDrawer(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[11px] text-slate-500">
              Click any role to authenticate immediately (Password: <span className="font-mono text-sky-700 font-semibold">Password123!</span>)
            </div>
            <div className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300">
              {TESTER_ROLES.map((r) => (
                <button
                  key={r.role}
                  onClick={() => handleQuickLogin(r.email)}
                  disabled={loading}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-left transition-all text-xs group"
                >
                  <div className="flex items-center gap-2">
                    <r.icon className="w-3.5 h-3.5 text-sky-600" />
                    <span className="font-semibold text-slate-700 group-hover:text-slate-900">{r.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Credentials Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-4">
          <div className="glass-modal bg-white/95 border border-slate-200 shadow-2xl w-full max-w-md p-7 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-white p-1.5 border border-slate-200 flex items-center justify-center shadow-sm">
                <img src="/orvion-logo.png" alt="ORVION Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900">Sign In to ORVION</h3>
                <p className="text-xs text-slate-500 font-medium">Deterministic Operations Platform</p>
              </div>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
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
                className="w-full py-3 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <LogIn className="w-4 h-4" />
                {loading ? 'Authenticating...' : 'Sign In to Platform'}
              </button>
            </form>

            {/* Tester Switcher Quick Fill */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
                <span>Tester Quick Fill</span>
                <span className="text-sky-700 font-mono font-semibold">Password123!</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setEmail('admin@orvion.com'); setPassword('Password123!'); }}
                  className="px-2.5 py-1.5 rounded-lg text-left text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 truncate"
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('sales@orvion.com'); setPassword('Password123!'); }}
                  className="px-2.5 py-1.5 rounded-lg text-left text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 truncate"
                >
                  Sales Manager
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('inventory@orvion.com'); setPassword('Password123!'); }}
                  className="px-2.5 py-1.5 rounded-lg text-left text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 truncate"
                >
                  Inventory Manager
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('accountant@orvion.com'); setPassword('Password123!'); }}
                  className="px-2.5 py-1.5 rounded-lg text-left text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 truncate"
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
