import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 40;
const MAX_CONNECTIONS = 7;
const MAX_DISTANCE = 100;

export default function ParticleBackground({
  className = '',
  particleCount = PARTICLE_COUNT,
  color = 'rgba(0, 0, 0, 0.8)',
  size = 7,
  speed = 4,
  interactive = true
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    if (interactive) {
      canvas.addEventListener('mousemove', (e) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      });
      canvas.addEventListener('mouseleave', () => {
        mouseRef.current = { x: null, y: null };
      });
    }

    // Initialize particles with random positions and velocities
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed * 0.5,
      vy: (Math.random() - 0.5) * speed * 0.5,
      r: size + Math.random() * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        // Normal movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Interactive mouse repulsion
        if (interactive && mouseRef.current.x !== null) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 8;
            p.y += Math.sin(angle) * force * 8;
          }
        }

        // Draw particle with full opacity
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Draw connections between nearby particles
      let connectionCount = 0;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          if (connectionCount >= MAX_CONNECTIONS * particlesRef.current.length) break;

          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            const opacity = (1 - dist / MAX_DISTANCE) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.lineWidth = 1;
            ctx.stroke();
            connectionCount++;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      if (interactive) {
        canvas.removeEventListener('mousemove', () => {});
        canvas.removeEventListener('mouseleave', () => {});
      }
    };
  }, [particleCount, color, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}

