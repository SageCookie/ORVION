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
    <div className="flex h-screen overflow-hidden text-slate-900 relative select-none">
      {/* Dynamic Glowing Constellation & Aurora Backdrop */}
      <ConstellationBackground />

      {/* Glassmorphic Translucent Sidebar */}
      <Sidebar />

      {/* Main Glass Workspace Area */}
      <div
        className="flex-1 flex flex-col h-screen overflow-hidden relative z-10"
        style={{ marginLeft: 'var(--sidebar-width)' }}
      >
        {/* Luminous Frosted Glass Top Bar (Light pearl glassmorphism) */}
        <header className="h-16 shrink-0 border-b border-slate-200/80 backdrop-blur-md bg-white/80 px-8 flex items-center justify-between shadow-sm transform-gpu">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black tracking-wide text-slate-900">
              Operations Center
            </span>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <span>Real-Time Network Active</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 shadow-sm transition-all"
            >
              <span>Landing Page</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* User Profile Capsule (Reference Image top-right: "Ava Chen • Apr 12, 2024") */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/85 border border-slate-200/90 shadow-sm backdrop-blur-md">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <Calendar className="w-3 h-3 text-sky-600" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Notification Bell */}
            <div className="w-9 h-9 rounded-2xl bg-white/80 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm cursor-pointer transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white animate-pulse" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-thin scrollbar-thumb-slate-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
