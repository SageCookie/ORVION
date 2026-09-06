import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ConstellationBackground from './ConstellationBackground';
import { useAuth } from '../contexts/AuthContext';
import { Bell, ArrowUpRight, Calendar, User } from 'lucide-react';

export default function AppShell() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex h-screen overflow-hidden text-white relative select-none">
      {/* Dynamic Glowing Constellation & Aurora Backdrop (Exact match to reference image) */}
      <ConstellationBackground />

      {/* Glassmorphic Translucent Sidebar */}
      <Sidebar />

      {/* Main Glass Workspace Area */}
      <div
        className="flex-1 flex flex-col h-screen overflow-hidden relative z-10"
        style={{ marginLeft: 'var(--sidebar-width)' }}
      >
        {/* Luminous Frosted Glass Top Bar (Matching reference image header: Dashboard, User profile, Date) */}
        <header className="h-16 shrink-0 border-b border-white/15 backdrop-blur-2xl bg-white/[0.04] px-8 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black tracking-wide text-white">
              Operations Center
            </span>
            <span className="text-white/20">/</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Real-Time Network Active</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-xs font-medium text-slate-200 transition-all"
            >
              <span>Landing Page</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* User Profile Capsule (Reference Image top-right: "Ava Chen • Apr 12, 2024") */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/[0.07] border border-white/20 backdrop-blur-xl">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-white truncate max-w-[120px]">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-1 text-[11px] text-slate-300">
                <Calendar className="w-3 h-3 text-cyan-400" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Notification Bell */}
            <div className="w-9 h-9 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/20 flex items-center justify-center text-slate-200 hover:text-white cursor-pointer transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-indigo-900 animate-pulse" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-thin scrollbar-thumb-white/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
