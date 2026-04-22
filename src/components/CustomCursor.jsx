import { useEffect, useRef, useState } from 'react';

const HOVER_SELECTOR = 'a, button, [data-cursor-hover], input, textarea';

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
    let targetScale = 1, currentScale = 1;
    let isHovering = false;

    document.documentElement.style.cursor = 'none';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      ${HOVER_SELECTOR} { cursor: none !important; }
    `;
    document.head.appendChild(styleEl);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px) scale(${isHovering ? 0 : 1})`;
    };

    const onMouseOver = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        targetScale = 1.8;
        isHovering = true;
        ring.style.borderColor = '#C8935B';
        ring.style.borderWidth = '1px';
        ring.style.opacity = '1';
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        targetScale = 1;
        isHovering = false;
        ring.style.borderColor = 'rgba(200,147,91,0.35)';
        ring.style.borderWidth = '2px';
        ring.style.opacity = '0.65';
      }
    };

    const onMouseDown = () => { targetScale = isHovering ? 1.4 : 0.7; };
    const onMouseUp = () => { targetScale = isHovering ? 1.8 : 1; };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      currentScale += (targetScale - currentScale) * 0.18;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${currentScale})`;
      requestAnimationFrame(animate);
    };
    const rafId = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.documentElement.style.cursor = '';
      styleEl.remove();
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-caramel pointer-events-none z-[9999]"
        style={{ transition: 'transform 0.15s ease-out' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-caramel/35 pointer-events-none z-[9999]"
        style={{ opacity: 0.65, transition: 'border-color 0.3s, border-width 0.3s, opacity 0.3s' }}
        aria-hidden="true"
      />
    </>
  );
}
