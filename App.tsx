import React, { useEffect } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import ScrollBadge from './components/ScrollBadge';
import Services from './components/Services';
import Process from './components/Process';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Initialize Lenis from global window object (loaded via CDN)
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // @ts-ignore
        smooth: true,
        touchMultiplier: 2
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      <Preloader />
      
      <main className="relative w-full">
        <Hero />
        <ScrollBadge />
        <Services />
        <Process />
      </main>

      <Footer />
    </>
  );
}

export default App;