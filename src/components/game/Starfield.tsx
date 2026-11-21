import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  alphaSpeed: number;
  hue: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  life: number;
}

export default function Starfield({ density = 90 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const starCount = isMobile ? Math.min(density, 28) : Math.min(density, 72);

    let animId = 0;
    let stars: Star[] = [];
    const shooting: ShootingStar[] = [];

    const drawStaticStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 90%, 82%, ${s.alpha.toFixed(2)})`;
        ctx.fill();
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.5,
        alpha: Math.random() * 0.75 + 0.2,
        alphaSpeed: (Math.random() * 0.012 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
        hue: Math.random() < 0.35 ? 195 + Math.random() * 35 : 260 + Math.random() * 35,
      }));
      if (isMobile || prefersReducedMotion) {
        drawStaticStars();
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // On mobile or reduced-motion, avoid continuous 60fps canvas redraws for instant smooth scrolling
    if (isMobile || prefersReducedMotion) {
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const spawnShooting = () => {
      if (shooting.length >= 2) return;
      shooting.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.3,
        length: Math.random() * 100 + 60,
        speed: Math.random() * 7 + 6,
        angle: Math.PI / 5 + (Math.random() - 0.5) * 0.15,
        life: 1,
      });
    };
    const shootTimer = window.setInterval(spawnShooting, 3600);

    let lastFrame = 0;
    const loop = (ts: number) => {
      // Throttle desktop starfield to ~30fps and omit expensive per-star shadowBlur
      if (ts - lastFrame >= 32) {
        lastFrame = ts;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const s of stars) {
          s.alpha += s.alphaSpeed;
          if (s.alpha > 0.95 || s.alpha < 0.15) s.alphaSpeed = -s.alphaSpeed;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 90%, 82%, ${s.alpha.toFixed(2)})`;
          ctx.fill();
        }

        for (let i = shooting.length - 1; i >= 0; i--) {
          const sh = shooting[i];
          const tx = sh.x - Math.cos(sh.angle) * sh.length;
          const ty = sh.y - Math.sin(sh.angle) * sh.length;
          const grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
          grad.addColorStop(0, `rgba(255, 255, 255, ${sh.life})`);
          grad.addColorStop(0.3, `rgba(140, 220, 255, ${sh.life * 0.7})`);
          grad.addColorStop(1, "rgba(200, 160, 255, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
          sh.x += Math.cos(sh.angle) * sh.speed;
          sh.y += Math.sin(sh.angle) * sh.speed;
          sh.life -= 0.024;
          if (sh.life <= 0) shooting.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(shootTimer);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}

