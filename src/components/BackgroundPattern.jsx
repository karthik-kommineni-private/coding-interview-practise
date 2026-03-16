import { useEffect, useRef } from 'react';
import './BackgroundPattern.css';

function BackgroundPattern({ pattern = 'none', opacity = 0.15 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (pattern === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let time = 0;

    // Initialize particles based on pattern
    const initParticles = () => {
      particles = [];
      const count = pattern === 'particles' ? 50 : pattern === 'ripples' ? 5 : 3;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 100 + 50,
          speed: Math.random() * 0.5 + 0.2,
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    initParticles();

    // Animation functions for each pattern
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y += p.speed;
        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${opacity})`;
        ctx.fill();
      });
    };

    const drawRipples = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.radius += p.speed;
        if (p.radius > 300) {
          p.radius = 50;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249, 115, 22, ${opacity * (1 - p.radius / 300)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    const drawAurora = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const offset1 = (Math.sin(time * 0.001) + 1) / 2;
      const offset2 = (Math.cos(time * 0.0015) + 1) / 2;

      gradient.addColorStop(0, `rgba(249, 115, 22, ${opacity * offset1})`);
      gradient.addColorStop(0.5, `rgba(251, 146, 60, ${opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(234, 88, 12, ${opacity * offset2})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawBreathing = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const breathCycle = 8000; // 8 seconds: 4s inhale, 4s exhale
      const progress = (time % breathCycle) / breathCycle;
      const scale = Math.sin(progress * Math.PI * 2) * 0.3 + 0.7;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.3;

      for (let i = 0; i < 3; i++) {
        const radius = maxRadius * scale * (1 - i * 0.2);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249, 115, 22, ${opacity * (1 - i * 0.3)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    // Main animation loop
    const animate = () => {
      time += 16;

      switch (pattern) {
        case 'particles':
          drawParticles();
          break;
        case 'ripples':
          drawRipples();
          break;
        case 'aurora':
          drawAurora();
          break;
        case 'breathing':
          drawBreathing();
          break;
        default:
          break;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [pattern, opacity]);

  if (pattern === 'none') return null;

  return <canvas ref={canvasRef} className="background-pattern" />;
}

export default BackgroundPattern;
