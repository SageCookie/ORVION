import { useEffect, useRef } from 'react';

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Connected geometric constellation nodes (matching architectural light theme)
    const nodeCount = 50;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(14, 165, 233, ' : 'rgba(99, 102, 241, ',
    }));

    const maxDist = 135;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting constellation lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes (dual-arc halo instead of costly shadowBlur)
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Soft outer halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}0.12)`;
        ctx.fill();

        // Bright inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}0.75)`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#eef2f6] via-[#f0f4f9] to-[#e8edf5]">
      {/* Dynamic Ambient Pastel Light Blooms for rich depth on light backdrop - GPU accelerated */}
      <div className="absolute top-1/4 left-1/5 w-[650px] h-[500px] bg-gradient-to-r from-sky-400/12 to-indigo-500/10 rounded-full blur-[120px] transform-gpu will-change-transform" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[550px] bg-gradient-to-br from-purple-400/12 via-indigo-400/10 to-blue-400/10 rounded-full blur-[120px] transform-gpu will-change-transform" />
      <div className="absolute bottom-10 left-1/3 w-[550px] h-[450px] bg-gradient-to-tr from-rose-300/10 via-amber-300/8 to-sky-300/10 rounded-full blur-[120px] transform-gpu will-change-transform" />
      <div className="absolute -top-20 right-10 w-[450px] h-[400px] bg-indigo-300/10 rounded-full blur-[100px] transform-gpu will-change-transform" />

      {/* Interactive Constellation Geometric Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />
    </div>
  );
}
