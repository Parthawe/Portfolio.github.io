import { useState, useEffect } from 'react';

export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollable = docHeight - winHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, (window.scrollY / scrollable) * 100);
      setProgress(pct);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
    };
  }, []);

  return progress;
}
