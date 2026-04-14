import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.documentElement.style.cursor = 'none';
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.style.cursor = 'none';
    });

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    const onMouseEnter = () => {
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(1.5)`;
      ring.style.borderColor = '#C8935B';
      ring.style.opacity = '1';
    };

    const onMouseLeave = () => {
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(1)`;
      ring.style.borderColor = 'rgba(200,147,91,0.3)';
      ring.style.opacity = '0.5';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      requestAnimationFrame(animate);
    };
    const rafId = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMouseMove);
    const els = document.querySelectorAll('a, button, [data-cursor-hover]');
    els.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = '';
      els.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.style.cursor = '';
      });
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-caramel pointer-events-none z-[9999]"
        style={{ transition: 'none' }} aria-hidden="true" />
      <div ref={ringRef} className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-caramel/30 pointer-events-none z-[9999] opacity-50"
        style={{ transition: 'border-color 0.3s, opacity 0.3s' }} aria-hidden="true" />
    </>
  );
}
