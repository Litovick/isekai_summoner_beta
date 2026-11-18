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

export default function Starfield({ density = 140 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let stars: Star[] = [];
    const shooting: ShootingStar[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random(),
        alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
        hue: Math.random() < 0.35 ? 190 + Math.random() * 40 : 260 + Math.random() * 40,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnShooting = () => {
      if (shooting.length > 2) return;
      shooting.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.3,
        length: Math.random() * 110 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 5 + (Math.random() - 0.5) * 0.15,
        life: 1,
      });
    };
    const shootTimer = window.setInterval(spawnShooting, 3200);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      for (const s of stars) {
        s.alpha += s.alphaSpeed;
        if (s.alpha > 1 || s.alpha < 0.05) s.alphaSpeed = -s.alphaSpeed;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 90%, 80%, ${s.alpha.toFixed(2)})`;
        ctx.shadowColor = `hsla(${s.hue}, 100%, 75%, 0.8)`;
        ctx.shadowBlur = s.r * 4;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Shooting stars
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
        sh.life -= 0.016;
        if (sh.life <= 0) shooting.splice(i, 1);
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

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
