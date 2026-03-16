import { useEffect, useRef } from 'react';
import './MatrixRain.css';

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - mix of code symbols and binary
    const chars = '01{}[]()<>=+-*/;:.,|&^%$#@!?~`"\'\\';
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array to track the y position of each column
    const drops = Array(Math.floor(columns)).fill(1);

    // Draw function
    const draw = () => {
      // Fade effect - paint over with semi-transparent black
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style - subtle green with low opacity
      ctx.fillStyle = 'rgba(34, 197, 94, 0.5)'; // Green with 50% opacity
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    // Animation loop
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" />;
}

export default MatrixRain;
