import { useRef, useCallback, useEffect, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = '', intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;

    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`;
    });
  }, [intensity, isTouch]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafId.current);
    el.style.transform = '';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={isTouch ? undefined : { transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
