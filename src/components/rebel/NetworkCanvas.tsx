import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

export function NetworkCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = width < 768 ? 22000 : 13000;
      const count = Math.min(110, Math.floor((width * height) / density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = width < 768 ? 110 : 150;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 160) {
          n.x += (dx / dist) * 0.7;
          n.y += (dy / dist) * 0.7;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.5;
            const near =
              Math.hypot(a.x - mouse.x, a.y - mouse.y) < 190 ||
              Math.hypot(b.x - mouse.x, b.y - mouse.y) < 190;
            ctx.strokeStyle = near
              ? `rgba(255, 90, 20, ${alpha})`
              : `rgba(255, 255, 255, ${alpha * 0.28})`;
            ctx.lineWidth = near ? 0.9 : 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const nearMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y) < 190;
        ctx.fillStyle = nearMouse ? "rgba(255, 122, 0, 0.95)" : "rgba(255,255,255,0.45)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, nearMouse ? 2.4 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    if (!reduce) raf = requestAnimationFrame(draw);
    else draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
