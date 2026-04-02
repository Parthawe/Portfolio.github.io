import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => setLoaded(true);

    if (document.readyState === 'complete') {
      // Document already loaded — fire immediately on next tick
      const timer = setTimeout(onLoad, 0);
      return () => clearTimeout(timer);
    }

    // Wait for window load, but cap at 3s to avoid indefinite loader
    const maxTimer = setTimeout(onLoad, 3000);
    window.addEventListener('load', onLoad);

    return () => {
      clearTimeout(maxTimer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div className={`page-loader${loaded ? ' loaded' : ''}`} aria-hidden="true">
      <span className="page-loader-logo">PP</span>
    </div>
  );
}
