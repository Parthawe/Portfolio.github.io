import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => setLoaded(true);

    if (document.readyState === 'complete') {
      // Document already loaded, use a small delay for the animation
      const timer = setTimeout(onLoad, 400);
      return () => clearTimeout(timer);
    }

    // Wait for window load, but also set a max timeout
    const timer = setTimeout(onLoad, 400);
    window.addEventListener('load', onLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div className={`page-loader${loaded ? ' loaded' : ''}`}>
      <span className="page-loader-logo">PP</span>
    </div>
  );
}
