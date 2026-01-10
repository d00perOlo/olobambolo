import React, { useRef, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick, href }) => {
  const btnRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    // Check if mobile (disable magnetic effect on mobile)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Magnetic strength
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = () => {
      btn.style.transform = 'translate(0, 0)';
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const baseClasses = `
    inline-flex items-center justify-center
    h-[52px] px-8
    border border-current rounded-full
    font-mono text-[12px] tracking-[0.15em] uppercase
    bg-transparent whitespace-nowrap
    transition-colors duration-300
    will-change-transform
    cursor-pointer
  `;

  if (href) {
    return (
      <a 
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href} 
        className={`${baseClasses} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick} 
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default MagneticButton;