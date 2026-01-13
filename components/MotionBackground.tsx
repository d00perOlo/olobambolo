import React from 'react';

const MotionBackground: React.FC = () => {
  return (
    <div className="motion-bg fixed top-0 left-0 w-full h-full -z-10 bg-void overflow-hidden pointer-events-none">
      {/* Deep Graphite Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#050505] opacity-90"></div>
      
      {/* Premium Graphite/Carbon Fiber Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h6v6H0V0zm6 6h6v6H6V6z' fill='%23ffffff' fill-opacity='0.1'/%3E%3Cpath d='M0 0h12v12H0V0zm1 1h4v4H1V1zm6 6h4v4H7V7z' fill='%23000000' fill-opacity='0.2'/%3E%3C/svg%3E")`
      }}></div>

      {/* Fine Scanline Texture for extra Tech depth */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%'
      }}></div>

      {/* Cyan Tech Lines (Navigation/Flow) */}
      <div className="absolute h-[1px] w-[500px] bg-gradient-to-r from-transparent via-cyan to-transparent top-[10%] opacity-30 animate-warp"></div>
      <div className="absolute h-[2px] w-[800px] bg-gradient-to-r from-transparent via-cyan to-transparent top-[30%] opacity-10 animate-warp-slow left-[-20%]"></div>
      
      {/* Orange Action Lines (Velocity) */}
      <div className="absolute h-[2px] w-[600px] bg-gradient-to-r from-transparent via-orange to-transparent top-[55%] opacity-50 animate-warp" style={{animationDuration: '0.3s'}}></div>
      <div className="absolute h-[1px] w-[400px] bg-gradient-to-r from-transparent via-orange to-transparent top-[65%] opacity-20 animate-warp" style={{animationDuration: '0.4s', animationDelay: '0.1s'}}></div>
      
      {/* Noise Texture Overlay for Graphite feel */}
      <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'}}></div>
    </div>
  );
};

export default MotionBackground;