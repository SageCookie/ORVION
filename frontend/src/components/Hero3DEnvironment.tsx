import React, { useState, useEffect, useRef } from 'react';
import {
  Users, FileText, ShoppingCart, Warehouse, Factory,
  Truck, CreditCard, CheckCircle2, ArrowRight, ShieldCheck,
  Zap, Bell, Activity, Sparkles, TrendingUp
} from 'lucide-react';

interface StageCard {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  xOffset: number; // percentage or px
  yOffset: number;
  zOffset: number;
  rotateY: number;
  rotateX: number;
  data: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
    metric?: string;
  };
}

const STAGES: StageCard[] = [
  {
    id: 'customers',
    step: 1,
    title: 'Customers',
    subtitle: 'B2B Client Profile',
    badge: 'Active Tier 1',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    icon: Users,
    accentColor: '#38bdf8',
    xOffset: -380,
    yOffset: -160,
    zOffset: 40,
    rotateY: 14,
    rotateX: 6,
    data: {
      label1: 'Code',
      val1: 'CUST-8041',
      label2: 'Company',
      val2: 'Apex Robotics Corp',
      metric: '99.4% CSAT',
    },
  },
  {
    id: 'quotations',
    step: 2,
    title: 'Quotations',
    subtitle: 'Smart Estimate',
    badge: '1-Click Convert',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    icon: FileText,
    accentColor: '#818cf8',
    xOffset: -260,
    yOffset: 90,
    zOffset: 80,
    rotateY: 10,
    rotateX: -4,
    data: {
      label1: 'Quote #',
      val1: 'QT-7701',
      label2: 'Total (inc. Tax)',
      val2: '$14,850.00',
      metric: 'Auto Validated',
    },
  },
  {
    id: 'orders',
    step: 3,
    title: 'Orders',
    subtitle: 'Confirmed Pipeline',
    badge: 'Priority High',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    icon: ShoppingCart,
    accentColor: '#fbbf24',
    xOffset: -80,
    yOffset: -190,
    zOffset: 120,
    rotateY: 4,
    rotateX: 8,
    data: {
      label1: 'Order #',
      val1: 'ORD-8942',
      label2: 'Promised By',
      val2: 'In 3 Days',
      metric: 'Allocated',
    },
  },
  {
    id: 'inventory',
    step: 4,
    title: 'Inventory',
    subtitle: 'Real-Time Ledger',
    badge: 'Live Stock',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    icon: Warehouse,
    accentColor: '#34d399',
    xOffset: 110,
    yOffset: 100,
    zOffset: 90,
    rotateY: -8,
    rotateX: -5,
    data: {
      label1: 'Warehouse Rack',
      val1: 'RACK-A1',
      label2: 'Stock Available',
      val2: '142 Units',
      metric: 'Optimal Level',
    },
  },
  {
    id: 'production',
    step: 5,
    title: 'Production',
    subtitle: 'Shop Floor Run',
    badge: 'QC Passed',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    icon: Factory,
    accentColor: '#c084fc',
    xOffset: 280,
    yOffset: -160,
    zOffset: 60,
    rotateY: -14,
    rotateX: 6,
    data: {
      label1: 'Job Batch #',
      val1: 'PO-441',
      label2: 'Yield Rate',
      val2: '99.2% (248/250)',
      metric: '0.01mm Tolerance',
    },
  },
  {
    id: 'delivery',
    step: 6,
    title: 'Delivery',
    subtitle: 'Smart Logistics',
    badge: 'Dispatched',
    badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    icon: Truck,
    accentColor: '#2dd4bf',
    xOffset: 410,
    yOffset: 30,
    zOffset: 100,
    rotateY: -18,
    rotateX: -2,
    data: {
      label1: 'Tracking #',
      val1: 'TRK-88219',
      label2: 'Fleet Driver',
      val2: 'Carrier Alpha',
      metric: 'ETA 16:30',
    },
  },
  {
    id: 'payments',
    step: 7,
    title: 'Payments',
    subtitle: 'Settlement & Ledger',
    badge: '100% Settled',
    badgeColor: 'text-green-400 bg-green-500/10 border-green-500/30',
    icon: CreditCard,
    accentColor: '#4ade80',
    xOffset: 0,
    yOffset: 180,
    zOffset: 140,
    rotateY: 0,
    rotateX: -8,
    data: {
      label1: 'Invoice #',
      val1: 'INV-9021',
      label2: 'Balance Due',
      val2: '$0.00 (Paid in Full)',
      metric: 'BigDecimal Exact',
    },
  },
];

export default function Hero3DEnvironment() {
  const [activeStep, setActiveStep] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cameraDrift, setCameraDrift] = useState({ rotX: 0, rotY: 0 });
  const [inventoryLevel, setInventoryLevel] = useState(84);
  const [isHovered, setIsHovered] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const notifications = [
    { title: 'Quotation Converted', text: 'QT-7701 auto-generated Sales Order ORD-8942', tag: 'Sales Sync', time: 'Just now' },
    { title: 'Inventory Allocation', text: '50 units reserved in RACK-A1 for Production Run PO-441', tag: 'Warehouse', time: '1m ago' },
    { title: 'Quality Certified', text: 'Job PO-441 passed 100% inspection tolerance specs', tag: 'QC Lead', time: '3m ago' },
    { title: 'Payment Reconciled', text: 'Wire $14,850.00 settled with BigDecimal balance deduction', tag: 'Accounting', time: '4m ago' },
  ];

  // Animated Background Ribbons & Floating Particles on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      hue: Math.random() > 0.5 ? 245 : 190,
    }));

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Draw smooth iridescent glow wave ribbons (reference image 1 & 4)
      for (let waveIndex = 0; waveIndex < 3; waveIndex++) {
        ctx.beginPath();
        const baseOffset = (waveIndex * Math.PI) / 3;
        const gradient = ctx.createLinearGradient(0, height * 0.3, width, height * 0.8);
        if (waveIndex === 0) {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.12)');
          gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.18)');
          gradient.addColorStop(1, 'rgba(56, 189, 248, 0.06)');
        } else if (waveIndex === 1) {
          gradient.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
          gradient.addColorStop(0.5, 'rgba(129, 140, 248, 0.15)');
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.12)');
        } else {
          gradient.addColorStop(0, 'rgba(147, 51, 234, 0.08)');
          gradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.1)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.08)');
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5 + waveIndex * 1.5;

        for (let x = 0; x <= width; x += 15) {
          const progress = x / width;
          const y =
            height * 0.52 +
            Math.sin(progress * 4.5 + time + baseOffset) * 55 +
            Math.cos(progress * 3.2 - time * 0.7) * 35;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw floating luminous particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${p.opacity * (0.6 + Math.sin(time * 2 + p.x) * 0.3)})`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Order flow cycling (Orders flow through the system: 1 -> 7)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 7 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Notification ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setNotificationIndex((prev) => (prev + 1) % notifications.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [notifications.length]);

  // Dynamic inventory fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setInventoryLevel((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        const next = prev + delta;
        return Math.min(Math.max(next, 58), 98);
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Slow continuous camera drift
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.03;
      setCameraDrift({
        rotX: Math.sin(t * 0.6) * 3,
        rotY: Math.cos(t * 0.5) * 4.5,
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Combine automatic camera motion with interactive cursor tilt
  const targetRotX = mousePos.y * -14 + (isHovered ? 0 : cameraDrift.rotX);
  const targetRotY = mousePos.x * 20 + (isHovered ? 0 : cameraDrift.rotY);

  return (
    <div
      className="relative w-full h-[660px] lg:h-[720px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 border border-white/10 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8)] perspective-1400 select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Canvas (Iridescent Glowing Ribbons & Particles) */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

      {/* Atmospheric Radial Gradients (Backlight glows) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-purple-500/12 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Floating Simulation Bar */}
      <div className="absolute top-5 left-6 right-6 z-30 flex items-center justify-between text-xs text-slate-300 pointer-events-auto">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold tracking-wide text-slate-200">ORVION Real-Time Engine</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Step {activeStep} of 7:</span>
          <span className="text-indigo-400 font-semibold">{STAGES[activeStep - 1].title}</span>
        </div>

        {/* Small floating notification pulse (Requirement: Small notification pulses) */}
        <div className="hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-950/40 backdrop-blur-xl border border-indigo-500/30 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-500">
          <Bell className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
          <span className="font-semibold text-white">{notifications[notificationIndex].title}:</span>
          <span className="text-slate-300 max-w-[260px] truncate">{notifications[notificationIndex].text}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {notifications[notificationIndex].tag}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 text-slate-400 text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive 3D Stage Space</span>
        </div>
      </div>

      {/* Main 3D Container with Camera Transforms */}
      <div
        className="w-full h-full flex items-center justify-center preserve-3d transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${targetRotX}deg) rotateY(${targetRotY}deg)`,
        }}
      >
        {/* Central 3D System Core (Requirement: Cards and data panels float around a central 3D system) */}
        <div
          className="relative preserve-3d flex items-center justify-center"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Concentric Glowing 3D Rings */}
          <div className="absolute w-72 h-72 rounded-full border border-indigo-500/20 animate-[spin_25s_linear_infinite]" />
          <div className="absolute w-84 h-84 rounded-full border border-dashed border-cyan-500/25 animate-[spin_35s_linear_infinite_reverse]" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.06] animate-[spin_50s_linear_infinite]" />

          {/* Central Holographic Sphere / Data Hub */}
          <div className="relative z-10 w-28 h-28 rounded-3xl bg-gradient-to-tr from-indigo-900/80 via-purple-900/60 to-cyan-900/80 backdrop-blur-2xl border border-white/30 shadow-[0_0_60px_rgba(99,102,241,0.5)] flex flex-col items-center justify-center p-3 group cursor-pointer hover:scale-110 transition-transform duration-300">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/30 border border-indigo-400/50 flex items-center justify-center text-white mb-1 shadow-[0_0_20px_rgba(99,102,241,0.6)]">
              <Zap className="w-5 h-5 text-cyan-300 fill-cyan-300/30" />
            </div>
            <div className="text-[11px] font-extrabold tracking-wider text-white">ORVION</div>
            <div className="text-[9px] text-indigo-300 font-medium">CORE HUB</div>

            {/* Orbiting Laser Point */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-ping" />
          </div>

          {/* Connective Laser Beams (Connecting stages around central system) */}
          <svg className="absolute w-[900px] h-[550px] -left-[450px] -top-[275px] pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
              </linearGradient>
              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Elliptical Workflow Circuit Path */}
            <ellipse
              cx="450"
              cy="275"
              rx="340"
              ry="180"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
            {/* Animated Pulsing Active Stream */}
            <ellipse
              cx="450"
              cy="275"
              rx="340"
              ry="180"
              fill="none"
              stroke="url(#laserBeamGrad)"
              strokeWidth="2.5"
              strokeDasharray="60 300"
              filter="url(#laserGlow)"
              className="animate-[laserPulse_3.5s_linear_infinite]"
            />
          </svg>
        </div>

        {/* Floating Translucent Glass Cards (Customers -> Quotations -> Orders -> Inventory -> Production -> Delivery -> Payments) */}
        {STAGES.map((stage) => {
          const isActive = stage.step === activeStep;
          const isPassed = stage.step < activeStep;

          return (
            <div
              key={stage.id}
              onClick={() => setActiveStep(stage.step)}
              className={`absolute cursor-pointer transition-all duration-700 ease-out preserve-3d group`}
              style={{
                transform: `translate3d(${stage.xOffset}px, ${stage.yOffset}px, ${
                  isActive ? stage.zOffset + 70 : stage.zOffset
                }px) rotateY(${stage.rotateY}deg) rotateX(${stage.rotateX}deg) scale(${
                  isActive ? 1.08 : 0.95
                })`,
              }}
            >
              {/* Card Body with Glassmorphism matching reference images */}
              <div
                className={`relative w-64 p-4 rounded-2xl backdrop-blur-2xl transition-all duration-500 ${
                  isActive
                    ? 'bg-slate-900/85 border-2 shadow-[0_0_40px_rgba(99,102,241,0.4)]'
                    : 'bg-slate-950/60 hover:bg-slate-900/70 border border-white/15 hover:border-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
                }`}
                style={{
                  borderColor: isActive ? stage.accentColor : undefined,
                  boxShadow: isActive
                    ? `0 0 35px ${stage.accentColor}44, inset 0 0 20px ${stage.accentColor}22`
                    : undefined,
                }}
              >
                {/* Frosted Glass Specular Edge Highlight */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-2xl pointer-events-none" />

                {/* Stage Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${stage.accentColor}22`,
                        color: stage.accentColor,
                        boxShadow: isActive ? `0 0 15px ${stage.accentColor}66` : undefined,
                      }}
                    >
                      <stage.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                        <span>{stage.step}. {stage.title}</span>
                        {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      </div>
                      <div className="text-[10px] text-slate-400">{stage.subtitle}</div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${stage.badgeColor}`}
                  >
                    {stage.badge}
                  </span>
                </div>

                {/* Card Data Content */}
                <div className="space-y-2 bg-black/30 rounded-xl p-2.5 border border-white/5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 text-[11px]">{stage.data.label1}:</span>
                    <span className="font-mono font-bold text-slate-100">{stage.data.val1}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 text-[11px]">{stage.data.label2}:</span>
                    <span className="font-semibold text-indigo-300 truncate max-w-[120px]">
                      {stage.data.val2}
                    </span>
                  </div>

                  {/* Special animated widget: Inventory meter for Inventory card */}
                  {stage.id === 'inventory' && (
                    <div className="pt-1.5 border-t border-white/10">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>Dynamic Stock Level:</span>
                        <span className="font-mono font-bold text-emerald-400">{inventoryLevel}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-700 shadow-[0_0_8px_#34d399]"
                          style={{ width: `${inventoryLevel}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Special animated widget: Production progress for Production card */}
                  {stage.id === 'production' && (
                    <div className="pt-1.5 border-t border-white/10">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>Shop Run Progress:</span>
                        <span className="font-mono font-bold text-purple-300">99.2%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-500 shadow-[0_0_8px_#c084fc]"
                          style={{ width: `99.2%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Metric */}
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-indigo-400" />
                    {stage.data.metric}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-0.5"
                    style={{ color: stage.accentColor }}
                  >
                    {isActive ? 'Current Stream' : 'Stage Flow'}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Glowing status halo on active stage */}
                {isActive && (
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full animate-pulse"
                    style={{ backgroundColor: stage.accentColor, boxShadow: `0 0 14px ${stage.accentColor}` }}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Floating Mini Dashboard Panel (Requirement: Dashboard graphs update subtly, reference image 3 & 4) */}
        <div
          className="absolute -left-64 bottom-8 hidden xl:block preserve-3d transition-transform duration-500"
          style={{
            transform: `translate3d(0, 0, 160px) rotateY(16deg) rotateX(-5deg)`,
          }}
        >
          <div className="w-64 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Live System Throughput</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">+18.4%</span>
            </div>
            <div className="text-xl font-extrabold text-white tracking-tight">$88,450.00</div>
            <div className="text-[10px] text-slate-400 mb-2">Total settled revenue this cycle</div>

            {/* Mini SVG Animated Waveform */}
            <div className="h-14 w-full pt-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                <path
                  d="M0 28 Q 15 10, 30 22 T 60 15 T 85 26 T 100 8"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  className="animate-pulse"
                />
                <path
                  d="M0 28 Q 15 10, 30 22 T 60 15 T 85 26 T 100 8 L 100 40 L 0 40 Z"
                  fill="url(#miniWaveGrad)"
                  opacity="0.2"
                />
                <defs>
                  <linearGradient id="miniWaveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Floating Security & RBAC Guarantee Badge (Domain Directive Reference) */}
        <div
          className="absolute -right-60 top-12 hidden xl:block preserve-3d transition-transform duration-500"
          style={{
            transform: `translate3d(0, 0, 150px) rotateY(-18deg) rotateX(4deg)`,
          }}
        >
          <div className="w-60 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 mb-2 text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-white">RBAC & Precision</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              Strict 8-role security context with 100% deterministic <span className="text-indigo-400 font-mono">BigDecimal</span> rounding.
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                Zero AI Hallucination
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Interactive Flow Stepper */}
      <div className="absolute bottom-5 inset-x-6 z-30 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/10 shadow-2xl overflow-x-auto max-w-full">
          {STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.step)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeStep === s.step
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <s.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Click any card or stage to focus 3D perspective</span>
        </div>
      </div>
    </div>
  );
}
