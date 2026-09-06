import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { DashboardKpiSummary } from '../types';
import {
  MoreHorizontal, TrendingUp,
  Users, Factory, Warehouse, DollarSign
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardKpiSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/analytics/dashboard');
      setData(res.data.data);
    } catch (err) {
      console.error('Failed to load dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  // Dual curve data for Overall Performance chart (matching reference image)
  const performanceData = [
    { name: 'W1', primary: 45, secondary: 28 },
    { name: 'W2', primary: 68, secondary: 42 },
    { name: 'W3', primary: 54, secondary: 36 },
    { name: 'W4', primary: 88, secondary: 65 },
    { name: 'W5', primary: 74, secondary: 52 },
    { name: 'W6', primary: 95, secondary: 78 },
    { name: 'W7', primary: 88, secondary: 70 },
  ];

  // Bar chart data for Operations Overview (matching the cyan-to-coral bars in the reference image)
  const barData = [
    { label: 'Apr 1', val: 240 },
    { label: 'Apr 3', val: 320 },
    { label: 'Apr 6', val: 280 },
    { label: 'Apr 9', val: 360 },
    { label: 'Apr 12', val: 310 },
    { label: 'Apr 15', val: 390 },
    { label: 'Apr 18', val: 260 },
    { label: 'Apr 21', val: 340 },
    { label: 'Apr 24', val: 420 },
    { label: 'Apr 27', val: 380 },
    { label: 'Apr 30', val: 310 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 select-none">
      {/* Top 4 Quick Glass Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 flex items-center justify-between border-white/20">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">Total Paid Revenue</div>
            <div className="text-2xl font-black text-white mt-1 font-mono tracking-tight">
              ${data?.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +24.6% settled
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center justify-between border-white/20">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-300">Active Production</div>
            <div className="text-2xl font-black text-white mt-1 font-mono tracking-tight">
              {data?.activeProductionCount} Batches
            </div>
            <div className="text-[11px] text-fuchsia-300 mt-1 flex items-center gap-1 font-semibold">
              <Factory className="w-3.5 h-3.5" /> 99.2% QC pass rate
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-300 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            <Factory className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center justify-between border-white/20">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">Total Customer Accounts</div>
            <div className="text-2xl font-black text-white mt-1 font-mono tracking-tight">
              {data?.totalCustomersCount} Accounts
            </div>
            <div className="text-[11px] text-indigo-300 mt-1 flex items-center gap-1 font-semibold">
              <Users className="w-3.5 h-3.5" /> 100% verified B2B
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center justify-between border-white/20">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Inventory Status</div>
            <div className="text-2xl font-black text-white mt-1 font-mono tracking-tight">
              {data?.lowStockAlertsCount === 0 ? 'Optimal' : `${data?.lowStockAlertsCount} Alerts`}
            </div>
            <div className="text-[11px] text-amber-300 mt-1 flex items-center gap-1 font-semibold">
              <Warehouse className="w-3.5 h-3.5" /> Auto-allocated racks
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Warehouse className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Exact Replication of User's Reference Image Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 1: Overall Performance (Dual Glowing Neon Curve - Matching Reference Image Left) */}
        <div className="lg:col-span-7 glass-panel p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">Overall Performance</h2>
              <div className="text-xs text-slate-300 flex items-center gap-2 mt-1">
                <span>Enterprise throughput</span>
                <span className="text-white/20">•</span>
                <span className="text-cyan-400 font-medium">dynamic curve</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-black text-white tracking-tight font-mono">88.4k</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-0.5">
              +12.5%
            </span>
          </div>

          {/* Glowing Dual Area Chart */}
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  {/* Neon Cyan Gradient */}
                  <linearGradient id="cyanCurve" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f2fe" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#00f2fe" stopOpacity={0.0} />
                  </linearGradient>
                  {/* Neon Magenta/Pink Gradient */}
                  <linearGradient id="magentaCurve" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '16px',
                    color: '#fff',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="primary"
                  stroke="#00f2fe"
                  strokeWidth={3.5}
                  fillOpacity={1}
                  fill="url(#cyanCurve)"
                  dot={{ r: 4, fill: '#00f2fe', stroke: '#fff', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="secondary"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#magentaCurve)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Active Projects & Metric Pills (Matching Reference Image Right) */}
        <div className="lg:col-span-5 glass-panel p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white tracking-wide">Active Operations</h2>
              <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Glowing Pill Bar Indicators (Direct replication of reference image bars) */}
            <div className="flex items-end justify-between gap-2.5 h-16 px-2 py-1 mb-4 bg-white/[0.03] rounded-2xl border border-white/10">
              {[40, 65, 85, 100, 75, 90, 60, 80].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full rounded-full transition-all duration-500 bg-gradient-to-t from-cyan-400 via-blue-500 to-fuchsia-500 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-baseline justify-between mb-4">
              <div className="text-3xl font-black text-white tracking-tight font-mono">24 Projects</div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                +3.1%
              </span>
            </div>
          </div>

          {/* Sub-Metrics Cards (Reference Image: User Growth + Revenue cards) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/15 hover:border-white/30 transition-all">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold mb-1">
                <span>Active Pipeline</span>
                <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-xl font-extrabold text-white font-mono">1,980</div>
              <div className="text-[11px] text-cyan-300 font-bold mt-1 flex items-center gap-1">
                <span>+18%</span>
                <svg className="w-12 h-3" viewBox="0 0 50 12">
                  <path d="M0 8 Q 12 2, 25 7 T 50 3" fill="none" stroke="#00f2fe" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/15 hover:border-white/30 transition-all">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold mb-1">
                <span>Revenue Index</span>
                <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-xl font-extrabold text-white font-mono">$12.4K</div>
              <div className="text-[11px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                <span>+8%</span>
                <svg className="w-12 h-3" viewBox="0 0 50 12">
                  <path d="M0 9 Q 15 3, 30 8 T 50 2" fill="none" stroke="#34d399" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Analytics Overview - Dual-Gradient Vertical Bars (Matching Reference Image Bottom Left) */}
        <div className="lg:col-span-8 glass-panel p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">Analytics Overview</h2>
              <p className="text-xs text-slate-300 mt-0.5">Orders vs. Fulfillment Volume</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-300 bg-white/[0.06] border border-white/15 px-3 py-1 rounded-full">
                Billing Cycle: Current Month
              </span>
              <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stylized Dual Gradient Bar Chart (Base Cyan -> Peak Coral/Magenta) */}
          <div className="h-56 w-full flex items-end justify-between gap-3 px-2 pt-6">
            {barData.map((b, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  {b.val}
                </div>
                <div
                  className="w-full max-w-[28px] rounded-t-xl transition-all duration-500 bg-gradient-to-t from-cyan-400 via-purple-500 to-rose-400 group-hover:brightness-125 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                  style={{ height: `${(b.val / 420) * 100}%` }}
                />
                <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Demographics / Category Donut (Matching Reference Image Bottom Right) */}
        <div className="lg:col-span-4 glass-panel p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-white tracking-wide">Category Distribution</h2>
            <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Circular Glowing Donut Diagram (Replicating the Donut Chart from the screenshot) */}
          <div className="flex flex-col items-center justify-center my-4 relative">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Segment 1: Cyan (35%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#00f2fe"
                  strokeWidth="12"
                  strokeDasharray="83.5 238.7"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  className="shadow-[0_0_15px_#00f2fe]"
                />
                {/* Segment 2: Purple (28%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="12"
                  strokeDasharray="66.8 238.7"
                  strokeDashoffset="-90"
                  strokeLinecap="round"
                  className="shadow-[0_0_15px_#a855f7]"
                />
                {/* Segment 3: Coral/Rose (19%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="12"
                  strokeDasharray="45.3 238.7"
                  strokeDashoffset="-165"
                  strokeLinecap="round"
                  className="shadow-[0_0_15px_#f43f5e]"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-lg font-black text-white font-mono">100%</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Allocated</span>
              </div>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
                <span>Enterprise Robotics</span>
              </div>
              <span className="font-mono font-bold text-white">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
                <span>Sensor Modules</span>
              </div>
              <span className="font-mono font-bold text-white">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e]" />
                <span>Precision Metal Alloys</span>
              </div>
              <span className="font-mono font-bold text-white">19%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
