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

    // Connected geometric constellation nodes (matching reference image)
    const nodeCount = 55;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.6 ? 'rgba(56, 189, 248, ' : 'rgba(168, 85, 247, ',
    }));

    const maxDist = 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting constellation lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}0.7)`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 6;
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

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#080a18] via-[#0d1127] to-[#0a0c1e]">
      {/* Dynamic Luminous Ambient Blooms (matching the exact cyan/magenta/coral lighting in the reference image) */}
      <div className="absolute top-1/4 left-1/5 w-[650px] h-[500px] bg-gradient-to-r from-cyan-500/25 to-blue-600/20 rounded-full blur-[130px]" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[550px] bg-gradient-to-br from-fuchsia-500/25 via-purple-600/25 to-indigo-600/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-10 left-1/3 w-[550px] h-[450px] bg-gradient-to-tr from-pink-500/20 via-rose-500/15 to-amber-500/15 rounded-full blur-[130px]" />
      <div className="absolute -top-20 right-10 w-[450px] h-[400px] bg-indigo-500/20 rounded-full blur-[110px]" />

      {/* Interactive Constellation Geometric Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
    </div>
  );
}
